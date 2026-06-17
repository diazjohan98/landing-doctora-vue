<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const aboutWrapper = ref<HTMLElement | null>(null)

onMounted(() => {
    setTimeout(() => {
        ScrollTrigger.refresh();
    }, 500);

    /* =========================================================
       🎬 ANIMACIÓN 1: LA FOTO DE LA DOCTORA (Global)
       ========================================================= */
    const imageElement = aboutWrapper.value?.querySelector('.about-image');
    if (imageElement) {
        gsap.fromTo(imageElement,
            { opacity: 0, scale: 1.15, filter: 'blur(10px)' },
            {
                opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.5, ease: 'power3.out',
                scrollTrigger: { trigger: aboutWrapper.value, start: 'top 85%', end: 'bottom 20%', toggleActions: 'restart reverse restart reverse', lazy: false }
            }
        );
    }

    /* =========================================================
       🚀 ANIMACIÓN 2: TEXTOS Y BOTÓN (Excluimos las tarjetas)
       ========================================================= */
    // Usamos :not(.card) para no animar las tarjetas aquí, porque las manejaremos con matchMedia
    const textElements = aboutWrapper.value?.querySelectorAll('.animate-on-scroll:not(.card)');
    if (textElements && textElements.length > 0) {
        gsap.fromTo(textElements,
            { opacity: 0, y: 80, rotationX: -15 },
            {
                opacity: 1, y: 0, rotationX: 0, duration: 1.2, stagger: 0.15, ease: 'expo.out',
                scrollTrigger: { trigger: aboutWrapper.value, start: 'top 85%', end: 'bottom 20%', toggleActions: 'restart reverse restart reverse', lazy: false }
            }
        );
    }

    /* =========================================================
       ✨ ANIMACIÓN 3: EFECTO FLOTANTE DE LOS ICONOS (Global)
       ========================================================= */
    const icons = aboutWrapper.value?.querySelectorAll('.icon');
    if (icons && icons.length > 0) {
        gsap.to(icons, { y: -10, duration: 2.5, yoyo: true, repeat: -1, ease: 'sine.inOut', stagger: 0.4 });
    }

    const btnGold = aboutWrapper.value?.querySelector('.btn-gold');
    if (btnGold) {
        gsap.to(btnGold, {
            // Doble sombra: una intensa cerca del borde (0.8) y otra amplia para iluminar el fondo (0.3)
            boxShadow: '0 0 15px rgba(212, 175, 55, 0.8), 0 0 30px rgba(212, 175, 55, 0.3)',
            scale: 1.03, // Micro-crecimiento: el botón físicamente palpita un 3%
            duration: 1.2, // Lo bajamos de 1.5 a 1.2 para que el latido tenga un ritmo más activo
            yoyo: true,
            repeat: -1,
            ease: 'sine.inOut'
        });
    }
    /* =========================================================
       📱 MAGIA RESPONSIVA PARA LAS TARJETAS CON MATCHMEDIA
       ========================================================= */
    const mm = gsap.matchMedia();
    const cards = aboutWrapper.value?.querySelectorAll('.card');

    if (cards && cards.length > 0) {
        // ESCRITORIO (> 768px): Las 3 tarjetas entran en cascada con el scroll
        mm.add("(min-width: 769px)", () => {
            gsap.fromTo(cards,
                { opacity: 0, y: 80, rotationX: -15 },
                {
                    opacity: 1, y: 0, rotationX: 0, duration: 1.2, stagger: 0.2, ease: 'expo.out',
                    scrollTrigger: { trigger: aboutWrapper.value, start: 'top 85%', end: 'bottom 20%', toggleActions: 'restart reverse restart reverse' }
                }
            );
        });

        // MÓVIL (<= 768px): Aparecen y desaparecen automáticamente una por una (Bucle infinito)
        mm.add("(max-width: 768px)", () => {
            // Aseguramos que todas empiecen invisibles y fijas en su sitio
            gsap.set(cards, { opacity: 0, y: 0 });

            // Creamos una línea de tiempo infinita
            const tl = gsap.timeline({ repeat: -1 });

            cards.forEach((card) => {
                tl.to(card, {
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power2.inOut'
                }) // Aparece suavemente
                    .to({}, { duration: 2.5 }) // Se queda quieta 2.5 segundos para que la lean
                    .to(card, {
                        opacity: 0,
                        duration: 0.8,
                        ease: 'power2.inOut'
                    }); // Se desvanece suavemente en su mismo sitio
            });
        });
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
        display: grid;
        width: 100%;
        max-width: 320px;
        /* 🚀 MOVIDO AQUÍ: El contenedor ahora mide lo que mide la tarjeta */
        margin: 0 auto 30px auto;
        /* 🚀 LA MAGIA: 'auto' a los lados centra todo el bloque por completo */
    }

    .card {
        grid-area: 1 / 1;
        width: 180%;
        padding: 30px;
        opacity: 0;
        z-index: 1;
        box-sizing: border-box;
    }

    .btn-gold {
        width: 100%;
        max-width: 320px;
        padding: 18px 0;
        font-size: 1.1rem;
        margin: 20px auto 0 auto;
        /* Centramos tmbién el botón */
    }
}
</style>