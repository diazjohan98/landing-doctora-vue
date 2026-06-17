<script setup>
import { RouterView } from "vue-router";
import SplashScreen from '@/components/ui/SplashScreen.vue'
import HeroSection from "./components/sections/HeroSection.vue";
import AboutSection from "./components/sections/AboutSection.vue";
</script>



<template>
  <!-- El componente que acabamos de crear -->
  <SplashScreen />
  <HeroSection />
  <AboutSection />
  <!-- El resto de tu aplicación -->
  <main class="app-content">
    <RouterView />
  </main>
</template>





<style>
/* Estilos globales básicos */
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
