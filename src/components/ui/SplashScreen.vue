<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const splashContainer = ref<HTMLElement | null>(null)
const logoElement = ref<HTMLElement | null>(null)

onMounted(() => {
    document.body.style.overflow = 'hidden'

    gsap.set(logoElement.value, { scale: 0.10 })

    const tl = gsap.timeline({
        onComplete: () => {
            document.body.style.overflow = 'auto'
            if (splashContainer.value) {
                splashContainer.value.style.display = 'none'
            }
        }
    })

    tl.to(logoElement.value, {
        scale: 2, // Ahora solo crece al doble de su tamaño GIGANTE real, no 80 veces. ¡Cero pixelado!
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