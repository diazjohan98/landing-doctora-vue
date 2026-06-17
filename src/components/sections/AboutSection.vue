<script setup lang="ts">
import { useAboutAnimations } from '@/composables/useAboutAnimation';
import { ref } from 'vue'



const aboutWrapper = ref < HTMLElement | null > (null);

useAboutAnimations(aboutWrapper)

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
    align-items: center;
    max-width: 1400px;
    margin: 0 auto;
}

.about-image img {
    width: 100%;
    border-radius: 20px;
    object-fit: cover;
    will-change: transform, opacity;
}

.logo-nombre {
    width: 450px;
    margin-bottom: 30px;
    will-change: transform, opacity;
}

.stat-text {
    font-size: 1.6rem;
    font-weight: 700;
    margin-bottom: 30px;
    color: #E0E0E0;
    line-height: 1.3;
    will-change: transform, opacity;
}

.description-text {
    font-size: 1.1rem;
    line-height: 1.7;
    margin-bottom: 50px;
    color: #ccc;
    will-change: transform, opacity;
}

/* Grid de tarjetas */
.cards-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 25px;
    margin-bottom: 50px;
}

.icon {
    width: 50px;
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
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.03);
    transition: all 0.3s ease;
    text-align: center;
    will-change: transform, opacity;
}

.card:hover {
    border-color: #d4af37;
    background: rgba(212, 175, 55, 0.05);
    transform: translateY(-5px);
}

.card h4 {
    font-size: 1.2rem;
    margin: 15px 0 10px;
    font-weight: 600;
}

.card p {
    font-size: 0.95rem;
    line-height: 1.5;
    color: #bbb;
}

.btn-gold {
    display: block;
    background: transparent;
    color: #d4af37;
    border: 2px solid #d4af37;
    padding: 18px 50px;
    border-radius: 8px;
    font-family: "Poppins", sans-serif;
    font-weight: 600;
    font-size: 1.1rem;
    cursor: pointer;
    transition: all 0.4s ease;
    margin: 40px auto 0;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    will-change: transform, opacity;
}

.btn-gold:hover {
    background: #D4AF37;
    color: #0a0a0a;
    box-shadow: 0 0 25px rgba(212, 175, 55, 0.5);
    transform: scale(1.03);
}


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

    .logo-nombre {
        width: 320px;
    }

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
        margin: 0 auto 30px auto;
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
    }
}
</style>