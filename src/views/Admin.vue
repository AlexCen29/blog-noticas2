<template>
  <header>
    <div class="admin-container">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <h1 class="navbar-brand">Panel de Administración</h1>
          <div class="d-flex align-items-center gap-2">

            <button class="btn btn-add btn-color3" @click="logout" :disabled="isLoading">
              <i class="bi bi-box-arrow-right me-2"></i>Cerrar Sesión
            </button>

            <!-- Botón Volver al Home -->
            <button class="btn btn-add btn-color" @click="goToHome">
              <i class="bi bi-house-fill me-2"></i>Volver al Home
            </button>

            <!-- Botón Nuevo Post -->
            <button class="btn btn-add btn-color2" @click="showModal(false)" :disabled="isLoading">
              <i class="bi bi-plus-circle-fill me-2"></i>Nuevo Post
            </button>
          </div>

        </div>
      </nav>
    </div>
  </header>

  <body>
    <div class="container-fluid py-4">
      <!-- Sección principal con buscador y tabla -->
      <div class="row">
        <div class="col-12 mb-4">
          <div class="admin-container card shadow-lg">
            <div class="card-body">
              <!-- Buscador -->
              <div class="row mb-4">
                <div class="col-md-6 col-lg-4">
                  <div class="input-group search-container">
                    <span class="input-group-text">
                      <i class="bi bi-search"></i>
                    </span>
                    <input type="text" v-model="quickFilterText" placeholder="Buscar..." class="form-control me-2"
                      @input="onQuickFilterChanged" />
                  </div>
                </div>
              </div>

              <!-- Tabla con ag-grid -->
              <div class="ag-theme-alpine" style="height: 600px; width: 100%;">
                <ag-grid-vue style="width: 100%; height: 380px;" :columnDefs="columnDefs" :rowData="rowData"
                  :quickFilterText="quickFilterText" :context="{ componentParent: this }" @grid-ready="onGridReady"
                  :localeText="localeText" @filterChanged="onFilterChanged" :loading="isLoading || loadingTable">
                </ag-grid-vue>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal para agregar nueva palabra -->
      <div ref="modal" class="modal fade" id="newWordModal" tabindex="-1" aria-labelledby="newWordModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="newWordModalLabel"><span>{{ isEditing ? 'Editar Post' : 'Crear Post'
              }}</span></h5>
              <button type="button" :disabled="isLoading" class="btn-close" data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="submitPost">
                <div class="row">
                  <!-- Columna izquierda -->
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">Título</label>
                      <input type="text" class="form-control" v-model="form.title" required :disabled="isLoading">
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Introducción</label>
                      <textarea class="form-control" v-model="form.introduccion" required :disabled="isLoading"
                        maxlength="150" rows="3" placeholder="Máximo 150 caracteres"></textarea>
                      <div class="form-text d-flex justify-content-between">
                        <small class="text-muted">Breve descripción del post</small>
                        <small :class="form.introduccion.length >= 150 ? 'text-danger' : 'text-muted'">
                          {{ form.introduccion.length }}/150
                        </small>
                      </div>
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Fecha</label>
                      <input type="date" class="form-control" v-model="form.fecha" required :disabled="isLoading">
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Estatus</label>
                      <select class="form-select" v-model="form.status" required :disabled="isLoading">
                        <option value="ACTIVO">Activo</option>
                        <option value="DESACTIVO">Inactivo</option>
                      </select>
                    </div>
                  </div>

                  <!-- Columna derecha -->
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">URL de Imagen</label>
                      <input type="url" class="form-control" v-model="form.urlFoto" required :disabled="isLoading">
                    </div>
                    <div class="mb-3 text-center">
                      <img v-if="form.urlFoto" :src="form.urlFoto" alt="Previsualización" class="img-preview rounded"
                        @error="form.urlFoto = ''" />
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Descripción</label>
                      <textarea class="form-control" v-model="form.descripcion" rows="6" required
                        :disabled="isLoading"></textarea>
                    </div>
                  </div>
                </div>

                <div class="modal-footer">
                  <button type="button" class="btn btn-cancel" data-bs-dismiss="modal"
                    :disabled="isLoading">Cancelar</button>
                  <button type="submit" class="btn btn-primary btn-add"
                    :disabled="isLoading || !form.title || !form.introduccion || !form.descripcion || !form.urlFoto || !form.fecha">
                    {{ isEditing ? 'Editar' : 'Guardar' }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

    </div>
  </body>
</template>

<script>
import { Modal } from 'bootstrap';
import { AgGridVue } from 'ag-grid-vue3';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router'


export default {
  name: 'AdminView',
  components: {
    'ag-grid-vue': AgGridVue,
  },
  data() {
    return {
      quickFilterText: '',
      isLoading: false,
      isEditing: false,
      loadingTable: false,
      form: {
        id: null,
        title: '',
        introduccion: '',
        descripcion: '',
        urlFoto: '',
        status: 'ACTIVO',
        fecha: new Date().toISOString().split('T')[0] // yyyy-mm-dd
      },

      localeText: {
        errorTabla: false,
        sinInformacion: '',
        rowData: [],
        originalRowData: [],
        noRowsToShow: 'No hay datos para mostrar'
      },
      columnDefs: [
        { headerName: "ID", field: "id", sortable: true, filter: true, width: 80 },
        { headerName: "Título", field: "title", sortable: true, filter: true, flex: 1 },
        { headerName: "Introducción", field: "introduccion", sortable: false, flex: 2 },
        { headerName: "Descripción", field: "descripcion", sortable: false, flex: 2 },
        {
          headerName: "Autor",
          field: "usuario.nombre",
          flex: 1,
          valueGetter: params => params.data.usuario?.nombre || "Sin autor",
        },
        {
          headerName: "Fecha",
          field: "fecha",
          valueFormatter: params => new Date(params.value).toLocaleDateString(),
          width: 130
        },
        {
          headerName: "Estatus",
          field: "status",
          width: 140,
          cellRenderer: params => {
            const status = params.value || 'DESCONOCIDO';
            let bgColor = '#D9D9D9';
            let textColor = 'black';

            switch (status.toUpperCase()) {
              case 'ACTIVO':
                bgColor = '#9BC53D';
                break;
              case 'INACTIVO':
                bgColor = '#FDE74C';
                break;
            }

            return `
        <div style="
          background-color: ${bgColor};
          color: ${textColor};
          padding: 6px 12px;
          border-radius: 16px;
          text-align: center;
          font-weight: bold;
          width: fit-content;
          margin: auto;
        ">
          ${status}
        </div>
      `;
          }
        },
        {
          headerName: 'Acciones',
          field: 'acciones',
          width: 60,
          pinned: 'right',
          cellRenderer: function (params) {
            const button = document.createElement('button');
            button.className = 'btn btn-warning btn-sm';
            button.innerHTML = '✏️ Editar';

            // Acceder a la instancia del componente Vue
            const vueComponentInstance = params.context?.componentParent;

            if (!vueComponentInstance) {
              console.error('No se pudo acceder al componente Vue.');
              return button;
            }
            button.disabled = vueComponentInstance.isSubmitting;

            button.addEventListener('click', async function () {
              const clave = params.data.id;
              try {
                const result = await Swal.fire({
                  title: "Confirmación",
                  text: `¿Desea editar registro con ID: ${clave}?`,
                  icon: "warning",
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  showCancelButton: true,
                  confirmButtonText: 'Sí, continuar',
                });
                if (result.isConfirmed) {
                  await vueComponentInstance.editPost(clave);
                }
              } catch (error) {
                Swal.fire({
                  title: "Error",
                  text: error.message,
                  icon: "error",
                  confirmButtonColor: '#E55934',
                });
              }
              finally {
                vueComponentInstance.isLoading = false;
              }
            });

            return button;
          }
        }

      ],
      defaultColDef: {
        resizable: true
      },
      rowData: []
    };
  },
  methods: {
    goToHome() {
      this.$router.push('/');
    },

    showModal(editando) {
      if (!editando) {
        this.isEditing = false;
        this.form = {
          id: null,
          title: '',
          introduccion: '',
          descripcion: '',
          urlFoto: '',
          status: 'ACTIVO',
          fecha: this.getTodayDate()
        };
      }
      this.modal.show();
    },

    getTodayDate() {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },

    closeModal() {
      this.modal.hide();
      document.body.style.paddingRight = '0px';
    },

    onQuickFilterChanged() {
      this.gridApi.setQuickFilter(this.quickFilterText);
    },

    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
      params.api.sizeColumnsToFit();
    },

    Return() {
      this.$router.push("/game");
    },

    logout() {
      // Limpiar datos de sesión
      sessionStorage.removeItem('authToken');
      sessionStorage.removeItem('authUser');

      // Mostrar mensaje de confirmación
      Swal.fire({
        icon: 'success',
        title: 'Sesión cerrada',
        text: 'Has cerrado sesión correctamente',
        confirmButtonColor: '#007bff',
        timer: 1500,
        showConfirmButton: false
      });

      // Redirigir al home
      setTimeout(() => {
        this.$router.push('/');
      }, 1500);
    },

    async submitPost() {
      this.isLoading = true;
      try {

        let response = this.isEditing ? await this.updatePost(this.form.id) : await this.createPost();

        await this.loadPost();
        this.closeModal();
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: response,
          confirmButtonColor: '#9BC53D',
        });
        // aquí podrías actualizar la tabla si es necesario

      } catch (error) {
        const errorMessage = error.response?.data?.error || '¡Error al crear la palabra!';
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorMessage,
          confirmButtonColor: '#E55934',
        });
      } finally {
        this.isLoading = false;
      }
    },

    async createPost() {
      const token = sessionStorage.getItem('authToken');
      const response = await axios.post(
        `${import.meta.env.VITE_API_ART}article/register`,
        {
          title: this.form.title,
          introduction: this.form.introduccion,
          description: this.form.descripcion,
          imagePath: this.form.urlFoto,
          date: this.form.fecha,
          status: this.form.status
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      if (response.status !== 200) {
        const errorMessage = error.response?.data?.error || '¡Error al crear el post!';
        throw new Error(errorMessage);
      }

      return 'Artículo registrado correctamente.';
    },

    async updatePost(id) {
      const token = sessionStorage.getItem('authToken');
      const response = await axios.put(
        `${import.meta.env.VITE_API_ART}article/update-article/${id}`,
        {
          titulo: this.form.title,
          introduccion: this.form.introduccion,
          descripcion: this.form.descripcion,
          urlFoto: this.form.urlFoto,
          fecha: this.form.fecha,
          status: this.form.status
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      if (response.status !== 200) {
        const errorMessage = error.response?.data?.error || '¡Error al crear la palabra!';
        throw new Error(errorMessage);
      }
      return "¡Palabra actualizada correctamente!";
    },

    async editPost(id) {
      const post = this.rowData.find(p => p.id === id);
      if (!post) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se encontró el post en la tabla.',
        });
        return;
      }

      // Llenar el formulario
      this.form.id = post.id;
      this.form.title = post.title;
      this.form.introduccion = post.introduccion;
      this.form.descripcion = post.descripcion;
      this.form.urlFoto = post.urlFoto || post.imagePath || '';
      this.form.fecha = post.fecha?.split('T')[0]; // formato yyyy-mm-dd
      this.form.status = post.status || 'ACTIVO';

      this.isEditing = true;
      this.modal.show();
    },

    async loadPost() {
      try {
        this.loadingTable = true;
        const token = sessionStorage.getItem('authToken');

        const response = await axios.get(
          `${import.meta.env.VITE_API_ART}article/get-articles-by-user`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          }
        );

        if (response.status === 200) {
          this.rowData = response.data;
          this.originalRowData = [...response.data];
        } else {
          throw new Error(response.data);
        }
      } catch (error) {
        const errorMessage = error.response?.data?.error || '¡Error al recuperar las palabras!';

      } finally {
        this.isLoading = false;
        this.loadingTable = false;
      }
    }
  },
  async mounted() {
    // const steps = 2;
    // const increment = 100 / steps;
    //await this.getListaMonedasTabla();
    // this.progress += increment;
    await this.loadPost();
    // this.progress += increment;
    // this.loading = false;
    this.modal = new Modal(this.$refs.modal, {
      backdrop: 'static',
      keyboard: false
    });

    const observer = new MutationObserver(() => {
      document.body.style.paddingRight = '0px';
    });

    // Observa cambios en el estilo del body
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['style']
    });

    // Guarda el observer si luego quieres desconectarlo (opcional)
    this.modalObserver = observer;
  },
};
</script>

