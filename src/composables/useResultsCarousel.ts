import { ref, onMounted, onUnmounted, type Ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useResultsCarousel(wrapper: Ref<HTMLElement | null>) {

    // 1. Definimos el estado y CERRAMOS el arreglo correctamente
    const cases = ref([
        {
            id: 1,
            beforeImg: '/casos/antes-1.jpg',
            afterImg: '/casos/despues-1.jpg',
            treatment: 'Diseño de sonrisa con carillas en resina.'
        },
        {
            id: 2,
            beforeImg: '/casos/antes-2.jpg',
            afterImg: '/casos/despues-2.jpg',
            treatment: 'Blanqueamiento dental láser y limpieza profunda.'
        },
        {
            id: 3,
            beforeImg: '/casos/antes-3.jpeg',
            afterImg: '/casos/despues-3.jpeg',
            treatment: 'Ortodoncia invisible (Alineadores estéticos).'
        }
    ]) // <--- Aquí cerramos correctamente el arreglo reactivo

    const currentIndex = ref(0)
    let autoplayInterval: ReturnType<typeof setInterval>

    // 2. Función de precarga (ahora vive afuera del arreglo)
    const preloadImages = () => {
        cases.value.forEach((patient) => {
            const img1 = new Image()
            img1.src = patient.beforeImg

            const img2 = new Image()
            img2.src = patient.afterImg
        })
    }

    // 3. Controles del carrusel
    const nextSlide = () => {
        currentIndex.value = (currentIndex.value + 1) % cases.value.length
    }

    const goToSlide = (index: number) => {
        currentIndex.value = index
    }

    // 4. UN SOLO ciclo de vida para montar todo ordenado
    onMounted(() => {
        // Ejecutamos la precarga de imágenes
        preloadImages()

        // Arrancamos el temporizador
        autoplayInterval = setInterval(nextSlide, 5000)

        // Animaciones GSAP
        if (wrapper.value) {
            const header = wrapper.value.querySelector('.section-header')
            const carousel = wrapper.value.querySelector('.carousel-container')

            gsap.fromTo([header, carousel],
                { opacity: 0, y: 60 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    stagger: 0.3,
                    ease: 'expo.out',
                    scrollTrigger: {
                        trigger: wrapper.value,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    }
                }
            )
        }
    })

    // Limpieza al desmontar
    onUnmounted(() => {
        clearInterval(autoplayInterval)
    })

    return {
        cases,
        currentIndex,
        goToSlide
    }
}