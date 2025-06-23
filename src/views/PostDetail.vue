<template>
  <!-- Header -->
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container-fluid">
        <!-- Botón Volver al Home -->
        <button class="btn btn-outline-light me-3" @click="goToHome">
          <i class="bi bi-arrow-left me-2"></i>Volver al Home
        </button>
      </div>
    </nav>
  </header>

  <!-- Contenido del Post -->
  <main class="container my-5" v-if="post">
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <!-- Tarjeta del Post -->
        <article class="card shadow-lg border-0">
          <!-- Imagen del Post -->
          <img
            :src="post.urlFoto"
            :alt="post.title"
            class="card-img-top post-image"
          />

          <!-- Contenido -->
          <div class="card-body p-4">
            <!-- Metadata -->
            <div class="post-meta mb-3">
              <span class="badge bg-primary me-2">
                <i class="bi bi-calendar3 me-1"></i>
                {{ new Date(post.fecha).toLocaleDateString() }}
              </span>
              <span class="badge bg-secondary">
                <i class="bi bi-person-circle me-1"></i>
                {{ post.usuario?.nombre }}
              </span>
            </div>

            <!-- Título -->
            <h1 class="post-title text-primary mb-4">
              {{ post.title }}
            </h1>

            <!-- Contenido del Post -->
            <div class="post-content">
              <p class="lead text-muted mb-4">
                {{ post.introduccion }}
              </p>

              <p>
                {{ post.descripcion }}
              </p>
            </div>

            <!-- Info del Autor -->
            <hr class="my-4" />
            <div class="author-info p-3 bg-light rounded">
              <div class="d-flex align-items-center">
                <i class="bi bi-person-circle text-primary me-3" style="font-size: 3rem;"></i>
                <div>
                  <h5 class="mb-1 text-primary">{{ post.usuario?.nombre }}</h5>
                  <p class="mb-0 text-muted">{{ post.usuario?.correo }}</p>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </main>

  <!-- Fallback si no hay datos -->
  <div v-else class="text-center my-5">
    <i class="bi bi-exclamation-circle-fill text-danger" style="font-size: 3rem;"></i>
    <h3 class="text-danger mt-3">No se encontraron datos del post.</h3>
  </div>
</template>


<script>
export default {
  name: 'PostDetail',
  props: ['id'], // Recibe el ID como prop del router
  data() {
    return {
      post: {}
    }
  },
  methods: {
    goToHome() {
      this.$router.push('/');
    }
  },
  // ...existing code...
  mounted() {
    // Obtener los datos del post desde sessionStorage
    const storedPost = sessionStorage.getItem('currentPost');
    if (storedPost) {
      this.post = JSON.parse(storedPost);
      console.log('Post recibido:', this.post);
      // Limpiar el sessionStorage después de usarlo
      sessionStorage.removeItem('currentPost');
    } else {
      console.log('No se encontraron datos del post, redirigiendo al home...');
      // Redirigir al home si no hay datos
      this.$router.push('/');
    }
  }
  // ...existing code...
};
</script>

<style scoped>
/* Imagen del post */
.post-image {
  height: 300px;
  object-fit: cover;
  object-position: center;
}

/* Título del post */
.post-title {
  font-size: 2.2rem;
  font-weight: 700;
  line-height: 1.2;
}

/* Contenido del post */
.post-content {
  font-size: 1.1rem;
  line-height: 1.7;
  text-align: justify;
}

.post-content p {
  margin-bottom: 1.2rem;
}

.post-content h3 {
  font-weight: 600;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

/* Lista personalizada */
.custom-list {
  padding-left: 1.5rem;
  margin: 1.5rem 0;
}

.custom-list li {
  margin-bottom: 0.8rem;
}

.custom-list strong {
  color: #007bff;
}

/* Info del autor */
.author-info {
  border: 1px solid #dee2e6;
}

/* Badges */
.badge {
  font-size: 0.9rem;
  padding: 8px 12px;
}

/* Responsive */
@media (max-width: 768px) {
  .post-title {
    font-size: 1.8rem;
  }

  .post-image {
    height: 200px;
  }

  .post-content {
    font-size: 1rem;
  }
}
</style>