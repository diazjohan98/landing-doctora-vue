import { onMounted, type Ref } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useAboutAnimations(wrapper: Ref<HTMLElement | null>) {
    onMounted(() => {
        setTimeout(() => {
            ScrollTrigger.refresh();
        }, 500);

        const imageElement = wrapper.value?.querySelector('.about-image');
        if (imageElement) {
            gsap.fromTo(imageElement,
                { opacity: 0, scale: 1.15, filter: 'blur(10px)' },
                {
                    opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.5, ease: 'power3.out',
                    scrollTrigger: { trigger: wrapper.value, start: 'top 85%', end: 'bottom 20%', toggleActions: 'restart reverse restart reverse', lazy: false }
                }
            );
        }


        const textElements = wrapper.value?.querySelectorAll('.animate-on-scroll:not(.card)');
        if (textElements && textElements.length > 0) {
            gsap.fromTo(textElements,
                { opacity: 0, y: 80, rotationX: -15 },
                {
                    opacity: 1, y: 0, rotationX: 0, duration: 1.2, stagger: 0.15, ease: 'expo.out',
                    scrollTrigger: { trigger: wrapper.value, start: 'top 85%', end: 'bottom 20%', toggleActions: 'restart reverse restart reverse', lazy: false }
                }
            );
        }


        const icons = wrapper.value?.querySelectorAll('.icon');
        if (icons && icons.length > 0) {
            gsap.to(icons, { y: -10, duration: 2.5, yoyo: true, repeat: -1, ease: 'sine.inOut', stagger: 0.4 });
        }

        const btnGold = wrapper.value?.querySelector('.btn-gold');
        if (btnGold) {
            gsap.to(btnGold, {
                boxShadow: '0 0 15px rgba(212, 175, 55, 0.8), 0 0 30px rgba(212, 175, 55, 0.3)',
                scale: 1.03,
                duration: 1.2,
                yoyo: true,
                repeat: -1,
                ease: 'sine.inOut'
            });
        }


        const mm = gsap.matchMedia();
        const cards = wrapper.value?.querySelectorAll('.card');

        if (cards && cards.length > 0) {
            // ESCRITORIO
            mm.add("(min-width: 769px)", () => {
                gsap.fromTo(cards,
                    { opacity: 0, y: 80, rotationX: -15 },
                    {
                        opacity: 1, y: 0, rotationX: 0, duration: 1.2, stagger: 0.2, ease: 'expo.out',
                        scrollTrigger: { trigger: wrapper.value, start: 'top 85%', end: 'bottom 20%', toggleActions: 'restart reverse restart reverse' }
                    }
                );
            });

            // MÓVIL
            mm.add("(max-width: 768px)", () => {
                gsap.set(cards, { opacity: 0, y: 0 });
                const tl = gsap.timeline({ repeat: -1 });

                cards.forEach((card) => {
                    tl.to(card, { opacity: 1, duration: 0.8, ease: 'power2.inOut' })
                        .to({}, { duration: 2.5 })
                        .to(card, { opacity: 0, duration: 0.8, ease: 'power2.inOut' });
                });
            });
        }
    });
}