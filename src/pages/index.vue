<script setup lang="ts">
import { ArrowRight, CheckCircle, Star } from "lucide-vue-next";
</script>

<template>
  <div class="max-w-6xl mx-auto pt-4">
    <!-- Hero Section -->
    <div class="text-center mb-16">
      <h1 class="text-5xl font-bold text-gray-900 mb-6">
        Welcome to Our Platform
      </h1>
      <p class="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
        We build innovative solutions that help businesses grow and succeed in the digital age. 
        Our team of experts is dedicated to delivering exceptional results.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <button class="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
          Get Started
          <ArrowRight class="w-5 h-5 ml-2" />
        </button>
        <button class="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors">
          Learn More
        </button>
      </div>
    </div>

    <!-- Features Section -->
    <div class="grid md:grid-cols-3 gap-8 mb-16">
      <div class="text-center">
        <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle class="w-8 h-8 text-blue-600" />
        </div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">Quality Assurance</h3>
        <p class="text-gray-600">
          We maintain the highest standards in every project, ensuring quality and reliability.
        </p>
      </div>
      
      <div class="text-center">
        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Star class="w-8 h-8 text-green-600" />
        </div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">Innovation</h3>
        <p class="text-gray-600">
          Cutting-edge solutions that keep you ahead of the competition and market trends.
        </p>
      </div>
      
      <div class="text-center">
        <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle class="w-8 h-8 text-purple-600" />
        </div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">Support</h3>
        <p class="text-gray-600">
          24/7 support and maintenance to ensure your systems run smoothly.
        </p>
      </div>
    </div>

    <!-- Stats Section -->
    <div class="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-8 text-white mb-16">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
        <div>
          <div class="text-4xl font-bold mb-2">500+</div>
          <div class="text-blue-100">Happy Clients</div>
        </div>
        <div>
          <div class="text-4xl font-bold mb-2">1000+</div>
          <div class="text-blue-100">Projects Completed</div>
        </div>
        <div>
          <div class="text-4xl font-bold mb-2">50+</div>
          <div class="text-blue-100">Team Members</div>
        </div>
        <div>
          <div class="text-4xl font-bold mb-2">99%</div>
          <div class="text-blue-100">Client Satisfaction</div>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="text-center">
      <h2 class="text-3xl font-bold text-gray-900 mb-4">
        Ready to Get Started?
      </h2>
      <p class="text-lg text-gray-600 mb-8">
        Join hundreds of satisfied customers who trust us with their projects.
      </p>
      <button class="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
        Contact Us Today
      </button>
    </div>
  </div>
</template>
