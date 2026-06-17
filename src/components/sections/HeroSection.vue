<script setup lang="ts">
import { ref } from 'vue'
import { useHeroAnimations } from '@/composables/useHeroAnimations'

const heroSection = ref<HTMLElement | null>(null)

useHeroAnimations(heroSection)

const scrollToContact = () => {
    const contactSection = document.getElementById('contacto');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }
}
</script>

<template>
    <section ref="heroSection" class="hero-container">
        <div class="hero-overlay"></div>

        <div class="ambient-wave wave-left"></div>
        <div class="ambient-wave wave-right"></div>

        <nav class="hero-nav">
            <ul class="nav-links">
                <li><a href="#sobre-mi">Sobre mi</a></li>
                <li><a href="#servicios">Servicios</a></li>
                <li><a href="#testimonios">Testimonios</a></li>
            </ul>
            <a href="#contacto" class="btn-outline nav-btn">Agenda Tu Cita</a>
        </nav>

        <div class="hero-content">
            <div class="brand-block">
                <img src="../../assets/LogoDiente.png" alt="Logo MF" class="main-logo" />

                <div class="text-images-wrapper">
                    <img src="../../assets/LogoDecripcion.png" alt="Dra. María Fernanda Bernal R." class="img-name" />
                </div>
            </div>

            <p class="hero-description">
                Transforma tu sonrisa con tratamientos personalizados y tecnología de vanguardia
            </p>

            <button @click="scrollToContact" class="btn-outline main-cta">
                Reserva tu Cita
            </button>
        </div>
    </section>
</template>

<style scoped>
.hero-container {
    position: relative;
    width: 100%;
    height: 100vh;
    box-sizing: border-box;
    overflow: hidden;
    background-image: url('@/assets/hero-bg.JPG');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
}

.hero-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.65);
    z-index: 1;
}


.hero-nav {
    position: relative;
    z-index: 3;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 2rem 4rem;
    gap: 3rem;
}

.nav-links {
    list-style: none;
    display: flex;
    gap: 2rem;
    margin: 0;
    padding: 0;
}

.nav-links a {
    color: #ffffff;
    text-decoration: none;
    font-family: sans-serif;
    font-size: 0.9rem;
    font-weight: 500;
    transition: color 0.3s ease;
}

.nav-links a:hover {
    color: #d4af37;
}


.hero-content {
    position: relative;
    z-index: 3;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 0 2rem;
}

.brand-block {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 25px;
    margin-bottom: 1.5rem;
}

.main-logo {
    width: 180px;
    height: auto;
    object-fit: contain;
}

.text-images-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.img-name {
    width: 550px;
    height: auto;
    object-fit: contain;
}

.hero-description {
    color: #ffffff;
    font-family: "Poppins", sans-serif;
    font-size: 1.2rem;
    font-weight: 300;
    letter-spacing: 0.5px;
    max-width: 800px;
    margin-bottom: 2.5rem;
}

.btn-outline {
    background: transparent;
    color: #ffffff;
    border: 1.5px solid #ffffff;
    border-radius: 30px;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.3s ease;
    font-family: "Poppins", sans-serif;
    font-weight: 500;
}

.btn-outline:hover {
    background: #ffffff;
    color: #0a0a0a;
}

.nav-btn {
    padding: 0.6rem 1.8rem;
    font-size: 0.85rem;
}

.main-cta {
    padding: 1.2rem 3rem;
    font-size: 1.1rem;
    letter-spacing: 0.5px;
}


.ambient-wave {
    position: absolute;
    top: 0;
    width: 25vw;
    height: 100vh;
    z-index: 2;
    pointer-events: none;
    background: rgba(0, 0, 0, 0.8);
    filter: blur(250px);
    border-radius: 10%;
}

.wave-left {
    left: -20vw;
}

.wave-right {
    right: -20vw;
}

@media (max-width: 768px) {
    .hero-nav {
        justify-content: center;
        padding: 1.5rem 1rem;
        flex-direction: column;
        gap: 1rem;
    }

    .brand-block {
        flex-direction: column;
        gap: 15px;
    }

    .main-logo {
        width: 130px;
        height: auto;
    }

    .text-images-wrapper {
        align-items: center;
    }

    .img-name {
        width: 320px;
        height: auto;
    }

    .hero-description {
        font-size: 1rem;
        padding: 0 10px;
        margin-bottom: 2rem;
    }

    /* Ajuste visual de ondas para celular */
    .ambient-wave {
        width: 60vw;
        filter: blur(150px);
    }

    .wave-left {
        left: -45vw;
    }

    .wave-right {
        right: -45vw;
    }
}
</style>