<script setup lang="ts">
import { Mail, Phone, MapPin, Clock, Send } from "lucide-vue-next";
import { ref } from "vue";

const formData = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
});

const handleSubmit = () => {
  // Handle form submission here
  console.log('Form submitted:', formData.value);
  // You can add API call or email service integration here
  alert('Thank you for your message! We will get back to you soon.');
  
  // Reset form
  formData.value = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };
};
</script>

<template>
  <div class="max-w-6xl mx-auto pt-4">
    <!-- Header Section -->
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
      <p class="text-xl text-gray-600 max-w-2xl mx-auto">
        Get in touch with us. We'd love to hear from you and answer any questions you might have.
      </p>
    </div>

    <div class="grid lg:grid-cols-2 gap-12">
      <!-- Contact Form -->
      <div class="bg-white rounded-lg shadow-lg p-8">
        <h2 class="text-2xl font-semibold text-gray-900 mb-6">Send us a Message</h2>
        
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                id="name"
                v-model="formData.name"
                type="text"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Enter your full name"
              />
            </div>
            
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                id="email"
                v-model="formData.email"
                type="email"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Enter your email"
              />
            </div>
          </div>
          
          <div>
            <label for="subject" class="block text-sm font-medium text-gray-700 mb-2">
              Subject *
            </label>
            <input
              id="subject"
              v-model="formData.subject"
              type="text"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="What is this about?"
            />
          </div>
          
          <div>
            <label for="message" class="block text-sm font-medium text-gray-700 mb-2">
              Message *
            </label>
            <textarea
              id="message"
              v-model="formData.message"
              required
              rows="5"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
              placeholder="Tell us more about your inquiry..."
            ></textarea>
          </div>
          
          <button
            type="submit"
            class="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center justify-center"
          >
            <Send class="w-5 h-5 mr-2" />
            Send Message
          </button>
        </form>
      </div>

      <!-- Contact Information -->
      <div class="space-y-8">
        <!-- General Contact -->
        <div class="bg-white rounded-lg shadow-lg p-8">
          <h2 class="text-2xl font-semibold text-gray-900 mb-6">Get in Touch</h2>
          
          <div class="space-y-6">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <Mail class="w-6 h-6 text-blue-600 mt-1" />
              </div>
              <div class="ml-4">
                <h3 class="text-lg font-medium text-gray-900">Email</h3>
                <p class="text-gray-600">info@company.com</p>
                <p class="text-gray-600">support@company.com</p>
              </div>
            </div>
            
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <Phone class="w-6 h-6 text-blue-600 mt-1" />
              </div>
              <div class="ml-4">
                <h3 class="text-lg font-medium text-gray-900">Phone</h3>
                <p class="text-gray-600">+1 (555) 123-4567</p>
                <p class="text-gray-600">+1 (555) 987-6543</p>
              </div>
            </div>
            
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <MapPin class="w-6 h-6 text-blue-600 mt-1" />
              </div>
              <div class="ml-4">
                <h3 class="text-lg font-medium text-gray-900">Address</h3>
                <p class="text-gray-600">
                  123 Business Street<br>
                  Suite 100<br>
                  City, State 12345
                </p>
              </div>
            </div>
            
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <Clock class="w-6 h-6 text-blue-600 mt-1" />
              </div>
              <div class="ml-4">
                <h3 class="text-lg font-medium text-gray-900">Business Hours</h3>
                <p class="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p class="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
                <p class="text-gray-600">Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>

        <!-- FAQ Section -->
        <div class="bg-white rounded-lg shadow-lg p-8">
          <h2 class="text-2xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
          
          <div class="space-y-4">
            <div class="border-b border-gray-200 pb-4">
              <h3 class="text-lg font-medium text-gray-900 mb-2">How quickly do you respond to inquiries?</h3>
              <p class="text-gray-600">We typically respond to all inquiries within 24 hours during business days.</p>
            </div>
            
            <div class="border-b border-gray-200 pb-4">
              <h3 class="text-lg font-medium text-gray-900 mb-2">Do you offer support after project completion?</h3>
              <p class="text-gray-600">Yes, we provide ongoing support and maintenance for all our projects.</p>
            </div>
            
            <div class="border-b border-gray-200 pb-4">
              <h3 class="text-lg font-medium text-gray-900 mb-2">What are your payment terms?</h3>
              <p class="text-gray-600">We offer flexible payment terms and can discuss options based on your project needs.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 