<script setup lang="ts">
import { computed } from 'vue';

// Calculamos el año actual dinámicamente
const currentYear = computed(() => new Date().getFullYear());

// Función para el botón "Volver arriba"
const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};
</script>

<template>
    <footer class="main-footer">
        <div class="footer-content">

            <button @click="scrollToTop" class="back-to-top" aria-label="Volver arriba">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="arrow-icon">
                    <path d="m18 15-6-6-6 6" />
                </svg>
                <span class="btt-text">VOLVER ARRIBA</span>
            </button>

            <div class="clinic-location">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="#d4af37" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="location-icon">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                </svg>
                <p>Cali - Calle 6 # 74A - 82. Local 17 Edificio Sorrento</p>
            </div>

            <div class="social-links">
                <a href="https://www.instagram.com/dra.mariafernanda.br/" target="_blank" aria-label="Instagram"
                    class="social-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                </a>

                <a href="mailto:dra.mariafernanda.br23@gmail.com" aria-label="Correo Electrónico" class="social-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                    </svg>
                </a>
            </div>

            <div class="copyright-container">
                <p class="copyright-text">
                    &copy; {{ currentYear }} Dra. María Fernanda Bernal. Todos los derechos reservados.
                </p>
                <p class="developer-credit">
                    Desarrollado por <a href="#" target="_blank">Johan Sebastian Vasquez Diaz</a>
                </p>
            </div>

        </div>
    </footer>
</template>

<style scoped>
.main-footer {
    background-color: #121212;
    /* Gris súper oscuro, casi negro */
    padding: 60px 20px 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    /* Línea sutil superior */
}

.footer-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 35px;
    width: 100%;
    max-width: 800px;
}


.back-to-top {
    background: transparent;
    border: none;
    color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    padding: 10px;
}

.back-to-top:hover {
    color: #d4af37;
    /* Dorado al pasar el mouse */
    transform: translateY(-3px);
}

.arrow-icon {
    transition: transform 0.3s ease;
}

.back-to-top:hover .arrow-icon {
    transform: translateY(-3px);
    /* La flechita sube un poco más */
}

.btt-text {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
}


.social-links {
    display: flex;
    gap: 45px;
}

.social-icon {
    color: #ffffff;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.social-icon:hover {
    color: #d4af37;
    transform: scale(1.1);
}


.copyright-container {
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.copyright-text {
    color: #aaaaaa;
    font-size: 0.85rem;
    font-weight: 300;
    margin: 0;
}

.developer-credit {
    color: #555555;
    font-size: 0.75rem;
    font-weight: 300;
    margin: 0;
}

.developer-credit a {
    color: #777777;
    text-decoration: none;
    transition: color 0.3s ease;
}

.developer-credit a:hover {
    color: #d4af37;
}

.clinic-location {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    color: #ffffff;
    font-size: 1.05rem;
    font-weight: 300;
    text-align: center;
    padding: 0 20px;
}

.clinic-location p {
    margin: 0;
    letter-spacing: 0.5px;
}

.location-icon {
    flex-shrink: 0;
    /* Evita que el ícono se aplaste si el texto hace un salto de línea en celular */
}
</style>