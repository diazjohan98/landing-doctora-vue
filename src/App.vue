<script setup>
import { RouterView } from "vue-router";
import SplashScreen from '@/components/ui/SplashScreen.vue'
</script>



<template>
  <!-- El componente que acabamos de crear -->
  <SplashScreen />

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
}
</style>
