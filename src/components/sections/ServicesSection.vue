<script setup lang="ts">
import { ref, computed } from 'vue'
import { useServicesAnimations } from '@/composables/useServicesAnimations'

const servicesSection = ref<HTMLElement | null>(null)
const progressBar = ref<HTMLElement | null>(null) // 🚀 Nueva referencia

// Pasamos ambas referencias al composable
useServicesAnimations(servicesSection, progressBar)

const services = ref([
    { id: 1, title: 'DISEÑO DE SONRISA', desc: 'Proceso personalizado para crear una sonrisa perfecta que se ajuste a tu rostro.', icon: '/icons/tooth-1.svg' },
    { id: 2, title: 'ENDODONCIA', desc: 'Tratamiento de conductos para salvar dientes dañados por caries o infecciones.', icon: '/icons/tooth-2.svg' },
    { id: 3, title: 'BLANQUEAMIENTO DENTAL', desc: 'Tratamiento para aclarar el color de tus dientes y lograr una sonrisa más brillante.', icon: '/icons/tooth-3.svg' },
    { id: 4, title: 'ORTODONCIA ESTÉTICA', desc: 'Corrección de la alineación dental para una sonrisa armoniosa y atractiva.', icon: '/icons/tooth-4.svg' },
    { id: 5, title: 'ODONTOLOGÍA GENERAL', desc: 'Cuidados preventivos y tratamientos básicos para mantener la salud bucal.', icon: '/icons/tooth-5.svg' },
    { id: 6, title: 'LENTES CERÁMICOS', desc: 'Carillas de porcelana que mejoran el aspecto de tus dientes para un acabado impecable.', icon: '/icons/tooth-6.svg' },
    { id: 7, title: 'CIRUGÍA ORAL', desc: 'Procedimientos quirúrgicos para corregir problemas dentales complejos.', icon: '/icons/tooth-7.svg' },
    { id: 8, title: 'IMPLANTES DENTALES', desc: 'Reemplazo de dientes perdidos con implantes permanentes que lucen y funcionan como dientes naturales.', icon: '/icons/tooth-8.svg' }
])

const chunkedServices = computed(() => {
    const chunks = []
    for (let i = 0; i < services.value.length; i += 4) {
        chunks.push(services.value.slice(i, i + 4))
    }
    return chunks
})
</script>

<template>
    <section ref="servicesSection" class="services-section" id="servicios">

        <div class="section-header">
            <h4 class="gold-subtitle">Nuestros Servicios</h4>
            <h2 class="main-description">
                Creamos experiencias diseñadas para resaltar tu sonrisa y cuidar tu salud oral con técnicas modernas y
                mínimamente invasivas.
            </h2>
        </div>

        <div class="services-wrapper">
            <div class="services-chunk" v-for="(chunk, index) in chunkedServices" :key="index">
                <div class="service-card" v-for="service in chunk" :key="service.id">
                    <div class="icon-container">
                        <img :src="service.icon" :alt="service.title" class="service-icon" />
                    </div>
                    <h3 class="service-title">{{ service.title }}</h3>
                    <p class="service-desc">{{ service.desc }}</p>
                </div>
            </div>
        </div>

        <div class="mobile-progress-container">
            <div ref="progressBar" class="mobile-progress-bar"></div>
        </div>

    </section>
</template>

<style scoped>
.services-section {
    background-color: #030303;
    /* Casi negro puro */
    padding: 120px 5%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.section-header {
    text-align: center;
    max-width: 800px;
    margin-bottom: 60px;
}

.gold-subtitle {
    color: #d4af37;
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 20px;
}

.main-description {
    color: #ffffff;
    font-size: 1.1rem;
    font-weight: 300;
    line-height: 1.6;
}


.services-wrapper {
    width: 100%;
    max-width: 1200px;
    display: flex;
    flex-direction: column;
    gap: 30px;
}

.services-chunk {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 30px;
}


.service-card {
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 12px;
    padding: 40px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    transition: all 0.3s ease;
    background: transparent;
}

.service-card:hover {
    border-color: #d4af37;
    background: rgba(212, 175, 55, 0.03);
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.icon-container {
    height: 50px;
    margin-bottom: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.service-icon {
    width: 45px;
    height: auto;
    filter: invert(75%) sepia(41%) saturate(415%) hue-rotate(352deg) brightness(96%) contrast(87%);
}

.service-title {
    color: #d4af37;
    font-size: 0.95rem;
    font-weight: 600;
    margin-bottom: 15px;
    letter-spacing: 0.5px;
}

.service-desc {
    color: #888888;
    font-size: 0.85rem;
    line-height: 1.5;
}

.mobile-progress-container {
    display: none;
    /* Oculta en escritorio */
    width: 100%;
    max-width: 300px;
    height: 2px;
    background: rgba(255, 255, 255, 0.1);
    /* Fondo gris sutil */
    margin-top: 40px;
    border-radius: 4px;
    overflow: hidden;
}

.mobile-progress-bar {
    width: 100%;
    height: 100%;
    background: #d4af37;
    /* Color dorado premium */
    box-shadow: 0 0 10px rgba(212, 175, 55, 0.5);
    /* Brillo sutil */
    will-change: transform;
    /* Optimización de rendimiento */
}

@media (max-width: 1024px) {
    .services-chunk {
        grid-template-columns: repeat(2, 1fr);
        /* Tablet: 2x2 normal */
    }
}

@media (max-width: 768px) {

    .services-wrapper {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr;
        gap: 0;
    }

    .services-chunk {
        grid-area: 1 / 1;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 15px;
        opacity: 0;
    }

    .service-card {
        padding: 25px 15px;
    }

    .service-icon {
        width: 35px;
    }

    .service-title {
        font-size: 0.85rem;
    }

    .service-desc {
        font-size: 0.75rem;
    }

    .mobile-progress-container {
        display: block;
        /* Hacemos visible la barra solo en celular */
    }
}
</style>