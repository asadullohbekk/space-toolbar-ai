<script setup lang="ts">
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
  Clock
} from "lucide-vue-next";
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
    <!-- Header Section -->
    <div class="bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Chatbot
            </h1>
            <p class="text-gray-600 mt-1">Intelligent conversation assistant powered by AI</p>
          </div>
          <div class="flex items-center space-x-4">
            <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
              <Settings class="w-4 h-4 mr-2" />
              Settings
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Chat Interface -->
        <div class="lg:col-span-3">
          <div class="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 shadow-sm h-[600px] flex flex-col">
            <!-- Chat Header -->
            <div class="p-4 border-b border-gray-200/50 bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-xl">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Bot class="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900">AI Assistant</h3>
                  <p class="text-sm text-gray-600">Online • Ready to help</p>
                </div>
                <div class="ml-auto flex items-center space-x-2">
                  <button class="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <RefreshCw class="w-4 h-4" />
                  </button>
                  <button class="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Settings class="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <!-- Chat Messages -->
            <div class="flex-1 overflow-y-auto p-4 space-y-4">
              <!-- AI Message -->
              <div class="flex items-start space-x-3">
                <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot class="w-4 h-4 text-white" />
                </div>
                <div class="bg-blue-50 rounded-lg p-3 max-w-[80%]">
                  <p class="text-gray-900">Hello! I'm your AI assistant. How can I help you today? I can assist with various tasks, answer questions, or just have a friendly conversation.</p>
                  <p class="text-xs text-gray-500 mt-2">2:30 PM</p>
                </div>
              </div>

              <!-- User Message -->
              <div class="flex items-start space-x-3 justify-end">
                <div class="bg-blue-600 rounded-lg p-3 max-w-[80%]">
                  <p class="text-white">Can you help me with a coding problem?</p>
                  <p class="text-xs text-blue-100 mt-2">2:31 PM</p>
                </div>
                <div class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <User class="w-4 h-4 text-gray-600" />
                </div>
              </div>

              <!-- AI Response -->
              <div class="flex items-start space-x-3">
                <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot class="w-4 h-4 text-white" />
                </div>
                <div class="bg-blue-50 rounded-lg p-3 max-w-[80%]">
                  <p class="text-gray-900">Of course! I'd be happy to help with coding. What programming language are you working with, and what's the issue you're facing?</p>
                  <p class="text-xs text-gray-500 mt-2">2:31 PM</p>
                </div>
              </div>

              <!-- User Message -->
              <div class="flex items-start space-x-3 justify-end">
                <div class="bg-blue-600 rounded-lg p-3 max-w-[80%]">
                  <p class="text-white">I'm working with JavaScript and having trouble with async/await</p>
                  <p class="text-xs text-blue-100 mt-2">2:32 PM</p>
                </div>
                <div class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <User class="w-4 h-4 text-gray-600" />
                </div>
              </div>

              <!-- AI Response -->
              <div class="flex items-start space-x-3">
                <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot class="w-4 h-4 text-white" />
                </div>
                <div class="bg-blue-50 rounded-lg p-3 max-w-[80%]">
                  <p class="text-gray-900">Great question! Async/await is a powerful feature in JavaScript. It's syntactic sugar over Promises that makes asynchronous code look and behave more like synchronous code. Would you like me to explain the basics or help with a specific problem?</p>
                  <p class="text-xs text-gray-500 mt-2">2:32 PM</p>
                </div>
              </div>
            </div>

            <!-- Chat Input -->
            <div class="p-4 border-t border-gray-200/50">
              <div class="flex space-x-3">
                <input 
                  type="text" 
                  placeholder="Type your message here..." 
                  class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                  <Send class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Quick Actions -->
          <div class="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 shadow-sm">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div class="space-y-3">
              <button class="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                <MessageCircle class="w-4 h-4 mr-2" />
                New Chat
              </button>
              <button class="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center">
                <Download class="w-4 h-4 mr-2" />
                Export Chat
              </button>
              <button class="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center">
                <Share2 class="w-4 h-4 mr-2" />
                Share Chat
              </button>
            </div>
          </div>

          <!-- Chat Statistics -->
          <div class="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 shadow-sm">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Statistics</h3>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2">
                  <MessageCircle class="w-4 h-4 text-blue-600" />
                  <span class="text-sm text-gray-600">Total Messages</span>
                </div>
                <span class="text-sm font-medium text-gray-900">1,247</span>
              </div>
              
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2">
                  <Users class="w-4 h-4 text-green-600" />
                  <span class="text-sm text-gray-600">Active Users</span>
                </div>
                <span class="text-sm font-medium text-gray-900">89</span>
              </div>
              
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2">
                  <Clock class="w-4 h-4 text-purple-600" />
                  <span class="text-sm text-gray-600">Avg Response</span>
                </div>
                <span class="text-sm font-medium text-gray-900">1.2s</span>
              </div>
              
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2">
                  <TrendingUp class="w-4 h-4 text-orange-600" />
                  <span class="text-sm text-gray-600">Satisfaction</span>
                </div>
                <span class="text-sm font-medium text-gray-900">98%</span>
              </div>
            </div>
          </div>

          <!-- Recent Topics -->
          <div class="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 shadow-sm">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Recent Topics</h3>
            <div class="space-y-2">
              <div class="text-sm text-gray-600 hover:text-blue-600 cursor-pointer">JavaScript Programming</div>
              <div class="text-sm text-gray-600 hover:text-blue-600 cursor-pointer">Web Development</div>
              <div class="text-sm text-gray-600 hover:text-blue-600 cursor-pointer">Data Analysis</div>
              <div class="text-sm text-gray-600 hover:text-blue-600 cursor-pointer">Machine Learning</div>
              <div class="text-sm text-gray-600 hover:text-blue-600 cursor-pointer">API Integration</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
