<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const aboutWrapper = ref<HTMLElement | null>(null)

onMounted(() => {
    // 1. Forzamos un pequeño delay para asegurar que las imágenes carguen y el DOM esté listo
    setTimeout(() => {
        ScrollTrigger.refresh();
    }, 500);

    const elements = aboutWrapper.value?.querySelectorAll('.animate-on-scroll');

    if (elements && elements.length > 0) {
        gsap.fromTo(elements,
            { opacity: 0, y: 80 },
            {
                opacity: 1,
                y: 0,
                duration: 1.2,
                stagger: 0.25,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: aboutWrapper.value,
                    start: 'top 85%', // Un poco más abajo para dar tiempo a cargar
                    end: 'bottom 20%',
                    toggleActions: 'restart reverse restart reverse',
                    lazy: false,
                }
            }
        );
    }
})
</script>

<template>
    <section class="about-section" id="sobre-mi">
        <div ref="aboutWrapper" class="about-container">

            <div class="about-image animate-on-scroll">
                <img src="../../assets/doctora.jpg" alt="Dra. María Fernanda" />
            </div>

            <div class="about-content">
                <img src="../../assets/logoNombre.png" alt="Dra. María Fernanda Bernal R."
                    class="logo-nombre animate-on-scroll" />

                <h3 class="stat-text animate-on-scroll">Más de 500 sonrisas transformadas en más de 5 años de
                    experiencia</h3>

                <p class="description-text animate-on-scroll">Mi misión va más allá de cuidar tu salud oral; me apasiona
                    devolverle la
                    confianza y la seguridad a
                    cada paciente a través de un trato humano, sin dolor y con la máxima precisión estética</p>

                <div class="cards-grid">
                    <div class="card animate-on-scroll">
                        <img src="../../assets/icon-park-outline_teeth.png" alt="Especialista" class="icon" />
                        <h4>Especialista</h4>
                        <p>Estética Integral y Armonización Orofacial</p>
                    </div>

                    <div class="card animate-on-scroll">
                        <img src="../../assets/glyphs_microscope.png" alt="Tecnología" class="icon" />
                        <h4>Tecnología</h4>
                        <p>Diagnóstico Digital Avanzado y Precisión</p>
                    </div>

                    <div class="card animate-on-scroll">
                        <img src="../../assets/mynaui_graduation-cap.png" alt="Formación" class="icon" />
                        <h4>Formación</h4>
                        <p>Continua y Alta Gama Clínica</p>
                    </div>
                </div>

                <button class="btn-gold animate-on-scroll">
                    Programa tu cita
                </button>

            </div>
        </div>
    </section>
</template>

<style scoped>
.about-section {
    background-color: #000;
    padding: 120px 5%;
    color: white;
    min-height: 100vh;
    display: flex;
    align-items: center;
}

.about-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    /* Más separación entre columnas */
    align-items: center;
    max-width: 1400px;
    /* Más ancho total */
    margin: 0 auto;
}

.about-image img {
    width: 100%;
    border-radius: 20px;
    object-fit: cover;
    will-change: transform, opacity;
    /* Optimización para animaciones */
}

.logo-nombre {
    width: 450px;
    /* 🚀 Un poco más grande (antes 350px) */
    margin-bottom: 30px;
    will-change: transform, opacity;
}

.stat-text {
    font-size: 1.6rem;
    /* 🚀 Más grande (antes por defecto) */
    font-weight: 700;
    margin-bottom: 30px;
    color: #E0E0E0;
    line-height: 1.3;
    will-change: transform, opacity;
}

.description-text {
    font-size: 1.1rem;
    /* 🚀 Un poco más grande */
    line-height: 1.7;
    margin-bottom: 50px;
    /* Más espacio antes de las tarjetas */
    color: #ccc;
    will-change: transform, opacity;
}

/* Grid de tarjetas */
.cards-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 25px;
    /* Más espacio entre tarjetas */
    margin-bottom: 50px;
    /* Más espacio antes del botón */
}

.icon {
    width: 50px;
    /* 🚀 Un poco más grande (antes 40px) */
    height: 50px;
    object-fit: contain;
    margin-bottom: 20px;
}

.card {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #333;
    padding: 30px;
    /* 🚀 Más padding interior */
    border-radius: 16px;
    /* Bordes más suaves */
    background: rgba(255, 255, 255, 0.03);
    transition: all 0.3s ease;
    text-align: center;
    will-change: transform, opacity;
}

.card:hover {
    border-color: #d4af37;
    background: rgba(212, 175, 55, 0.05);
    /* Un sutil fondo dorado al hover */
    transform: translateY(-5px);
    /* Pequeña elevación al hover */
}

.card h4 {
    font-size: 1.2rem;
    /* 🚀 Títulos de tarjeta más grandes */
    margin: 15px 0 10px;
    font-weight: 600;
}

.card p {
    font-size: 0.95rem;
    /* 🚀 Texto de tarjeta más grande (antes 0.8rem) */
    line-height: 1.5;
    color: #bbb;
}

.btn-gold {
    display: block;
    /* Ocupa todo el ancho disponible para el margen */
    background: transparent;
    color: #d4af37;
    border: 2px solid #d4af37;
    padding: 18px 50px;
    /* 🚀 Más grande (antes 15px 40px) */
    border-radius: 8px;
    font-family: "Poppins", sans-serif;
    font-weight: 600;
    font-size: 1.1rem;
    /* 🚀 Más grande (antes 1rem) */
    cursor: pointer;
    transition: all 0.4s ease;
    margin: 40px auto 0;
    /* 🚀 CENTRADO HORIZONTALMENTE (auto left/right) */
    text-transform: uppercase;
    letter-spacing: 1.5px;
    will-change: transform, opacity;
}

.btn-gold:hover {
    background: #D4AF37;
    color: #0a0a0a;
    box-shadow: 0 0 25px rgba(212, 175, 55, 0.5);
    transform: scale(1.03);
    /* Ligerísimo aumento de tamaño al hover */
}

/* =========================================
   RESPONSIVE BÁSICO (Móviles)
   ========================================= */
@media (max-width: 1024px) {
    .about-container {
        gap: 50px;
    }

    .logo-nombre {
        width: 350px;
    }

    .stat-text {
        font-size: 1.4rem;
    }
}

@media (max-width: 768px) {
    .about-container {
        grid-template-columns: 1fr;
        gap: 40px;
    }

    /* 🚀 Todo más grande en móvil */
    .logo-nombre {
        width: 320px;
    }

    /* Ajuste de tamaño */
    .stat-text {
        font-size: 1.5rem;
        line-height: 1.4;
    }

    .description-text {
        font-size: 1.1rem;
    }

    .cards-grid {
        grid-template-columns: 1fr;
        gap: 25px;
    }

    .card {
        padding: 30px;
    }

    .btn-gold {
        width: 100%;
        /* Botón ancho en móvil para mejor click */
        padding: 18px 0;
        font-size: 1.1rem;
    }
}
</style>