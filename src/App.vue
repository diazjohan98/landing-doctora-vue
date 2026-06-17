<script setup>
import { RouterView } from "vue-router";
import SplashScreen from '@/components/ui/SplashScreen.vue'
import HomeView from "./views/HomeView.vue";
import Footer from "./components/layout/Footer.vue";
import WhatsAppWidget from "./components/ui/WhatsAppWidget.vue";
</script>

<template>
  <SplashScreen />

  <main class="app-content">
    <HomeView />
    <RouterView />
  </main>

  <Footer />
  <WhatsAppWidget />
</template>

<style>
html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  font-family: "Poppins", sans-serif;
}
</style>