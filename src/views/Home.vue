<template>
    <header>
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
            <div class="container-fluid">
                <!-- Botón Admin -->
                <button class="btn btn-outline-light me-3" @click="goToLogin">
                    <i class="fas fa-cog"></i> Login
                </button>

                <button class="btn btn-outline-light me-3" @click="goToAdmin">
                    <i class="fas fa-cog"></i> Admin
                </button>
                
                <!-- Título del Foro -->
                <h1 class="navbar-brand mb-0 mx-auto text-white fw-bold">Mi Foro</h1>
                
                <!-- Buscador -->
                <form class="d-flex" style="width: 300px;">
                    <input 
                        class="form-control me-2" 
                        type="search" 
                        placeholder="Buscar post..." 
                        v-model="searchTerm"
                        @input="filterNews"
                    >
                    <!-- <button class="btn btn-outline-light" type="submit">
                        <i class="fas fa-search"></i>
                    </button> -->
                </form>
            </div>
        </nav>
    </header>

    <main class="container my-5">
        <div class="row">
            <!-- Lista de Noticias -->
            <div class="col-12">
                <h2 class="mb-4 text-center">Últimos Post</h2>
                
                <div class="row g-4">
                    <div 
                        class="col-lg-4 col-md-6 col-sm-12" 
                        v-for="noticia in filteredNews" 
                        :key="noticia.id"
                    >
                        <div class="card h-100 shadow-sm hover-card">
                            <!-- Imagen de la noticia -->
                            <div class="image-container">
                                <img 
                                    :src="noticia.imagen" 
                                    :alt="noticia.titulo"
                                    class="card-img-top news-image"
                                >
                            </div>
                            
                            <!-- Contenido de la noticia -->
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title text-primary fw-bold">{{ noticia.titulo }}</h5>
                                <p class="card-text text-muted flex-grow-1">{{ noticia.resumen }}</p>
                                
                                <!-- Información adicional -->
                                <div class="mt-auto">
                                    <small class="text-muted">
                                        <i class="fas fa-calendar-alt"></i> {{ noticia.fecha }}
                                    </small>
                                    <br>
                                    <small class="text-muted">
                                        <i class="fas fa-user"></i> {{ noticia.autor }}
                                    </small>
                                </div>
                                
                                <!-- Botón leer más -->
<button class="btn btn-primary mt-3" @click="goToPost">
    <i class="fas fa-book-open"></i> Leer más
</button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Mensaje cuando no hay resultados -->
                <div v-if="filteredNews.length === 0" class="text-center mt-5">
                    <i class="fas fa-search fa-3x text-muted mb-3"></i>
                    <h4 class="text-muted">No se encontraron post</h4>
                    <p class="text-muted">Intenta con otros términos de búsqueda</p>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import imageSrc from '@/assets/img/image.png'

