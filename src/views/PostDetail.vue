<template>
  <!-- Header igual al Home -->
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container-fluid">
        <!-- Botón Volver al Home -->
        <button class="btn btn-outline-light me-3" @click="goToHome">
          <i class="bi bi-arrow-left me-2"></i>Volver al Home
        </button>
        
        <!-- Título del Foro -->
        
        
        <div></div> <!-- Espaciador -->
      </div>
    </nav>
  </header>

  <!-- Contenido del Post -->
  <main class="container my-5">
    <div class="row justify-content-center">
      <div class="col-lg-8">
        
        <!-- Tarjeta del Post -->
        <article class="card shadow-lg border-0">
          
          <!-- Imagen del Post -->
          <img 
            src="https://via.placeholder.com/800x400" 
            alt="Imagen del post"
            class="card-img-top post-image"
          >
          
          <!-- Contenido -->
          <div class="card-body p-4">
            
            <!-- Metadata -->
            <div class="post-meta mb-3">
              <span class="badge bg-primary me-2">
                <i class="bi bi-calendar3 me-1"></i>15 Jun 2025
              </span>
              <span class="badge bg-secondary">
                <i class="bi bi-person-circle me-1"></i>Dr. Ana García
              </span>
            </div>
            
            <!-- Título -->
            <h1 class="post-title text-primary mb-4">
              Avances en Tecnología Cuántica
            </h1>
            
            <!-- Contenido del Post -->
            <div class="post-content">
              <p class="lead text-muted mb-4">
                Los últimos desarrollos en computación cuántica prometen revolucionar la industria tecnológica en los próximos años.
              </p>
              
              <p>
                La computación cuántica representa uno de los avances más significativos en la historia de la tecnología moderna. A diferencia de los computadores tradicionales que utilizan bits binarios (0 y 1), los computadores cuánticos emplean qubits que pueden existir en múltiples estados simultáneamente.
              </p>
              
              <h3 class="text-primary mt-4 mb-3">¿Qué hace especial a la computación cuántica?</h3>
              <p>
                La principal ventaja de la computación cuántica radica en su capacidad de procesamiento paralelo masivo. Mientras que un computador tradicional procesa información de forma secuencial, un computador cuántico puede realizar múltiples cálculos simultáneamente.
              </p>
              
              <h3 class="text-primary mt-4 mb-3">Aplicaciones revolucionarias</h3>
              <ul class="custom-list">
                <li><strong>Criptografía:</strong> Capacidad de romper códigos de encriptación actuales en minutos</li>
                <li><strong>Medicina:</strong> Simulación molecular para desarrollo de nuevos medicamentos</li>
                <li><strong>Inteligencia Artificial:</strong> Aceleración exponencial del machine learning</li>
                <li><strong>Logística:</strong> Optimización de rutas y cadenas de suministro complejas</li>
              </ul>
              
              <p>
                Empresas como IBM, Google y Microsoft están invirtiendo miles de millones en esta tecnología, prediciendo que en la próxima década veremos aplicaciones comerciales viables que cambiarán fundamentalmente nuestra relación con la tecnología.
              </p>
            </div>
            
            <!-- Info del Autor -->
            <hr class="my-4">
            <div class="author-info p-3 bg-light rounded">
              <div class="d-flex align-items-center">
                <i class="bi bi-person-circle text-primary me-3" style="font-size: 3rem;"></i>
                <div>
                  <h5 class="mb-1 text-primary">Dr. Ana García</h5>
                  <p class="mb-0 text-muted">Física especializada en mecánica cuántica, investigadora en el Instituto de Tecnología Avanzada.</p>
                </div>
              </div>
            </div>
            
          </div>
        </article>
        
      </div>
    </div>
  </main>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  name: 'PostDetail',
  setup() {
    const router = useRouter();
    
    const goToHome = () => {
      router.push('/');
    };
    
    return {
      goToHome
    };
  }
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