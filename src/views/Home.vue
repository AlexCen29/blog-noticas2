<template>
    <header>
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
            <div class="container-fluid">

                <button class="btn btn-outline-light me-3" @click="goToAdmin">
                    <i class="fas fa-cog"></i> Admin
                </button>

                <h1 class="navbar-brand mb-0 mx-auto text-white fw-bold">Mi Foro</h1>

                <!-- Buscador -->
                <form class="d-flex" style="width: 300px;">
                    <input class="form-control me-2" type="search" placeholder="Buscar post..." v-model="searchTerm"
                        @input="filterNews">
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
                    <div class="col-lg-4 col-md-6 col-sm-12" v-for="noticia in filteredNews" :key="noticia.id">
                        <div class="card h-100 shadow-sm hover-card">
                            <!-- Imagen de la noticia -->
                            <div class="image-container">
                                <img :src="noticia.urlFoto" :alt="noticia.title" class="card-img-top news-image">
                            </div>

                            <!-- Contenido de la noticia -->
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title text-primary fw-bold">{{ noticia.title }}</h5>
                                <p class="card-text text-muted flex-grow-1">{{ noticia.introduccion }}</p>

                                <!-- Información adicional -->
                                <div class="mt-auto">
                                    <small class="text-muted">
                                        <i class="fas fa-calendar-alt"></i> {{ new
                                            Date(noticia.fecha).toLocaleDateString() }}
                                    </small>
                                    <br>
                                    <small class="text-muted">
                                        <i class="fas fa-user"></i> {{ noticia.usuario.nombre }}
                                    </small>
                                </div>

                                <!-- Botón leer más -->
                                <button class="btn btn-primary mt-3" @click="goToPost(noticia.id)">
                                    <i class="fas fa-book-open"></i> Leer más
                                </button>

                            </div>
                        </div>
                    </div>
                </div>

                <!-- Mensaje cuando no hay resultados -->
                <div v-if="isLoading" class="text-center mt-5">
                    <i class="fas fa-spinner fa-spin fa-3x text-muted mb-3"></i>
                    <h4 class="text-muted">Cargando publicaciones...</h4>
                </div>

                <div v-else-if="fetchError || filteredNews.length === 0" class="text-center mt-5">
                    <i class="fas fa-search fa-3x text-muted mb-3"></i>
                    <h4 class="text-muted">No se encontraron publicaciones</h4>
                    <p class="text-muted">Puede que no haya contenido disponible o que ocurrió un error</p>
                </div>



            </div>
        </div>
    </main>
</template>

<script>
import imageSrc from '@/assets/img/image.png'
import axios from 'axios';

export default {
    name: "Home",
    data() {
        return {
            searchTerm: '',
            postData: [],
            isLoading: false,
            fetchError: false,
        }
    },
    computed: {
        // Noticias filtradas según la búsqueda
        filteredNews() {
            const noticiasFiltradas = !this.searchTerm
                ? this.postData
                : this.postData.filter(post =>
                    post.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                    post.introduccion.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                    post.usuario?.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
                );

            // Retornar ordenado por fecha descendente
            return noticiasFiltradas.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
        }

    },
    methods: {
        // Función para ir a login
        goToLogin() {
            this.$router.push('/login');
        },

        // Función para ir a admin
        goToAdmin() {
            this.$router.push('/Admin');
        },


        goToPost(postId) {
            const post = this.postData.find(p => p.id === postId);

            sessionStorage.setItem('currentPost', JSON.stringify(post));

            this.$router.push(`/post/${postId}`);
        },


        // Función para filtrar noticias (se puede usar para efectos adicionales)
        filterNews() {
            // Lógica adicional si es necesaria
        },

        async loadPost() {
            try {
                this.isLoading = true;
                this.fetchError = false;
                const response = await axios.get(`${import.meta.env.VITE_API_ART}article/get-articles`);
                if (response.status === 200) {
                    // Ordenar por fecha más reciente primero
                    this.postData = response.data;
                } else {
                    this.fetchError = true;
                }
            } catch (error) {
                this.fetchError = true;
                this.postData = [];
            } finally {
                this.isLoading = false;
            }
        }

    },
    mounted() {
        this.loadPost();
        console.log('Componente Home montado correctamente');
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
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15) !important;
}

.hover-card:hover .news-image {
    transform: scale(1.05);
}

/* Estilos para el navbar */
.navbar {
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
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

.col-lg-4:nth-child(1) {
    animation-delay: 0.1s;
}

.col-lg-4:nth-child(2) {
    animation-delay: 0.2s;
}

.col-lg-4:nth-child(3) {
    animation-delay: 0.3s;
}

.col-lg-4:nth-child(4) {
    animation-delay: 0.4s;
}

.col-lg-4:nth-child(5) {
    animation-delay: 0.5s;
}

.col-lg-4:nth-child(6) {
    animation-delay: 0.6s;
}
</style>