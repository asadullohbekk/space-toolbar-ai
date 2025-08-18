<script setup lang="ts">
import { 
  Camera, 
  Upload, 
  Users, 
  CheckCircle, 
  AlertCircle,
  Download,
  Share2,
  Settings
} from "lucide-vue-next";
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
    <!-- Header Section -->
    <div class="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Face Recognition
            </h1>
            <p class="text-gray-600 mt-1">Advanced facial recognition and analysis system</p>
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
      <!-- Main Recognition Area -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <!-- Camera/Upload Area -->
        <div class="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 shadow-sm">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Input Source</h2>
          
          <!-- Camera Preview -->
          <div class="bg-gray-100 rounded-lg p-4 mb-4 text-center">
            <div class="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
              <Camera class="w-16 h-16 text-gray-400" />
            </div>
            <p class="text-gray-600 mb-4">Camera preview will appear here</p>
            <button class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center mx-auto">
              <Camera class="w-4 h-4 mr-2" />
              Start Camera
            </button>
          </div>

          <!-- Upload Section -->
          <div class="border-t pt-4">
            <h3 class="text-lg font-medium text-gray-900 mb-3">Or Upload Image</h3>
            <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
              <Upload class="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p class="text-gray-600 mb-2">Click to upload or drag and drop</p>
              <p class="text-sm text-gray-500">PNG, JPG, JPEG up to 10MB</p>
            </div>
          </div>
        </div>

        <!-- Recognition Results -->
        <div class="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 shadow-sm">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Recognition Results</h2>
          
          <!-- Results Display -->
          <div class="space-y-4">
            <div class="bg-green-50 border border-green-200 rounded-lg p-4">
              <div class="flex items-center space-x-3">
                <CheckCircle class="w-6 h-6 text-green-600" />
                <div>
                  <h3 class="font-medium text-green-900">Face Detected</h3>
                  <p class="text-sm text-green-700">Confidence: 98.5%</p>
                </div>
              </div>
            </div>

            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div class="flex items-center space-x-3">
                <Users class="w-6 h-6 text-blue-600" />
                <div>
                  <h3 class="font-medium text-blue-900">Person Identified</h3>
                  <p class="text-sm text-blue-700">John Doe - Employee ID: 12345</p>
                </div>
              </div>
            </div>

            <div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div class="flex items-center space-x-3">
                <CheckCircle class="w-6 h-6 text-purple-600" />
                <div>
                  <h3 class="font-medium text-purple-900">Access Granted</h3>
                  <p class="text-sm text-purple-700">Security Level: Admin</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="mt-6 space-y-3">
            <button class="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center">
              <CheckCircle class="w-4 h-4 mr-2" />
              Grant Access
            </button>
            <button class="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
              <Download class="w-4 h-4 mr-2" />
              Download Report
            </button>
            <button class="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center">
              <Share2 class="w-4 h-4 mr-2" />
              Share Results
            </button>
          </div>
        </div>
      </div>

      <!-- Statistics and History -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 shadow-sm">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Total Scans</p>
              <p class="text-2xl font-bold text-gray-900">2,847</p>
            </div>
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Camera class="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div class="mt-4 flex items-center text-sm text-green-600">
            <span>+15% from last week</span>
          </div>
        </div>

        <div class="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 shadow-sm">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Success Rate</p>
              <p class="text-2xl font-bold text-gray-900">96.8%</p>
            </div>
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle class="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div class="mt-4 flex items-center text-sm text-green-600">
            <span>+2.1% from last week</span>
          </div>
        </div>

        <div class="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 shadow-sm">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Active Users</p>
              <p class="text-2xl font-bold text-gray-900">156</p>
            </div>
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users class="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div class="mt-4 flex items-center text-sm text-green-600">
            <span>+8% from last week</span>
          </div>
        </div>
      </div>

      <!-- Recent Scans -->
      <div class="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 shadow-sm">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">Recent Scans</h2>
        <div class="space-y-4">
          <div class="flex items-center space-x-4 p-4 bg-gray-50/50 rounded-lg">
            <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle class="w-5 h-5 text-green-600" />
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-900">Sarah Johnson - Access Granted</p>
              <p class="text-xs text-gray-500">2 minutes ago • Confidence: 99.2%</p>
            </div>
            <div class="text-sm text-green-600 font-medium">Success</div>
          </div>
          
          <div class="flex items-center space-x-4 p-4 bg-gray-50/50 rounded-lg">
            <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Users class="w-5 h-5 text-blue-600" />
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-900">Mike Chen - Person Identified</p>
              <p class="text-xs text-gray-500">5 minutes ago • Confidence: 97.8%</p>
            </div>
            <div class="text-sm text-blue-600 font-medium">Identified</div>
          </div>
          
          <div class="flex items-center space-x-4 p-4 bg-gray-50/50 rounded-lg">
            <div class="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
              <AlertCircle class="w-5 h-5 text-yellow-600" />
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-900">Unknown Person - Access Denied</p>
              <p class="text-xs text-gray-500">12 minutes ago • Confidence: 45.2%</p>
            </div>
            <div class="text-sm text-yellow-600 font-medium">Denied</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
