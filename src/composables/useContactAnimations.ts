import { ref, onMounted, onUnmounted, type Ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useContactAnimations(wrapper: Ref<HTMLElement | null>) {
    // 1. Datos de los Testimonios
    const testimonials = ref([
        {
            text: "La Dra. Bernal me devolvió la seguridad al sonreír. El cambio fue inmediato y natural.",
            author: "Laura M., (Cali, Colombia)",
            date: "Hace 8 meses"
        },
        {
            text: "Excelente atención y profesionalismo. Me encantó el resultado final.",
            author: "Andrés P., (Palmira, Colombia)",
            date: "hace 1 mes"
        },
        {
            text: "Excelente clínica, gran profesional me hizo un trabajo espectacular, recomendable 100% ..",
            author: "Alfredo Moreno., (Murcia, ES)",
            date: "hace 3 meses"
        },
        {
            text: "Llevo dos años yendo a control con esta espectacular profesional.",
            author: "John Trebor (New York, USA)",
            date: "Hace 8 meses"
        },
        {
            text: "Excelente experiencia con la Dra. María Fernanda. Me realicé implantes dentales, retiro de amalgamas y otros tratamientos... Los resultados superaron mis expectativas.",
            author: "Esperanza Rivera",
            date: "Hace 3 semanas"
        },
        {
            text: "Excelente servicio. Una profesional con gran calidad humana y técnica. Sin duda volvería cada vez que lo necesite.",
            author: "Johan Sebastian Vasquez Diaz",
            date: "Hace 2 meses"
        },
        {
            text: "El servicio es muy profesional y eficaz, desde el inicio hemos visto un cambio impresionante en la sonrisa de nuestra hija. El acompañamiento ha sido constante...",
            author: "Leidy Niño",
            date: "Hace 7 meses"
        },
        {
            text: "Recomiendo ampliamente el consultorio de la Dra María Fernanda Bernal es una excelente profesional y te da la confianza para cada uno de los procedimientos. Es excelente.",
            author: "Estefanny Guevara",
            date: "Editado 3 semanas atrás"
        },
        {
            text: "Exelente atención la doctora súper la recomiendo demaciado ya me echó varios procedimientos como mis labios bótox y todo super bien me encanta súper recomendada",
            author: "katherine delgado buritica",
            date: "Hace 8 meses"
        },
        {
            text: "Me encantó la atención en el consultorio odontológico de la Dra. María Fernanda Bernal. Desde que llegas te hacen sentir cómoda y en las mejores manos. La doctora es muy profesional, amable y cuidadosa; explica todo con paciencia y se nota su amor por lo que hace. Quedé feliz con los resultados. ¡Totalmente recomendado!🦷✨",
            author: "Gianella Villarreal",
            date: "Hace 8 meses"
        },
        {
            text: "Excelentes diseños de sonrisa. Es muy difícil encontrar trabajos tan bien hechos y naturales en la ciudad de Cali. La recomiendo 100%",
            author: "Andrey Restrepo",
            date: "Hace 8 meses"
        },
        {
            text: "Gracias doctora por su paciencia y la felicito por su excelente trabajo, cuente con una cliente y una recomendación siempre por su trabajo tan impecable 👏",
            author: "Margie Laverde",
            date: "Hace 8 meses"
        },
        {
            text: "Con la doc María Fernanda me realice un procedimiento de aumento de labios con ácido hialuronico, la experiencia fue increíble todo con seguridad me encantaron los resultados, la súper recomiendo una profecional muy capacitada 🫶🏻🫶🏻",
            author: "Ximena Florez",
            date: "Hace 6 meses"
        },
        {
            text: "Me encantó la atención y el profesionalismo con el que me atendieron. Se nota el esfuerzo y la dedicación en cada detalle del consultorio. Les deseo muchos éxitos, que sigan creciendo y brindando sonrisas con esa excelente atención. ¡Muy recomendado!❤️😍😍😍",
            author: "Carlos Godoy",
            date: "Hace 8 meses"
        },
        {
            text: "Excelente atención! Tiene vocación por lo que hace ❤️ Es cuidadosa con los detalles, puntual, responsable. La recomiendo, la doc me hizo sentir cómoda durante la consulta.",
            author: "Lina",
            date: "Hace 8 meses"
        },
        {
            text: "Excelente atención, varios medios de pago, muy amables en recepción y muy delicada al trabajar",
            author: "Monica Rendon vasquez",
            date: "Hace 6 meses"
        },
        {
            text: "Súper recomendado el servicio de la odontóloga María Fernanda, quedé súper feliz con mi diseño de sonrisa, la atención 10/10!!",
            author: "jorge luis soto chamorro",
            date: "Hace 8 meses"
        },
        {
            text: "Excelente muy buena la atención y un cambio impresionante con la sonrisa, todos unos profesionales..",
            author: "LISETH ROMERO",
            date: "Hace 6 meses"
        },
        {
            text: "Es un lugar muy agradable, ah como entras se siente la buena energía y como te atienden me encantó, me hice un blanqueamiento y fue lo mejor seguro seguro volveré, muchas gracias ☺️☺️❤️",
            author: "Jhonatan Alvarado Devia",
            date: "Hace 8 meses"
        },
        {
            text: "Excelente atención por parte de los profesionales y la doctora María Fernanda, siempre dispuesta a responder cualquier duda y dar la mejor atención.",
            author: "Diana Mendoza",
            date: "Hace 8 meses"
        },
        {
            text: "Excelente atención siempre, hasta después de los procedimientos y los trabajos que me he realizado son 10/10",
            author: "Geraldine Montoya",
            date: "Hace 8 meses"
        },
        {
            text: "Me encanta su trabajo, excelente profesional y la calidad en el servicio que presta, la super recomiendo a la dra María Fernanda 👏🏻👏🏻",
            author: "Adri Chamorro",
            date: "Hace 8 meses"
        },
        {
            text: "Excelente servicio, buena atención, rápida y confiable🤩⭐️⭐️🤩",
            author: "Angie Ramírez",
            date: "Hace 8 meses"
        },
        {
            text: "Atención súper.. lo recomiendo 100% quedé feliz con el resultado del tratamiento que me realize",
            author: "Monica Diaz",
            date: "Hace 8 meses"
        },
        {
            text: "Me encantó la excelente ubicación, y el servicio 10/10, me ayudaron con la necesidad que tenía, y quedé super satisfecho,, recomendado!!",
            author: "Anthony Pinzón",
            date: "Hace 8 meses"
        },
        {
            text: "Excelente atención, 100% enamorado de mis resultados, muy profesional con la mejor atención",
            author: "Jeferson Zapata",
            date: "Hace 7 meses"
        },
        {
            text: "Excelente trabajo, muy pulida y excelente atención. Quedé encantada 🥰😁",
            author: "Natalia Castro",
            date: "Hace 8 meses"
        },
        {
            text: "La atención es excelente, muy amables, el lugar hermoso, lo recomiendo 100%",
            author: "Rocio Montenegro",
            date: "Hace 7 meses"
        },
        {
            text: "Muy buen trabajo y una atención excelente se los recomiendo",
            author: "Liliana Duque",
            date: "Hace 8 meses"
        },
        {
            text: "Excelente servicio, una experiencia inolvidable, y una muy buena profesional con calidez y servicio",
            author: "Stevens Rodriguez",
            date: "Hace 8 meses"
        },
        {
            text: "Excelente atención, buen servicio, es respetuosa y un trabajo impecable",
            author: "valeria rivasvasquez",
            date: "Hace 8 meses"
        },
        {
            text: "Excelente servicio, un cambio total en mi salud oral y la de mi madre",
            author: "GIOVANNA MARTINEZ (GMC INMOBILIARIA SAS)",
            date: "Hace 7 meses"
        },
        {
            text: "Trabajo muy profesional, y la atención en consultorio es muy buena experiencia.",
            author: "Sebastian Garcia",
            date: "Hace 8 meses"
        },
        {
            text: "Excelente servicio!! La mejor limpieza, los mejores blanqueamientos",
            author: "Juan Jose Pineda Rivera",
            date: "Hace 8 meses"
        },
        {
            text: "El mejor lugar y la atención es 10/10 ✨💯",
            author: "Geraldine Calambas",
            date: "Hace 8 meses"
        },
        {
            text: "Excelente servicio muy buena atención muy contento",
            author: "juan valencia",
            date: "Hace 7 meses"
        },
        {
            text: "EXELENTE SERVICIO EN CALI SUPER RECOMENDADO ⭐️⭐️⭐️⭐️⭐️",
            author: "El de las cejas",
            date: "Hace 7 meses"
        },
        {
            text: "Excelente doctora 🫶🏽",
            author: "Laura Calle Martinez",
            date: "Hace 8 meses"
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