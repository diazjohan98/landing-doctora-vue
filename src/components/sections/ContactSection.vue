<script setup lang="ts">
import { ref } from 'vue'
import { useContactAnimations } from '@/composables/useContactAnimations'

const contactSection = ref<HTMLElement | null>(null)
const { testimonials, currentIndex } = useContactAnimations(contactSection)

const formData = ref({
    name: '',
    email: '',
    phone: ''
})

const isSubmitting = ref(false)
const showSuccess = ref(false)

const submitForm = async () => {
    isSubmitting.value = true

    try {
        const response = await fetch("https://formsubmit.co/ajax/dra.mariafernanda.br23@gmail.com", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                Nombre: formData.value.name,
                Correo: formData.value.email,
                Teléfono: formData.value.phone,
                _subject: "🦷 ¡Nueva solicitud de cita desde la página web!",
                _template: "table"
            })
        })

        if (response.ok) {
            showSuccess.value = true
            formData.value = { name: '', email: '', phone: '' }

            setTimeout(() => { showSuccess.value = false }, 5000)
        } else {
            throw new Error("Error en la respuesta del servidor")
        }

    } catch (error) {
        console.error("Error al enviar el formulario:", error)
        alert("Hubo un problema al enviar tu solicitud. Por favor intenta contactarnos por redes sociales.")
    } finally {
        isSubmitting.value = false
    }
}
</script>

<template>
    <section ref="contactSection" class="contact-section" id="contacto">

        <div class="contact-content">

            <div class="form-container">
                <h3 class="form-title">PROGRAMA TU CITA HOY</h3>

                <form @submit.prevent="submitForm" class="appointment-form">
                    <input type="text" v-model="formData.name" placeholder="Nombre" required class="form-input"
                        :disabled="isSubmitting" />
                    <input type="email" v-model="formData.email" placeholder="Correo Electrónico" required
                        class="form-input" :disabled="isSubmitting" />
                    <input type="tel" v-model="formData.phone" placeholder="Teléfono" required class="form-input"
                        :disabled="isSubmitting" />

                    <button type="submit" class="btn-submit" :disabled="isSubmitting">
                        {{ isSubmitting ? 'Enviando...' : 'Quiero mi cita' }}
                    </button>

                    <transition name="fade">
                        <p v-if="showSuccess" class="success-message">
                            ¡Gracias! Hemos recibido tus datos. Te contactaremos pronto.
                        </p>
                    </transition>
                </form>

                <p class="form-footer-text">Nuestros Clientes nos prefieren</p>
            </div>
            <div class="testimonial-container">

                <!-- 🚀 NUEVO: Encabezado de Google Reviews -->
                <div class="google-rating">
                    <span class="rating-number">5.0</span>
                    <div class="stars">
                        <!-- Estrellas SVG para mayor nitidez -->
                        <svg v-for="i in 5" :key="i" xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                            viewBox="0 0 24 24" fill="#FBBC05" stroke="#FBBC05" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round">
                            <polygon
                                points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2">
                            </polygon>
                        </svg>
                    </div>
                    <span class="rating-count">(47 opiniones)</span>
                </div>

                <!-- Carrusel de texto con transición -->
                <div class="testimonial-track">
                    <transition name="fade" mode="out-in">
                        <div class="testimonial-slide" :key="currentIndex">
                            <p class="quote-text">“{{ testimonials[currentIndex].text }}”</p>
                            <p class="quote-author">
                                <strong>{{ testimonials[currentIndex].author }}</strong>
                                <span class="quote-date"> • {{ testimonials[currentIndex].date }}</span>
                            </p>
                        </div>
                    </transition>
                </div>

                <!-- 🚀 NUEVO: Botón hacia Google -->
                <a href="https://www.google.com/search?kgmid=/g/11ltk660qw&hl=es-CO&q=Consultorio+odontol%C3%B3gico+Dra+Mar%C3%ADa+Fernanda+Bernal"
                    target="_blank" rel="noopener noreferrer" class="google-link-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                        fill="currentColor">
                        <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4" />
                        <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853" />
                        <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05" />
                        <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335" />
                    </svg>
                    Leer todas las opiniones en Google
                </a>
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
    font-size: 1.4rem;
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
    padding: 16px 22px;
    color: #ffffff;
    font-family: 'Poppins', sans-serif;
    font-size: 1.05rem;
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
    padding: 16px 0;
    font-size: 1.15rem;
    font-weight: 600;
    cursor: pointer;
    margin-top: 15px;
    width: max-content;
    padding-left: 45px;
    padding-right: 45px;
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
    font-size: 1.25rem;
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

.success-message {
    color: #4CAF50;
    /* Un verde suave para indicar éxito */
    text-align: center;
    font-size: 0.95rem;
    margin-top: 15px;
    font-weight: 500;
}

.btn-submit:disabled {
    opacity: 0.7;
    cursor: not-allowed;
}

.google-rating {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 25px;
}

.rating-number {
    color: #ffffff;
    font-size: 1.8rem;
    font-weight: 700;
}

.stars {
    display: flex;
    gap: 2px;
}

.rating-count {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.9rem;
    margin-left: 5px;
}

/* Modificamos un poco el autor para incluir la fecha */
.quote-author {
    color: rgba(255, 255, 255, 0.9);
    font-size: 1.1rem;
    margin-top: 15px;
}

.quote-date {
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.9rem;
    font-weight: 300;
}

/* Botón de Google */
.google-link-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    margin-top: 30px;
    padding: 10px 20px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 30px;
    color: #ffffff;
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: 500;
    transition: all 0.3s ease;
}

.google-link-btn:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: #ffffff;
    transform: translateY(-2px);
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