export default {
    name: "Home",
    setup() {
        const router = useRouter();
        const searchTerm = ref('');
        
        // Datos de ejemplo para las noticias
        const noticias = ref([
            {
                id: 1,
                titulo: "Avances en Tecnología Cuántica",
                resumen: "Los últimos desarrollos en computación cuántica prometen revolucionar la industria tecnológica en los próximos años.",
                imagen: imageSrc,
                fecha: "15 Jun 2025",
                autor: "Dr. Ana García"
            },
            {
                id: 2,
                titulo: "Cambio Climático: Nuevas Medidas",
                resumen: "Gobiernos mundiales anuncian nuevas políticas para combatir el cambio climático y reducir las emisiones de carbono.",
                imagen: imageSrc,
                fecha: "14 Jun 2025",
                autor: "Carlos Mendoza"
            },
            {
                id: 3,
                titulo: "Inteligencia Artificial en la Medicina",
                resumen: "La IA está transformando el diagnóstico médico con precisión sin precedentes en la detección temprana de enfermedades.",
                imagen: imageSrc,
                fecha: "13 Jun 2025",
                autor: "Dra. María López"
            },
            {
                id: 4,
                titulo: "Exploración Espacial 2025",
                resumen: "Nuevas misiones espaciales planean explorar planetas distantes en busca de signos de vida extraterrestre.",
                imagen: imageSrc,
                fecha: "12 Jun 2025",
                autor: "Prof. Roberto Silva"
            },
            {
                id: 5,
                titulo: "Energías Renovables en Alza",
                resumen: "El sector de energías renovables experimenta un crecimiento exponencial con nuevas tecnologías solares y eólicas.",
                imagen: imageSrc,
                fecha: "11 Jun 2025",
                autor: "Ing. Laura Vega"
            },
            {
                id: 6,
                titulo: "Avances en Biotecnología",
                resumen: "Investigadores desarrollan nuevas terapias genéticas que podrían curar enfermedades consideradas incurables.",
                imagen: imageSrc,
                fecha: "10 Jun 2025",
                autor: "Dr. Felipe Ruiz"
            }
        ]);

        // Noticias filtradas según la búsqueda
        const filteredNews = computed(() => {
            if (!searchTerm.value) {
                return noticias.value;
            }
            return noticias.value.filter(noticia => 
                noticia.titulo.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
                noticia.resumen.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
                noticia.autor.toLowerCase().includes(searchTerm.value.toLowerCase())
            );
        });

        // Función para ir a admin
        const goToLogin = () => {
            router.push('/login');
        };

        // Función para ir a admin
        const goToAdmin = () => {
            router.push('/Admin');
        };

        const goToPost = () => {
            router.push('/post');
        };

        // Función para filtrar noticias (se puede usar para efectos adicionales)
        const filterNews = () => {
            // Lógica adicional si es necesaria
        };

        return {
            searchTerm,
            noticias,
            filteredNews,
            filterNews,
            goToLogin, 
            goToAdmin,
            goToPost
        };
    }
}
</script>

<style scoped>
/* Estilos para el contenedor de imagen */
.image-container {
    height: 200px;
    overflow: hidden;
    position: relative;
}

/* Estilos para las imágenes de noticias */
.news-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transition: transform 0.3s ease;
}

/* Efecto hover en las tarjetas */
.hover-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15) !important;
}

.hover-card:hover .news-image {
    transform: scale(1.05);
}

/* Estilos para el navbar */
.navbar {
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.navbar-brand {
    font-size: 1.8rem;
    letter-spacing: 1px;
}

/* Estilos para las tarjetas */
.card {
    border-radius: 15px;
    border: none;
    overflow: hidden;
}

.card-title {
    font-size: 1.1rem;
    line-height: 1.3;
    margin-bottom: 0.8rem;
}

.card-text {
    font-size: 0.9rem;
    line-height: 1.5;
}

/* Estilos para botones */
.btn {
    border-radius: 8px;
    font-weight: 500;
    transition: all 0.3s ease;
}

.btn-primary {
    background: linear-gradient(45deg, #007bff, #0056b3);
    border: none;
}

.btn-primary:hover {
    background: linear-gradient(45deg, #0056b3, #004085);
    transform: translateY(-2px);
}

.btn-outline-light:hover {
    transform: translateY(-2px);
}

/* Estilos responsivos */
@media (max-width: 768px) {
    .navbar-brand {
        font-size: 1.4rem;
    }
    
    .container-fluid form {
        width: 200px !important;
    }
    
    .image-container {
        height: 180px;
    }
}

@media (max-width: 576px) {
    .navbar-brand {
        font-size: 1.2rem;
    }
    
    .container-fluid {
        flex-direction: column;
        gap: 1rem;
    }
    
    .container-fluid form {
        width: 100% !important;
    }
    
    .image-container {
        height: 160px;
    }
}

/* Animaciones */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* .col-lg-4 {
    animation: fadeIn 0.6s ease forwards;
} */

.col-lg-4:nth-child(1) { animation-delay: 0.1s; }
.col-lg-4:nth-child(2) { animation-delay: 0.2s; }
.col-lg-4:nth-child(3) { animation-delay: 0.3s; }
.col-lg-4:nth-child(4) { animation-delay: 0.4s; }
.col-lg-4:nth-child(5) { animation-delay: 0.5s; }
.col-lg-4:nth-child(6) { animation-delay: 0.6s; }
</style>