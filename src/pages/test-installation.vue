<script setup lang="ts">
import { ref } from "vue";
import { triggerProfileRefresh, redirectToDashboardWithRefresh, setupInstallationRefresh } from "@/lib/profileRefresh";

const testResults = ref<string[]>([]);

const addResult = (message: string) => {
  testResults.value.push(`${new Date().toLocaleTimeString()}: ${message}`);
};

const testDirectRefresh = () => {
  addResult("Testing direct profile refresh...");
  triggerProfileRefresh();
  addResult("Direct refresh event dispatched");
};

const testRedirectWithRefresh = () => {
  addResult("Testing redirect to dashboard with refresh...");
  redirectToDashboardWithRefresh();
};

const testSetupInstallationRefresh = () => {
  addResult("Testing installation refresh setup...");
  setupInstallationRefresh();
  addResult("Installation refresh setup completed");
};

const clearResults = () => {
  testResults.value = [];
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">
        Installation Page Refresh Test
      </h1>
      
      <div class="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">
          Test Profile Refresh Functionality
        </h2>
        <p class="text-gray-600 mb-6">
          This page simulates an installation page that can trigger user profile refresh.
          Use the buttons below to test different refresh scenarios.
        </p>
        
        <div class="space-y-4">
          <button
            @click="testDirectRefresh"
            class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Test Direct Refresh
          </button>
          
          <button
            @click="testRedirectWithRefresh"
            class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors ml-4"
          >
            Test Redirect to Dashboard
          </button>
          
          <button
            @click="testSetupInstallationRefresh"
            class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors ml-4"
          >
            Test Installation Setup
          </button>
          
          <button
            @click="clearResults"
            class="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors ml-4"
          >
            Clear Results
          </button>
        </div>
      </div>
      
      <div class="bg-white rounded-lg shadow-sm border p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">
          Test Results
        </h3>
        
        <div v-if="testResults.length === 0" class="text-gray-500 italic">
          No test results yet. Click a test button above to see results.
        </div>
        
        <div v-else class="space-y-2">
          <div
            v-for="(result, index) in testResults"
            :key="index"
            class="text-sm font-mono bg-gray-50 p-2 rounded border-l-4 border-blue-500"
          >
            {{ result }}
          </div>
        </div>
      </div>
      
      <div class="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 class="font-semibold text-yellow-800 mb-2">How to Test:</h4>
        <ol class="text-yellow-700 text-sm space-y-1 list-decimal list-inside">
          <li>Open the dashboard page in another tab</li>
          <li>Click "Test Direct Refresh" - this should trigger a profile refresh on the dashboard</li>
          <li>Click "Test Redirect to Dashboard" - this will redirect you to dashboard with refresh parameters</li>
          <li>Click "Test Installation Setup" - this combines both direct refresh and URL cleanup</li>
          <li>Check the browser console for detailed logs</li>
        </ol>
      </div>
    </div>
  </div>
</template>
