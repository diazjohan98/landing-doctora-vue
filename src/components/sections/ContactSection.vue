<script setup lang="ts">
import { ref } from 'vue'
import { useContactAnimations } from '@/composables/useContactAnimations'

const contactSection = ref<HTMLElement | null>(null)
const { testimonials, currentIndex } = useContactAnimations(contactSection)

const submitForm = () => {
    console.log("Formulario enviado")
}
</script>

<template>
    <section ref="contactSection" class="contact-section" id="contacto">

        <div class="contact-content">

            <!-- COLUMNA IZQUIERDA: FORMULARIO -->
            <div class="form-container">
                <h3 class="form-title">PROGRAMA TU CITA HOY</h3>

                <form @submit.prevent="submitForm" class="appointment-form">
                    <input type="text" placeholder="Nombre" required class="form-input" />
                    <input type="email" placeholder="Correo Electronico" required class="form-input" />
                    <input type="tel" placeholder="Telefono" required class="form-input" />

                    <button type="submit" class="btn-submit">Quiero mi cita</button>
                </form>

                <p class="form-footer-text">Nuestros Clientes nos prefieren</p>
            </div>

            <!-- COLUMNA DERECHA: TESTIMONIOS -->
            <div class="testimonial-container">
                <!-- Estrellas (Puedes reemplazar por SVG si prefieres) -->
                <div class="stars">
                    ★★★★★
                </div>

                <!-- Carrusel de texto con transición de Vue -->
                <div class="testimonial-track">
                    <transition name="fade" mode="out-in">
                        <div class="testimonial-slide" :key="currentIndex">
                            <p class="quote-text">“{{ testimonials[currentIndex].text }}”</p>
                            <p class="quote-author">— {{ testimonials[currentIndex].author }}</p>
                        </div>
                    </transition>
                </div>
            </div>

        </div>

    </section>
</template>

<style scoped>
.contact-section {
    position: relative;
    padding: 100px 5%;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 80vh;

    /* 🚀 Fondo con Gradiente Oscuro para dar contraste al texto y formulario */
    background-image: linear-gradient(rgba(15, 15, 15, 0.88), rgba(15, 15, 15, 0.88)), url('/casos/hero-bg.jpg');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
}

.contact-content {
    display: flex;
    width: 100%;
    max-width: 1100px;
    gap: 60px;
    align-items: center;
    justify-content: space-between;
}


.form-container {
    flex: 1;
    max-width: 450px;
}

.form-title {
    color: #ffffff;
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 30px;
    letter-spacing: 1px;
    text-align: center;
}

.appointment-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.form-input {
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.6);
    border-radius: 6px;
    padding: 15px 20px;
    color: #ffffff;
    font-family: 'Poppins', sans-serif;
    font-size: 0.95rem;
    transition: all 0.3s ease;
}

.form-input::placeholder {
    color: rgba(255, 255, 255, 0.7);
}

.form-input:focus {
    outline: none;
    border-color: #d4af37;
    background: rgba(255, 255, 255, 0.05);
}

.btn-submit {
    background: #ffffff;
    color: #000000;
    border: none;
    border-radius: 6px;
    padding: 15px 0;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    margin-top: 10px;
    width: max-content;
    padding-left: 40px;
    padding-right: 40px;
    transition: all 0.3s ease;
    align-self: center;
}

.btn-submit:hover {
    background: #d4af37;
    color: #ffffff;
    transform: translateY(-2px);
}

.form-footer-text {
    color: #d4af37;
    font-style: italic;
    font-size: 1.1rem;
    margin-top: 40px;
    text-align: center;
}


.testimonial-container {
    flex: 1;
    max-width: 500px;
    padding-left: 40px;
}

.stars {
    color: #d4af37;
    font-size: 1.8rem;
    letter-spacing: 5px;
    margin-bottom: 20px;
}

.testimonial-track {
    min-height: 150px;
    /* Previene saltos cuando un testimonio es más largo que otro */
    display: flex;
    align-items: center;
}

.quote-text {
    color: #ffffff;
    font-size: 1.4rem;
    font-style: italic;
    font-weight: 300;
    line-height: 1.6;
    margin-bottom: 15px;
}

.quote-author {
    color: rgba(255, 255, 255, 0.8);
    font-size: 1.1rem;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.6s ease, transform 0.6s ease;
}

.fade-enter-from {
    opacity: 0;
    transform: translateY(10px);
}

.fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}


@media (max-width: 768px) {
    .contact-content {
        flex-direction: column;
        gap: 60px;
    }

    .form-container {
        width: 100%;
        max-width: 100%;
        text-align: center;
    }

    .btn-submit {
        width: 100%;
        /* Botón al 100% en móvil */
    }

    .testimonial-container {
        padding-left: 0;
        text-align: center;
    }

    .quote-text {
        font-size: 1.2rem;
    }
}
</style>