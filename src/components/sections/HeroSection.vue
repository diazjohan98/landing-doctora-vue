<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

// Referencias para las animaciones con GSAP
const heroSection = ref<HTMLElement | null>(null)
const navElements = ref<HTMLElement | null>(null)
const brandLogo = ref<HTMLElement | null>(null)
const brandTextImgs = ref<HTMLElement | null>(null)
const heroDescription = ref<HTMLElement | null>(null)
const heroBtn = ref<HTMLElement | null>(null)
const waveLeft = ref<HTMLElement | null>(null)
const waveRight = ref<HTMLElement | null>(null)

onMounted(() => {
    // 1. Configuramos el estado inicial de los elementos del contenido
    gsap.set([navElements.value, brandLogo.value, brandTextImgs.value, heroDescription.value, heroBtn.value], {
        opacity: 0,
        y: 30
    })

    // 2. Línea de tiempo para la entrada principal (Navbar, Logo, Textos)
    const tl = gsap.timeline({ delay: 1.5 })

    tl.to(navElements.value, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out'
    })
        .to([brandLogo.value, brandTextImgs.value], {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power2.out'
        }, "-=0.4")
        .to([heroDescription.value, heroBtn.value], {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power2.out'
        }, "-=0.4")

    /* =========================================================
       🚀 MAGIA RESPONSIVA CON GSAP MATCHMEDIA
       ========================================================= */
    const mm = gsap.matchMedia()

    // CONDICIÓN A: Escritorio (Pantallas mayores a 768px) -> Movimiento suave y lento
    mm.add("(min-width: 769px)", () => {
        gsap.to(waveLeft.value, {
            x: '30vw',
            duration: 6,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1
        })

        gsap.to(waveRight.value, {
            x: '-30vw',
            duration: 7,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1
        })
    })

    // CONDICIÓN B: Móviles (Pantallas de 768px o menos) -> ¡EL DOBLE DE RÁPIDO!
    mm.add("(max-width: 768px)", () => {
        gsap.to(waveLeft.value, {
            x: '30vw',
            duration: 3, // Bajamos de 6s a 3s para acelerar el ritmo
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1
        })

        gsap.to(waveRight.value, {
            x: '-30vw',
            duration: 3.5, // Bajamos de 7s a 3.5s
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1
        })
    })
})
</script>

<template>
    <section ref="heroSection" class="hero-container">
        <div class="hero-overlay"></div>

        <div ref="waveLeft" class="ambient-wave wave-left"></div>
        <div ref="waveRight" class="ambient-wave wave-right"></div>

        <nav ref="navElements" class="hero-nav">
            <ul class="nav-links">
                <li><a href="#sobre-mi">Sobre mi</a></li>
                <li><a href="#servicios">Servicios</a></li>
                <li><a href="#testimonios">Testimonios</a></li>
            </ul>
            <a href="#contacto" class="btn-outline nav-btn">Agenda Tu Cita</a>
        </nav>

        <div class="hero-content">
            <div class="brand-block">
                <img ref="brandLogo" src="../../assets/LogoDiente.png" alt="Logo MF" class="main-logo" />

                <div ref="brandTextImgs" class="text-images-wrapper">
                    <img src="../../assets/LogoDecripcion.png" alt="Dra. María Fernanda Bernal R." class="img-name" />
                </div>
            </div>

            <p ref="heroDescription" class="hero-description">
                Transforma tu sonrisa con tratamientos personalizados y tecnología de vanguardia
            </p>

            <button ref="heroBtn" class="btn-outline main-cta">
                Reserva tu Cita
            </button>
        </div>
    </section>
</template>

<style scoped>
/* =========================================
   CONTENEDOR PRINCIPAL Y FONDO
   ========================================= */
.hero-container {
    position: relative;
    width: 100%;
    height: 100vh;
    box-sizing: border-box;
    overflow: hidden;
    background-image: url('@/assets/hero-bg.jpg');
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

/* =========================================
   NAVBAR
   ========================================= */
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

/* =========================================
   CONTENIDO CENTRAL
   ========================================= */
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
    width: 140px;
    height: auto;
    object-fit: contain;
}

.text-images-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.img-name {
    width: 420px;
    height: auto;
    object-fit: contain;
}

.hero-description {
    color: #ffffff;
    font-family: "Poppins", sans-serif;
    font-size: 1rem;
    font-weight: 300;
    letter-spacing: 0.5px;
    max-width: 800px;
    margin-bottom: 2.5rem;
}

/* =========================================
   BOTONES
   ========================================= */
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
    padding: 0.8rem 2.5rem;
    font-size: 0.95rem;
    letter-spacing: 0.5px;
}

/* =========================================
   ESTILOS DE ONDAS (ESCRITORIO)
   ========================================= */
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

/* =========================================
   RESPONSIVE BÁSICO & CONFIG ONDAS MÓVIL
   ========================================= */
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
        width: 100px;
        height: auto;
    }

    .text-images-wrapper {
        align-items: center;
    }

    .img-name {
        width: 280px;
        height: auto;
    }

    .hero-description {
        font-size: 0.9rem;
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