import { ref, onMounted, onUnmounted, type Ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useResultsCarousel(wrapper: Ref<HTMLElement | null>) {

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
    ])

    const currentIndex = ref(0)
    let autoplayInterval: ReturnType<typeof setInterval>

    const nextSlide = () => {
        currentIndex.value = (currentIndex.value + 1) % cases.value.length
    }

    const goToSlide = (index: number) => {
        currentIndex.value = index
    }

    onMounted(() => {
        autoplayInterval = setInterval(nextSlide, 5000)

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

    onUnmounted(() => {
        clearInterval(autoplayInterval)
    })

    return {
        cases,
        currentIndex,
        goToSlide
    }
}