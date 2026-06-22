<script setup lang="ts">
import { ref, watch } from 'vue'
import { useResultsCarousel } from '@/composables/useResultsCarousel'

const resultsSection = ref<HTMLElement | null>(null)
const { cases, currentIndex, goToSlide } = useResultsCarousel(resultsSection)

// 🚀 ESTADO PARA EL SWITCH EN MÓVIL
const activeView = ref<'antes' | 'despues'>('antes')

// 🚀 Cuando el carrusel cambia de paciente automáticamente o al hacer clic, 
// reiniciamos el switch para que siempre empiece mostrando el "Antes".
watch(currentIndex, () => {
    activeView.value = 'antes'
})
</script>

<template>
    <section ref="resultsSection" class="results-section" id="testimonios">

        <div class="section-header">
            <h4 class="gold-subtitle">El Arte de la Estética Dental</h4>
            <h2 class="main-title">RESULTADOS QUE DEVUELVEN LA CONFIANZA.</h2>
        </div>

        <div class="carousel-container">
            <p class="carousel-subtitle">Resultados que hablan por si solos...</p>

            <!-- 🚀 NUEVO: SWITCH TIPO iOS (Oculto en Escritorio, Visible en Móvil) -->
            <div class="mobile-toggle-container">
                <div class="toggle-switch" :data-active="activeView">
                    <div class="toggle-pill"></div>
                    <button class="toggle-btn" :class="{ active: activeView === 'antes' }"
                        @click="activeView = 'antes'">
                        Antes
                    </button>
                    <button class="toggle-btn" :class="{ active: activeView === 'despues' }"
                        @click="activeView = 'despues'">
                        Después
                    </button>
                </div>
            </div>

            <div class="carousel-track">
                <transition name="fade" mode="out-in">

                    <div class="slide" :key="currentIndex">

                        <!-- Contenedor ANTES -->
                        <div class="image-wrapper" :class="{ 'active-view': activeView === 'antes' }">
                            <span class="img-label desktop-only">Antes</span>
                            <img :src="cases[currentIndex].beforeImg" alt="Antes" />
                        </div>

                        <!-- Flecha separadora (Oculta en Móvil) -->
                        <div class="arrow-separator desktop-only">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </div>

                        <!-- Contenedor DESPUÉS -->
                        <div class="image-wrapper" :class="{ 'active-view': activeView === 'despues' }">
                            <span class="img-label desktop-only">Después</span>
                            <img :src="cases[currentIndex].afterImg" alt="Después" />
                        </div>

                    </div>

                </transition>
            </div>

            <p class="treatment-text">
                Tratamiento: <span class="treatment-highlight">{{ cases[currentIndex].treatment }}</span>
            </p>

            <div class="dots-container">
                <button v-for="(item, index) in cases" :key="item.id" class="dot"
                    :class="{ active: index === currentIndex }" @click="goToSlide(index)"
                    aria-label="Cambiar slide"></button>
            </div>

        </div>
    </section>
</template>

<style scoped>
.results-section {
    position: relative;
    padding: 100px 5%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-image: linear-gradient(rgba(10, 10, 10, 0.85), rgba(10, 10, 10, 0.85)), url('/casos/despues-1.jpg');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
}

.section-header {
    text-align: center;
    margin-bottom: 40px;
}

.gold-subtitle {
    color: #d4af37;
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 15px;
}

.main-title {
    color: #ffffff;
    font-size: 2.2rem;
    font-weight: 700;
}

.carousel-container {
    width: 100%;
    max-width: 1000px;
    background: rgba(20, 20, 20, 0.6);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 40px;
    text-align: center;
}

.carousel-subtitle {
    color: #d4af37;
    font-size: 1.1rem;
    font-weight: 400;
    margin-bottom: 30px;
}

.mobile-toggle-container {
    display: none;
}

.slide {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 30px;
    width: 100%;
}

.image-wrapper {
    position: relative;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    width: 100%;
    aspect-ratio: 4 / 3;
    background-color: #1a1a1a;
}

.image-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.carousel-track {
    min-height: 350px;
    display: flex;
    align-items: center;
}

.img-label {
    position: absolute;
    top: 15px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.6);
    color: #ffffff;
    padding: 5px 15px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 600;
    border: 1px solid rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(5px);
    z-index: 10;
}

.arrow-separator {
    color: #d4af37;
}

.treatment-text {
    color: #ffffff;
    font-size: 1.1rem;
    margin-top: 30px;
}

.treatment-highlight {
    font-weight: 700;
    font-style: italic;
}

.dots-container {
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-top: 25px;
}

.dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
}

.dot.active {
    background: #d4af37;
    transform: scale(1.3);
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.6s ease-in-out, transform 0.6s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: scale(0.98);
}


.image-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    animation: smoothRender 0.5s ease-out forwards;
}

@keyframes smoothRender {
    0% {
        filter: blur(10px);
        transform: scale(1.05);
    }

    100% {
        filter: blur(0);
        transform: scale(1);
    }
}


@media (max-width: 768px) {

    .carousel-container {
        padding: 25px 15px;
    }

    .main-title {
        font-size: 1.2rem;
    }

    .carousel-subtitle {
        font-size: 1.0rem;
        font-weight: 400;
    }

    .desktop-only {
        display: none !important;
    }

    .mobile-toggle-container {
        display: flex;
        justify-content: center;
        margin-bottom: 25px;
    }

    .toggle-switch {
        display: flex;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 30px;
        padding: 4px;
        width: 240px;
        position: relative;
    }

    .toggle-btn {
        flex: 1;
        padding: 10px 0;
        background: transparent;
        border: none;
        color: #ffffff;
        font-family: 'Poppins', sans-serif;
        font-weight: 600;
        font-size: 0.9rem;
        cursor: pointer;
        z-index: 2;
        transition: color 0.3s ease;
    }

    .toggle-btn.active {
        color: #000000;
    }

    .toggle-pill {
        position: absolute;
        top: 4px;
        bottom: 4px;
        left: 4px;
        width: calc(50% - 4px);
        background: #d4af37;
        border-radius: 26px;
        z-index: 1;
        transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);
    }

    .toggle-switch[data-active="despues"] .toggle-pill {
        transform: translateX(100%);
    }

    .slide {
        display: grid;
        grid-template-areas: "overlap";
        gap: 0;
    }

    .image-wrapper {
        grid-area: overlap;
        opacity: 0;
        transition: opacity 0.4s ease-in-out;
        pointer-events: none;
    }

    .image-wrapper.active-view {
        opacity: 1;
        pointer-events: auto;
        z-index: 2;
    }

    .treatment-text {
        font-size: 1rem;
        margin-top: 20px;
    }
}
</style>