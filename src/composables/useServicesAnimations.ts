import { onMounted, type Ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useServicesAnimations(wrapper: Ref<HTMLElement | null>, progressBar: Ref<HTMLElement | null>) {
    onMounted(() => {
        if (!wrapper.value) return;

        const header = wrapper.value.querySelector('.section-header');
        const cards = wrapper.value.querySelectorAll('.service-card');
        const chunks = wrapper.value.querySelectorAll('.services-chunk');
        const icons = wrapper.value.querySelectorAll('.service-icon');

        // 1. Animación del título (Global)
        gsap.fromTo(header,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1, ease: 'power2.out', scrollTrigger: { trigger: wrapper.value, start: 'top 85%' } }
        );

        const mm = gsap.matchMedia();

        mm.add("(min-width: 769px)", () => {
            // Entrada en cascada de las tarjetas
            gsap.fromTo(cards,
                { opacity: 0, y: 40 },
                {
                    opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'expo.out',
                    scrollTrigger: { trigger: wrapper.value, start: 'top 75%', toggleActions: 'play none none reverse' }
                }
            );

            // Efecto Respiración (Flotación) en los íconos para que no se vea muerta
            gsap.to(icons, {
                y: -8, // Flotan 8px hacia arriba
                duration: 1,
                ease: 'sine.inOut',
                stagger: {
                    each: 0.3,
                    from: 'random' // Aleatorio para que se vea orgánico y no como robots
                },
                yoyo: true,
                repeat: -1,
                delay: 1 // Espera a que entren las tarjetas para empezar a flotar
            });
        });

        mm.add("(max-width: 768px)", () => {
            gsap.set(chunks, { opacity: 0 });
            if (progressBar.value) gsap.set(progressBar.value, { scaleX: 0, transformOrigin: 'left center' });

            const tl = gsap.timeline({ repeat: -1 });

            chunks.forEach((chunk) => {
                // 1. Aparecen las 4 tarjetas
                tl.to(chunk, { opacity: 1, duration: 0.6, ease: 'power2.out' })
                    // 2. La barra de progreso se llena durante 4.5 segundos (tiempo de lectura)
                    .fromTo(progressBar.value,
                        { scaleX: 0 },
                        { scaleX: 1, duration: 4.5, ease: 'none' }
                    )
                    // 3. Desaparecen las 4 tarjetas
                    .to(chunk, { opacity: 0, duration: 0.6, ease: 'power2.in' });
            });
        });
    });
}