<style scoped>
.admin-title {
  font-size: 32px;
  font-weight: bold;
  color: #000000;
}

.admin-container {
  border-radius: 15px;
  background-color: white;
  border: none;
}

.search-container {
  margin-bottom: 20px;
}

.input-group-text {
  background-color: #58C0EB;
  color: white;
  border: none;
}

.form-control:focus,
.form-select:focus {
  border-color: #58C0EB;
  box-shadow: 0 0 0 0.25rem rgba(88, 192, 235, 0.25);
}

.btn-add {
  color: black;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: bold;
  transition: all 0.3s ease;
}

.btn-color {
  background-color: #9BC53D;
}

.btn-color2 {
  background-color: #0056b3;
}

.btn-color3 {
  background-color: #c53d3d;
}

.btn-add:hover {
  background-color: #58C0EB;
  transform: translateY(-2px);
}

.btn-cancel {
  background-color: #D9D9D9;
  color: black;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: bold;

}

.btn-cancel:hover {
  background-color: #B9B9B9;
}

.btn-edit {
  background-color: #58C0EB;
  color: white;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.btn-edit:hover {
  background-color: #4BA3CE;
  transform: translateY(-2px);
}

/* Personalización de ag-grid */
:deep(.ag-theme-alpine .ag-cell) {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Centrar texto en encabezados */
:deep(.ag-theme-alpine .ag-header-cell-label) {
  justify-content: center;
  text-align: center;
}

:deep(.ag-theme-alpine) {
  font-family: 'Roboto Serif', serif !important;
}


/* Modal styling */
.modal-content {
  border-radius: 15px;
  border: none;
}

.modal-header {
  background-color: #58C0EB;
  color: white;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  padding: 15px 20px;
}

.modal-title {

  font-weight: bold;
}

.modal-footer {
  border-top: none;
  padding: 15px 0px;
}

/* Form styling */
.form-label {

  font-weight: bold;
}

.form-control,
.form-select {
  border-radius: 8px;
  padding: 10px 15px;
  border: 1px solid #D9D9D9;
}

.navbar {
  background-color: #FA7921 !important;
}

.admin-title {
  font-size: 32px;
  font-weight: bold;
  color: #000000;
}

.btn-back {
  background-color: #dc3545;
  /* Rojo */
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: bold;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
}

.btn-back:hover {
  background-color: #c82333;
  transform: translateY(-2px);
}

.img-preview {
  max-width: 100%;
  max-height: 180px;
  object-fit: cover;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}
</style>