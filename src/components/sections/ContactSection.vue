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
                <div class="stars">
                    ★★★★★
                </div>

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