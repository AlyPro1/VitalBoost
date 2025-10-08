import { component$, useSignal } from "@builder.io/qwik";

export default component$(() => {
  const userMessage = useSignal("");
  const aiResponse = useSignal("");
  const isLoading = useSignal(false);

  // ✅ Your Supabase Edge Function URL (do not add anon key here)
  const SUPABASE_FUNCTION_URL =
    "https://nltnmjlxmphamxziycuf.functions.supabase.co/chat-openai";

  const sendMessage = async () => {
    if (!userMessage.value.trim()) {
      aiResponse.value = "⚠️ Please enter a message first.";
      return;
    }

    aiResponse.value = "";
    isLoading.value = true;

    try {
      console.log("📤 Sending to Supabase Edge Function...");
      const SUPABASE_FUNCTION_URL =
  "https://nltnmjlxmphamxziycuf.functions.supabase.co/chat-openai";

const SUPABASE_ANON_KEY =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sdG5tamx4bXBoYW14eml5Y3VmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcxMzg0MjAsImV4cCI6MjA3MjcxNDQyMH0.upEhU4waIW1iCeO5n7as517dtdbC4x6xYDLLzrRdEhQ";
      
const res = await fetch(SUPABASE_FUNCTION_URL, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sdG5tamx4bXBoYW14eml5Y3VmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcxMzg0MjAsImV4cCI6MjA3MjcxNDQyMH0.upEhU4waIW1iCeO5n7as517dtdbC4x6xYDLLzrRdEhQ}`,
  },
  body: JSON.stringify({
    message: userMessage.value,
  }),
});

      if (!res.ok) {
        const errText = await res.text();
        console.error("❌ Server Error:", errText);
        aiResponse.value = "Server error. Please try again.";
        isLoading.value = false;
        return;
      }

      const data = await res.json();
      console.log("✅ AI Reply:", data);

      aiResponse.value = data.reply || "⚠️ No response from AI.";
    } catch (err) {
      console.error("⚠️ Network Error:", err);
      aiResponse.value = "Connection failed. Check your network or API key.";
    } finally {
      isLoading.value = false;
      userMessage.value = "";
    }
  };

  return (
    <div class="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 class="text-3xl font-bold mb-4 text-gray-800">
        🧠 Vital Boost – AI Health Assistant
      </h1>

      <div class="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        <textarea
          class="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
          placeholder="Ask me anything about your health..."
          bind:value={userMessage}
        ></textarea>

        <button
          onClick$={sendMessage}
          disabled={isLoading.value}
          class={`mt-4 w-full py-3 rounded-lg font-semibold transition ${
            isLoading.value
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {isLoading.value ? "Thinking..." : "Ask AI"}
        </button>

        <div class="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200 text-gray-800 whitespace-pre-wrap">
          {aiResponse.value || "💬 Your AI reply will appear here..."}
        </div>
      </div>
    </div>
  );
});
