import { onMounted, type Ref } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useHeroAnimations(wrapper: Ref<HTMLElement | null>) {
    onMounted(() => {
        if (!wrapper.value) return;

        // 1. Seleccionamos los elementos usando sus clases
        const navElements = wrapper.value.querySelector('.hero-nav');
        const brandLogo = wrapper.value.querySelector('.main-logo');
        const brandTextImgs = wrapper.value.querySelector('.text-images-wrapper');
        const heroDescription = wrapper.value.querySelector('.hero-description');
        const heroBtn = wrapper.value.querySelector('.main-cta');
        const waveLeft = wrapper.value.querySelector('.wave-left');
        const waveRight = wrapper.value.querySelector('.wave-right');

        // Agrupamos los elementos centrales para la animación de entrada
        const elements = [navElements, brandLogo, brandTextImgs, heroDescription, heroBtn];

        // 2. Configuramos el estado inicial
        gsap.set(elements, { opacity: 0, y: 30 });

        // 3. Línea de tiempo principal (Entrada inicial)
        const tl = gsap.timeline({ delay: 1.5 });

        tl.to(navElements, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' })
            .to([brandLogo, brandTextImgs], { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power2.out' }, "-=0.4")
            .to([heroDescription, heroBtn], { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power2.out' }, "-=0.4");

        // 4. Magia Responsiva (Ondas y animación infinita al scroll)
        const mm = gsap.matchMedia();

        // Escritorio
        mm.add("(min-width: 769px)", () => {
            gsap.to(waveLeft, { x: '30vw', duration: 3, ease: 'sine.inOut', yoyo: true, repeat: -1 });
            gsap.to(waveRight, { x: '-30vw', duration: 3, ease: 'sine.inOut', yoyo: true, repeat: -1 });
        });

        // Móvil
        mm.add("(max-width: 768px)", () => {
            gsap.to(waveLeft, { x: '30vw', duration: 2, ease: 'sine.inOut', yoyo: true, repeat: -1 });
            gsap.to(waveRight, { x: '-30vw', duration: 2, ease: 'sine.inOut', yoyo: true, repeat: -1 });

            // Animación en móvil con ScrollTrigger
            gsap.fromTo(elements,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    stagger: 0.2,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: wrapper.value,
                        start: 'top 80%',
                        end: 'bottom 20%',
                        toggleActions: 'restart reverse restart reverse'
                    }
                }
            );
        });
    });
}