<script setup lang="ts">
import { Building2, Users, Target, Award } from "lucide-vue-next";
</script>

<template>
  <div class="max-w-4xl mx-auto pt-4">
    <!-- Header Section -->
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">About Us</h1>
      <p class="text-xl text-gray-600 max-w-2xl mx-auto">
        We are passionate about creating innovative solutions that make a difference in people's lives.
      </p>
    </div>

    <!-- Mission Section -->
    <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
      <div class="flex items-center mb-6">
        <Target class="w-8 h-8 text-blue-600 mr-3" />
        <h2 class="text-2xl font-semibold text-gray-900">Our Mission</h2>
      </div>
      <p class="text-gray-700 text-lg leading-relaxed">
        To empower businesses and individuals with cutting-edge technology solutions that drive growth, 
        efficiency, and innovation. We believe in creating products that not only meet current needs 
        but anticipate future challenges.
      </p>
    </div>

    <!-- Values Grid -->
    <div class="grid md:grid-cols-2 gap-8 mb-12">
      <div class="bg-white rounded-lg shadow-lg p-6">
        <div class="flex items-center mb-4">
          <Users class="w-6 h-6 text-green-600 mr-3" />
          <h3 class="text-xl font-semibold text-gray-900">People First</h3>
        </div>
        <p class="text-gray-700">
          We prioritize our team members, customers, and community. Every decision we make 
          considers the human impact and strives to create positive experiences.
        </p>
      </div>

      <div class="bg-white rounded-lg shadow-lg p-6">
        <div class="flex items-center mb-4">
          <Award class="w-6 h-6 text-purple-600 mr-3" />
          <h3 class="text-xl font-semibold text-gray-900">Excellence</h3>
        </div>
        <p class="text-gray-700">
          We maintain the highest standards in everything we do, from code quality to customer 
          service. Excellence is not just a goal—it's our standard.
        </p>
      </div>
    </div>

    <!-- Company Stats -->
    <div class="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-8 text-white">
      <h2 class="text-2xl font-semibold mb-6 text-center">Our Impact</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div>
          <div class="text-3xl font-bold mb-2">500+</div>
          <div class="text-blue-100">Happy Clients</div>
        </div>
        <div>
          <div class="text-3xl font-bold mb-2">50+</div>
          <div class="text-blue-100">Team Members</div>
        </div>
        <div>
          <div class="text-3xl font-bold mb-2">100+</div>
          <div class="text-blue-100">Projects Completed</div>
        </div>
      </div>
    </div>

    <!-- Team Section -->
    <div class="mt-12">
      <h2 class="text-2xl font-semibold text-gray-900 mb-6 text-center">Our Team</h2>
      <div class="grid md:grid-cols-3 gap-6">
        <div class="bg-white rounded-lg shadow-lg p-6 text-center">
          <div class="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
            <Building2 class="w-10 h-10 text-gray-400" />
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Development Team</h3>
          <p class="text-gray-600">Expert developers crafting innovative solutions</p>
        </div>
        
        <div class="bg-white rounded-lg shadow-lg p-6 text-center">
          <div class="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
            <Users class="w-10 h-10 text-gray-400" />
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Design Team</h3>
          <p class="text-gray-600">Creative designers shaping user experiences</p>
        </div>
        
        <div class="bg-white rounded-lg shadow-lg p-6 text-center">
          <div class="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
            <Target class="w-10 h-10 text-gray-400" />
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Strategy Team</h3>
          <p class="text-gray-600">Strategic thinkers driving business growth</p>
        </div>
      </div>
    </div>
  </div>
</template> 