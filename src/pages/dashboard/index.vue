<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import {
  Brain,
  Eye,
  Mic,
  Heart,
  GraduationCap,
  ShoppingCart,
  Building2,
  Newspaper,
  ArrowRight,
  Zap,
  Users,
  TrendingUp,
  Shield,
  Globe,
} from "lucide-vue-next";
import { useUserProfile } from "@/composables/useUserProfile";

// User profile management
const { user, loading: userLoading, error: userError, fetchUserProfile, cleanup: cleanupUserProfile } = useUserProfile();

// Handle page refresh and visibility change
const handleVisibilityChange = async () => {
  if (!document.hidden && !user.value) {
    // Page became visible and no user data, fetch profile
    try {
      await fetchUserProfile();
    } catch (error) {
      console.error("Failed to fetch user profile on visibility change:", error);
    }
  }
};

// Fetch user profile on component mount
onMounted(async () => {
  try {
    await fetchUserProfile();
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
  }
  
  // Add event listeners for page refresh and visibility change
  window.addEventListener("focus", handleVisibilityChange);
  document.addEventListener("visibilitychange", handleVisibilityChange);
});

// Clean up event listeners
onUnmounted(() => {
  cleanupUserProfile();
});
</script>

<template>
  <div class="min-h-screen">
    <!-- Header Section -->
    <div
      class="bg-white max-w-7xl mx-auto rounded-2xl backdrop-blur-sm border-b border-gray-200/50"
    >
      <div class="px-4 sm:px-6 lg:px-5 py-6">
        <div class="flex items-center justify-between">
          <div>
            <h1
              class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              AI Platform Dashboard
            </h1>
            <p class="text-gray-600 mt-1">
              Powering the future with intelligent solutions
            </p>
          </div>
          <div class="flex items-center space-x-4">
            <div
              class="hidden sm:flex items-center space-x-2 text-sm text-gray-600"
            >
              <div
                class="w-2 h-2 bg-green-500 rounded-full animate-pulse"
              ></div>
              <span>System Online</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-2 py-8">
      <!-- Stats Overview -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div
          class="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-300"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Active Agents</p>
              <p class="text-2xl font-bold text-gray-900">24</p>
            </div>
            <div
              class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center"
            >
              <Zap class="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div class="mt-4 flex items-center text-sm text-green-600">
            <TrendingUp class="w-4 h-4 mr-1" />
            <span>+12% from last month</span>
          </div>
        </div>

        <div
          class="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-300"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">
                Processing Requests
              </p>
              <p class="text-2xl font-bold text-gray-900">1,247</p>
            </div>
            <div
              class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center"
            >
              <Brain class="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div class="mt-4 flex items-center text-sm text-green-600">
            <TrendingUp class="w-4 h-4 mr-1" />
            <span>+8% from last month</span>
          </div>
        </div>

        <div
          class="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-300"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Active Users</p>
              <p class="text-2xl font-bold text-gray-900">892</p>
            </div>
            <div
              class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center"
            >
              <Users class="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div class="mt-4 flex items-center text-sm text-green-600">
            <TrendingUp class="w-4 h-4 mr-1" />
            <span>+15% from last month</span>
          </div>
        </div>

        <div
          class="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-300"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Success Rate</p>
              <p class="text-2xl font-bold text-gray-900">99.2%</p>
            </div>
            <div
              class="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center"
            >
              <Shield class="w-6 h-6 text-indigo-600" />
            </div>
          </div>
          <div class="mt-4 flex items-center text-sm text-green-600">
            <TrendingUp class="w-4 h-4 mr-1" />
            <span>+0.3% from last month</span>
          </div>
        </div>
      </div>

      <!-- AI Agents Section -->
      <div class="mb-12">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-900">AI Agents</h2>
          <button
            class="text-blue-600 hover:text-blue-700 font-medium flex items-center"
          >
            View All
            <ArrowRight class="w-4 h-4 ml-1" />
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- NLP Agent -->
          <div
            class="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer"
          >
            <div class="flex items-center justify-between mb-4">
              <div
                class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center"
              >
                <Brain class="w-6 h-6 text-white" />
              </div>
              <div class="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">
              Natural Language Processing
            </h3>
            <p class="text-gray-600 mb-4">
              Advanced text analysis, sentiment detection, and language
              understanding capabilities.
            </p>
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-2">
                <span class="text-sm text-gray-500">Status:</span>
                <span
                  class="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium"
                  >Active</span
                >
              </div>
              <div class="text-sm text-gray-500">Processing: 156 req/min</div>
            </div>
          </div>

          <!-- Computer Vision Agent -->
          <div
            class="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer"
          >
            <div class="flex items-center justify-between mb-4">
              <div
                class="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center"
              >
                <Eye class="w-6 h-6 text-white" />
              </div>
              <div class="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">
              Computer Vision
            </h3>
            <p class="text-gray-600 mb-4">
              Image recognition, object detection, and visual data analysis
              solutions.
            </p>
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-2">
                <span class="text-sm text-gray-500">Status:</span>
                <span
                  class="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium"
                  >Active</span
                >
              </div>
              <div class="text-sm text-gray-500">Processing: 89 req/min</div>
            </div>
          </div>

          <!-- Audio Processing Agent -->
          <div
            class="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer"
          >
            <div class="flex items-center justify-between mb-4">
              <div
                class="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center"
              >
                <Mic class="w-6 h-6 text-white" />
              </div>
              <div class="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">
              Audio Processing
            </h3>
            <p class="text-gray-600 mb-4">
              Speech recognition, audio analysis, and sound processing
              capabilities.
            </p>
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-2">
                <span class="text-sm text-gray-500">Status:</span>
                <span
                  class="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium"
                  >Active</span
                >
              </div>
              <div class="text-sm text-gray-500">Processing: 67 req/min</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Industry Solutions Section -->
      <div class="mb-12">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-900">Industry Solutions</h2>
          <button
            class="text-blue-600 hover:text-blue-700 font-medium flex items-center"
          >
            Explore All
            <ArrowRight class="w-4 h-4 ml-1" />
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Healthcare -->
          <div
            class="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-6 border border-red-200/50 shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer"
          >
            <div class="flex items-center justify-between mb-4">
              <div
                class="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center"
              >
                <Heart class="w-6 h-6 text-white" />
              </div>
              <div class="text-sm text-red-600 font-medium">Healthcare</div>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">
              Healthcare AI
            </h3>
            <p class="text-gray-600 mb-4">
              Diagnostic assistance, patient monitoring, and medical data
              analysis solutions.
            </p>
            <div class="flex items-center text-red-600 font-medium text-sm">
              Learn More
              <ArrowRight
                class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
              />
            </div>
          </div>

          <!-- Education -->
          <div
            class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200/50 shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer"
          >
            <div class="flex items-center justify-between mb-4">
              <div
                class="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center"
              >
                <GraduationCap class="w-6 h-6 text-white" />
              </div>
              <div class="text-sm text-blue-600 font-medium">Education</div>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">
              Educational AI
            </h3>
            <p class="text-gray-600 mb-4">
              Personalized learning, automated grading, and educational content
              optimization.
            </p>
            <div class="flex items-center text-blue-600 font-medium text-sm">
              Learn More
              <ArrowRight
                class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
              />
            </div>
          </div>

          <!-- Retail -->
          <div
            class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200/50 shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer"
          >
            <div class="flex items-center justify-between mb-4">
              <div
                class="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center"
              >
                <ShoppingCart class="w-6 h-6 text-white" />
              </div>
              <div class="text-sm text-green-600 font-medium">Retail</div>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Retail AI</h3>
            <p class="text-gray-600 mb-4">
              Inventory management, customer behavior analysis, and personalized
              recommendations.
            </p>
            <div class="flex items-center text-green-600 font-medium text-sm">
              Learn More
              <ArrowRight
                class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
              />
            </div>
          </div>

          <!-- Government -->
          <div
            class="bg-gradient-to-br from-slate-50 to-gray-50 rounded-xl p-6 border border-slate-200/50 shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer"
          >
            <div class="flex items-center justify-between mb-4">
              <div
                class="w-12 h-12 bg-gradient-to-br from-slate-500 to-gray-500 rounded-lg flex items-center justify-center"
              >
                <Building2 class="w-6 h-6 text-white" />
              </div>
              <div class="text-sm text-slate-600 font-medium">Government</div>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">
              Government AI
            </h3>
            <p class="text-gray-600 mb-4">
              Public service automation, data analysis, and citizen engagement
              solutions.
            </p>
            <div class="flex items-center text-slate-600 font-medium text-sm">
              Learn More
              <ArrowRight
                class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
              />
            </div>
          </div>

          <!-- Business -->
          <div
            class="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200/50 shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer"
          >
            <div class="flex items-center justify-between mb-4">
              <div
                class="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center"
              >
                <TrendingUp class="w-6 h-6 text-white" />
              </div>
              <div class="text-sm text-amber-600 font-medium">Business</div>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">
              Business AI
            </h3>
            <p class="text-gray-600 mb-4">
              Process automation, predictive analytics, and business
              intelligence solutions.
            </p>
            <div class="flex items-center text-amber-600 font-medium text-sm">
              Learn More
              <ArrowRight
                class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
              />
            </div>
          </div>

          <!-- Media -->
          <div
            class="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-6 border border-purple-200/50 shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer"
          >
            <div class="flex items-center justify-between mb-4">
              <div
                class="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-500 rounded-lg flex items-center justify-center"
              >
                <Newspaper class="w-6 h-6 text-white" />
              </div>
              <div class="text-sm text-purple-600 font-medium">Media</div>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Media AI</h3>
            <p class="text-gray-600 mb-4">
              Content generation, audience analysis, and media optimization
              solutions.
            </p>
            <div class="flex items-center text-purple-600 font-medium text-sm">
              Learn More
              <ArrowRight
                class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activity Section -->
      <div
        class="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 shadow-sm"
      >
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
        <div class="space-y-4">
          <div class="flex items-center space-x-4 p-4 bg-gray-50/50 rounded-lg">
            <div
              class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center"
            >
              <Brain class="w-5 h-5 text-blue-600" />
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-900">
                NLP Agent processed 1,247 text requests
              </p>
              <p class="text-xs text-gray-500">2 minutes ago</p>
            </div>
            <div class="text-sm text-green-600 font-medium">+15%</div>
          </div>

          <div class="flex items-center space-x-4 p-4 bg-gray-50/50 rounded-lg">
            <div
              class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center"
            >
              <Eye class="w-5 h-5 text-green-600" />
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-900">
                Computer Vision completed image analysis batch
              </p>
              <p class="text-xs text-gray-500">5 minutes ago</p>
            </div>
            <div class="text-sm text-green-600 font-medium">+8%</div>
          </div>

          <div class="flex items-center space-x-4 p-4 bg-gray-50/50 rounded-lg">
            <div
              class="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center"
            >
              <Mic class="w-5 h-5 text-purple-600" />
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-900">
                Audio Processing agent optimized speech recognition
              </p>
              <p class="text-xs text-gray-500">12 minutes ago</p>
            </div>
            <div class="text-sm text-green-600 font-medium">+12%</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
