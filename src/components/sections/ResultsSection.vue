<script setup lang="ts">
import { ref } from 'vue'
import { useResultsCarousel } from '@/composables/useResultsCarousel'

const resultsSection = ref<HTMLElement | null>(null)

const { cases, currentIndex, goToSlide } = useResultsCarousel(resultsSection)
</script>

<template>
    <section ref="resultsSection" class="results-section" id="testimonios">

        <div class="section-header">
            <h4 class="gold-subtitle">El Arte de la Estética Dental</h4>
            <h2 class="main-title">RESULTADOS QUE DEVUELVEN LA CONFIANZA.</h2>
        </div>

        <div class="carousel-container">
            <p class="carousel-subtitle">Resultados que hablan por si solos...</p>

            <div class="carousel-track">
                <transition name="fade" mode="out-in">
                    <!-- Tu HTML del slide queda intacto -->
                    <div class="slide" :key="currentIndex">
                        <div class="image-wrapper">
                            <span class="img-label">Antes</span>
                            <img :src="cases[currentIndex].beforeImg" alt="Antes" loading="lazy" />
                        </div>

                        <div class="arrow-separator">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </div>

                        <div class="image-wrapper">
                            <span class="img-label">Después</span>
                            <img :src="cases[currentIndex].afterImg" alt="Después" loading="lazy" />
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
    background-repeat: no-repeat;
    background-attachment: fixed;
}

.section-header {
    text-align: center;
    margin-bottom: 50px;
}

.gold-subtitle {
    color: #d4af37;
    font-weight: 500;
    margin-bottom: 15px;
    font-size: 1.1rem;
}

.main-title {
    color: #ffffff;
    font-size: 2rem;
    font-weight: 800;
    letter-spacing: 1px;
    text-transform: uppercase;
}

.carousel-container {
    background: rgba(0, 0, 0, 0.4);

    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);

    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 20px;
    padding: 40px 60px;
    max-width: 900px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
}

.carousel-subtitle {
    color: #d4af37;
    margin-bottom: 40px;
    font-size: 1.1rem;
}


.carousel-track {
    width: 100%;
    min-height: 250px;
    display: flex;
    justify-content: center;
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
    width: 45%;
}

.image-wrapper img {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 12px;
    transition: transform 0.3s ease;
}

.img-label {
    position: absolute;
    top: 15px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.4);
    color: white;
    padding: 4px 20px;
    border-radius: 30px;
    font-size: 0.85rem;
    z-index: 2;
}

.arrow-separator {
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
}


.treatment-text {
    color: #aaaaaa;
    margin-top: 40px;
    font-size: 1rem;
    text-align: center;
}

.treatment-highlight {
    color: #ffffff;
    font-style: italic;
}

.dots-container {
    display: flex;
    gap: 10px;
    margin-top: 30px;
}

.dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    border: 1px solid #aaaaaa;
    background: transparent;
    cursor: pointer;
    transition: all 0.3s ease;
    padding: 0;
}

.dot.active {
    background: #ffffff;
    border-color: #ffffff;
    box-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}


@media (max-width: 768px) {
    .carousel-container {
        padding: 30px 20px;
    }

    .slide {
        flex-direction: column;
        gap: 20px;
    }

    .image-wrapper {
        width: 100%;
    }

    .arrow-separator svg {
        transform: rotate(90deg);
    }

    .main-title {
        font-size: 1.5rem;
    }
}
</style>