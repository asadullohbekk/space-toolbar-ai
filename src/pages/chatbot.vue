<script setup>
import {
  Send,
  Bot,
  User,
  Settings,
  Download,
  Share2,
  RefreshCw,
  MessageCircle,
  TrendingUp,
  Users,
  Clock,
  Loader2,
} from "lucide-vue-next";
import { ref, nextTick, onMounted } from "vue";
import { useApi } from "@/composables/useApi";
import { getCookie } from "@/lib/utils";

const isAnimating = ref(false);
const messages = ref([
  {
    id: 1,
    context:
      "Assalomu alaykum! Men sizning sun'iy intellekt yordamchingizman. Bugun sizga qanday yordam bera olaman?",
    displayText: "",
    isAnimationComplete: false,
    type: "ai",
    timestamp: new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
  },
]);
const animationSpeed = ref(10);
const animationVariability = ref(30);
const isLimitReached = ref(false);
const inputRef = ref(null);
const userInput = ref("");
const isLoading = ref(false);

// API composable
const { $post } = useApi();
const scrollToBottom = () => {
  setTimeout(() => {
    const chatContainer = document.querySelector(".chat-container");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, 100);
};

const animateText = async (messageIndex) => {
  isAnimating.value = true;
  const message = messages.value[messageIndex];
  if (!message) return;

  const fullText = message.context;

  if (!message.displayText) {
    message.displayText = "";
  }

  for (let i = 0; i <= fullText.length; i++) {
    message.displayText = fullText.substring(0, i);

    messages.value = [...messages.value];

    const delay =
      animationSpeed.value + Math.random() * animationVariability.value;
    await new Promise((resolve) => setTimeout(resolve, delay));
  }

  message.isAnimationComplete = true;
  isAnimating.value = false;
  scrollToBottom();

  nextTick(() => {
    if (!isLimitReached.value) {
      inputRef.value?.focus();
    }
  });
};

// Chat API request funksiyasi
const sendMessage = async () => {
  if (!userInput.value.trim() || isLoading.value) return;
  isLoading.value = true;

  const sessionId = getCookie("chat_session_id");
  if (!sessionId) {
    console.error("Session ID not found in cookie");
    return;
  }

  // User xabarini qo'shish
  const userMessage = {
    id: Date.now(),
    context: userInput.value,
    displayText: userInput.value,
    isAnimationComplete: true,
    type: "user",
    timestamp: new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
  };

  messages.value.push(userMessage);
  const currentInput = userInput.value;
  userInput.value = "";

  // User xabarini qo'shgandan keyin scroll qilish
  scrollToBottom();

  try {
    const response = await $post("/chat/", {
      session_id: sessionId,
      query: currentInput,
      lang: "uz",
    });

    // AI javobini qo'shish
    const aiMessage = {
      id: Date.now() + 1,
      context: response.answer,
      displayText: "",
      isAnimationComplete: false,
      type: "ai",
      timestamp: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    };

    messages.value.push(aiMessage);
    scrollToBottom();

    // AI javobini animatsiya bilan ko'rsatish
    await animateText(messages.value.length - 1);
    isLoading.value = false;
  } catch (error) {
    console.error("Chat API error:", error);

    // Xato xabarini qo'shish
    const errorMessage = {
      id: Date.now() + 1,
      context: "Kechirasiz, xatolik yuz berdi. Qaytadan urinib ko'ring.",
      displayText: "",
      isAnimationComplete: false,
      type: "ai",
      timestamp: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    };

    messages.value.push(errorMessage);
    isLoading.value = false;
    await animateText(messages.value.length - 1);
  } finally {
    isLoading.value = false;
    scrollToBottom();
    nextTick(() => {
      inputRef.value?.focus();
    });
  }
};

// Enter tugmasini bosganda xabar yuborish
const handleKeyPress = (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    sendMessage();
  }
};

// Component mount bo'lganda animatsiyani boshlash
onMounted(() => {
  setTimeout(() => {
    animateText(0);
  }, 100); // 500ms kutib, keyin animatsiyani boshlash
});
</script>

<template>
  <div class="h-full">
    <div class="h-full flex justify-center items-center">
      <div class="w-[700px] h-[570px]">
        <!-- Chat Interface -->
        <div class="h-full">
          <div
            class="bg-white/80 h-full backdrop-blur-sm rounded-xl border border-gray-200/50 shadow-sm flex flex-col"
          >
            <!-- Chat Header -->
            <div
              class="p-4 border-b border-gray-200/50 bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-xl"
            >
              <div class="flex items-center space-x-3">
                <div
                  class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center"
                >
                  <Bot class="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900">AI Assistant</h3>
                  <p class="text-sm text-gray-600">Online • Ready to help</p>
                </div>
                <div class="ml-auto flex items-center space-x-2">
                  <button
                    class="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <RefreshCw class="w-4 h-4" />
                  </button>
                  <button
                    class="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <Settings class="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <!-- Chat Messages -->
            <div class="flex-1 overflow-y-auto p-4 space-y-4 chat-container">
              <!-- Messages -->
              <div
                v-for="message in messages"
                :key="message.id"
                class="flex items-start space-x-3"
                :class="{
                  'flex-row-reverse space-x-reverse': message.type === 'user',
                }"
              >
                <!-- AI Avatar -->
                <div
                  v-if="message.type === 'ai'"
                  class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0"
                >
                  <Bot class="w-4 h-4 text-white" />
                </div>

                <!-- User Avatar -->
                <div
                  v-if="message.type === 'user'"
                  class="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0"
                >
                  <User class="w-4 h-4 text-white" />
                </div>

                <!-- Message Content -->
                <div
                  class="rounded-lg p-3 max-w-[70%]"
                  :class="message.type === 'ai' ? 'bg-blue-50' : 'bg-green-50'"
                >
                  <p class="text-gray-900 break-words">
                    {{ message.displayText }}
                    <span
                      v-if="isAnimating && !message.isAnimationComplete"
                      class="animate-pulse"
                      >|</span
                    >
                  </p>
                  <p class="text-xs text-gray-500 mt-2">
                    {{ message.timestamp }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Chat Input -->
            <div class="flex-shrink-0 p-4 border-t border-gray-200/50">
              <div class="flex space-x-3">
                <input
                  ref="inputRef"
                  v-model="userInput"
                  @keypress="handleKeyPress"
                  type="text"
                  placeholder="Xabaringizni yozing..."
                  :disabled="isLoading"
                  class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button
                  @click="sendMessage"
                  :disabled="!userInput.trim() || isLoading"
                  class="bg-blue-600 text-white w-12 flex justify-center items-center duration-300 h-12 rounded-full hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Loader2 class="w-5 h-5 animate-spin" v-if="isLoading" />
                  <Send v-else class="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat-container::-webkit-scrollbar {
  width: 6px;
}

.chat-container::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.chat-container::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.chat-container::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

.break-words {
  word-break: break-word;
}
</style>
