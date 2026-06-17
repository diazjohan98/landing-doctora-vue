<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const splashContainer = ref<HTMLElement | null>(null)
const logoElement = ref<HTMLElement | null>(null)

onMounted(() => {
    document.body.style.overflow = 'hidden'

    // 1. Detectamos si es un dispositivo móvil (menor o igual a 768px)
    const isMobile = window.innerWidth <= 768;

    // 2. Definimos la escala: 
    // Si es móvil, usamos 0.25 (o el valor que prefieras para que sea "más grandecito")
    // Si es PC, mantenemos tu 0.10 original
    const initialScale = isMobile ? 0.25 : 0.10;

    gsap.set(logoElement.value, { scale: initialScale })

    const tl = gsap.timeline({
        onComplete: () => {
            document.body.style.overflow = 'auto'
            if (splashContainer.value) {
                splashContainer.value.style.display = 'none'
            }
        }
    })

    tl.to(logoElement.value, {
        scale: 1.5, // Mantenemos el zoom final controlado
        opacity: 0,
        duration: 1.2,
        ease: 'power3.inOut',
        delay: 0.8
    })
        .to(splashContainer.value, {
            opacity: 0,
            duration: 0.5,
            ease: 'power1.out'
        }, "-=0.6")
})
</script>


<template>
    <!-- Contenedor principal que cubre toda la pantalla -->
    <div ref="splashContainer" class="splash-screen">
        <!-- Tu logo (Asegúrate de tener un SVG o PNG sin fondo) -->
        <img ref="logoElement" src="../../assets/LogoDiente.png" alt="Dra. María Fernanda" class="splash-logo" />
    </div>
</template>

<style scoped>
.splash-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #0a0a0a;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

.splash-logo {
    /* Le damos un tamaño nativo gigantesco para que el navegador renderice en alta calidad */
    width: 5000px;
    max-width: none;
    /* Vital: Evita que el navegador la auto-reduzca */
    will-change: transform;
}
</style>