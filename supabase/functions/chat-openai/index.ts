import { component$, useSignal } from "@builder.io/qwik";

export default component$(() => {
  // User input & AI response signals
  const userMessage = useSignal("");
  const aiResponse = useSignal("");
  const isLoading = useSignal(false);

  // ⚡ Your Supabase Edge Function endpoint
  const SUPABASE_FUNCTION_URL =
    "https://nltnmjlxmphamxziycuf.functions.supabase.co/chat-openai";

  // ✅ Handle send message
  const sendMessage = async () => {
    if (!userMessage.value.trim()) {
      aiResponse.value = "⚠️ Please enter a message first.";
      return;
    }

    aiResponse.value = "";
    isLoading.value = true;

    try {
      console.log("📤 Sending message to Supabase Edge Function...");
      const res = await fetch(SUPABASE_FUNCTION_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage.value,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("❌ Error from server:", errorText);
        aiResponse.value = "Server error. Please try again later.";
        isLoading.value = false;
        return;
      }

      const data = await res.json();
      console.log("✅ AI Reply Received:", data);

      aiResponse.value = data.reply || "No response from AI.";

    } catch (err) {
      console.error("⚠️ Network error:", err);
      aiResponse.value = "Connection failed. Check your network or API.";
    } finally {
      isLoading.value = false;
      userMessage.value = "";
    }
  };

  // ✅ UI
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
          {aiResponse.value
            ? aiResponse.value
            : "💬 Your AI reply will appear here..."}
        </div>
      </div>
    </div>
  );
});
