import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ChatRequest {
  message: string;
}

interface ChatResponse {
  reply: string;
  error?: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const openaiApiKey = Deno.env.get("OPENAI_API_KEY");

    if (!openaiApiKey) {
      console.error("OPENAI_API_KEY not configured");
      return new Response(
        JSON.stringify({
          error: "AI service is not configured",
        } as ChatResponse),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({
          error: "Unauthorized. Please sign in.",
        } as ChatResponse),
        {
          status: 401,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const userId = authHeader.replace("Bearer ", "");
    if (!userId) {
      return new Response(
        JSON.stringify({
          error: "Invalid authentication token",
        } as ChatResponse),
        {
          status: 401,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const body: ChatRequest = await req.json();
    const userMessage = body.message?.trim();

    if (!userMessage) {
      return new Response(
        JSON.stringify({
          error: "Message cannot be empty",
        } as ChatResponse),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    console.log(`[AI Doctor] User ${userId} sent message: ${userMessage.substring(0, 50)}...`);

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseServiceRoleKey) {
      console.error("Missing Supabase configuration");
      return new Response(
        JSON.stringify({
          error: "Database configuration error",
        } as ChatResponse),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const saveUserMessage = await fetch(
      `${supabaseUrl}/rest/v1/messages`,
      {
        method: "POST",
        headers: {
          "apikey": supabaseServiceRoleKey,
          "Authorization": `Bearer ${supabaseServiceRoleKey}`,
          "Content-Type": "application/json",
          "Prefer": "return=representation",
        },
        body: JSON.stringify({
          user_id: userId,
          role: "user",
          content: userMessage,
        }),
      }
    );

    if (!saveUserMessage.ok) {
      const error = await saveUserMessage.text();
      console.error("Failed to save user message:", error);
      return new Response(
        JSON.stringify({
          error: "Failed to save message",
        } as ChatResponse),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    console.log("[AI Doctor] User message saved to database");

    const getMessagesResponse = await fetch(
      `${supabaseUrl}/rest/v1/messages?user_id=eq.${userId}&order=created_at.asc&limit=15`,
      {
        method: "GET",
        headers: {
          "apikey": supabaseServiceRoleKey,
          "Authorization": `Bearer ${supabaseServiceRoleKey}`,
        },
      }
    );

    let messageHistory: Array<{ role: string; content: string }> = [];

    if (getMessagesResponse.ok) {
      const messages = await getMessagesResponse.json();
      messageHistory = messages.map((msg: any) => ({
        role: msg.role,
        content: msg.content,
      }));
      console.log(`[AI Doctor] Loaded ${messageHistory.length} messages from history`);
    } else {
      console.warn("Failed to load message history, starting fresh");
    }

    const conversationMessages = [
      ...messageHistory,
      {
        role: "user",
        content: userMessage,
      },
    ];

    console.log(`[AI Doctor] Sending ${conversationMessages.length} messages to OpenAI`);

    const openaiResponse = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${openaiApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: `You are an AI Health Assistant called Vital Doctor. Provide safe, medically responsible guidance. Avoid diagnoses.

You should:
- Offer general health information
- Suggest lifestyle improvements
- Recommend when to see a healthcare professional
- Provide supportive, empathetic responses
- Always include disclaimers that you are not a substitute for professional medical advice
- Keep responses concise and friendly`,
            },
            ...conversationMessages,
          ],
          temperature: 0.7,
          max_tokens: 500,
        }),
      }
    );

    if (!openaiResponse.ok) {
      const errorData = await openaiResponse.text();
      console.error("OpenAI API error:", errorData);

      return new Response(
        JSON.stringify({
          error: "Failed to get response from AI service",
        } as ChatResponse),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const openaiData = await openaiResponse.json();
    const assistantReply =
      openaiData.choices[0]?.message?.content ||
      "I'm unable to generate a response at the moment. Please try again.";

    console.log("[AI Doctor] Received response from OpenAI");

    const saveAssistantMessage = await fetch(
      `${supabaseUrl}/rest/v1/messages`,
      {
        method: "POST",
        headers: {
          "apikey": supabaseServiceRoleKey,
          "Authorization": `Bearer ${supabaseServiceRoleKey}`,
          "Content-Type": "application/json",
          "Prefer": "return=representation",
        },
        body: JSON.stringify({
          user_id: userId,
          role: "assistant",
          content: assistantReply,
        }),
      }
    );

    if (!saveAssistantMessage.ok) {
      const error = await saveAssistantMessage.text();
      console.error("Failed to save assistant message:", error);
      console.warn("Returning response anyway - message not persisted");
    } else {
      console.log("[AI Doctor] Assistant message saved to database");
    }

    return new Response(
      JSON.stringify({
        reply: assistantReply,
      } as ChatResponse),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("AI Doctor error:", error);

    return new Response(
      JSON.stringify({
        error: "An unexpected error occurred",
      } as ChatResponse),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
