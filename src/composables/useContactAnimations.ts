import { ref, onMounted, onUnmounted, type Ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useContactAnimations(wrapper: Ref<HTMLElement | null>) {
    // 1. Datos de los Testimonios
    const testimonials = ref([
        {
            text: "La Dra. Bernal me devolvió la seguridad al sonreír. El cambio fue inmediato y natural.",
            author: "Laura M., (Cali, Colombia)"
        },
        {
            text: "Excelente atención y profesionalismo. Me encantó el resultado final.",
            author: "Andrés P., (Palmira, Colombia)"
        },
        {
            text: "Excelente clínica, gran profesional me hizo un trabajo espectacular, recomendable 100% ..",
            author: "Alfredo Moreno., (Murcia, ES)"
        },
        {
            text: "Llevo dos años yendo a control con esta espectacular profesional.",
            author: "John Trebor (New York, USA)"
        }
    ])

    const currentIndex = ref(0)
    let testimonialInterval: ReturnType<typeof setInterval>

    const nextTestimonial = () => {
        currentIndex.value = (currentIndex.value + 1) % testimonials.value.length
    }

    // 2. Ciclo de Vida y Animaciones GSAP
    onMounted(() => {
        // Rotar testimonio cada 6 segundos
        testimonialInterval = setInterval(nextTestimonial, 6000)

        if (wrapper.value) {
            const formContainer = wrapper.value.querySelector('.form-container')
            const testimonialContainer = wrapper.value.querySelector('.testimonial-container')

            // El formulario entra desde la izquierda
            gsap.fromTo(formContainer,
                { opacity: 0, x: -50 },
                { opacity: 1, x: 0, duration: 1, ease: 'power2.out', scrollTrigger: { trigger: wrapper.value, start: 'top 80%' } }
            )

            // El testimonio entra desde la derecha
            gsap.fromTo(testimonialContainer,
                { opacity: 0, x: 50 },
                { opacity: 1, x: 0, duration: 1, ease: 'power2.out', delay: 0.3, scrollTrigger: { trigger: wrapper.value, start: 'top 80%' } }
            )
        }
    })

    onUnmounted(() => {
        clearInterval(testimonialInterval) // Prevenimos fugas de memoria
    })

    return {
        testimonials,
        currentIndex
    }
}