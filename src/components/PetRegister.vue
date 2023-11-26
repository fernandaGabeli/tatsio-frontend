<template>
  <div class="pet-registration-container">
    <h2>Registro de Mascotas</h2>
    <form @submit.prevent="registerPet" class="pet-registration-form">
      <div class="form-columns">
        <div class="form-column">
          <div class="form-group">
            <label for="petName" class="form-label">Nombre de la mascota:</label>
            <input type="text" v-model="form.petName" class="form-input" placeholder="Nombre de la mascota" required>
          </div>
          <div class="form-group">
            <label for="petAge" class="form-label">Edad o años:</label>
            <input type="number" v-model="form.petAge" class="form-input" placeholder="Edad o años" required>
          </div>
          <div class="form-group">
            <label for="petDescription" class="form-label">Descripción:</label>
            <textarea v-model="form.petDescription" class="form-input" placeholder="Descripción"></textarea>
          </div>
         
        </div>
        <div class="form-column">
          <div class="form-group">
            <label for="petCategory" class="form-label">Categoría:</label>
            <select v-model="form.petCategory" class="form-input" multiple required>
              <option value="Perro">Perro</option>
              <option value="Gato">Gato</option>
              <option value="Ave">Ave</option>
              <option value="Reptil">Reptil</option>
            </select>
          </div>
          <div class="form-group">
            <label for="petImageUrl" class="form-label">Imagen de la mascota (URL):</label>
            <input type="url" v-model="form.petImageUrl" class="form-input" placeholder="Ingresa la URL de la imagen">
          </div>
        </div>
      </div>
      <button type="button" class="btn btn-success" v-on:click="guardar">Registrar mascota</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import Cookies from 'js-cookie';
import VueJwtDecode from 'vue-jwt-decode';
import { isAuthenticated } from '../Auth';

export default {
  name: 'PetRegisterM',
  data: function() {
    return {
      form: {
        petName: null,
        petAge: null,
        petCategory: [],
        petDescription: null,
        petImageUrl: null,
      },
    };
  },
  methods: {
    guardar() {
      // Verificar si alguno de los campos está vacío
      if (
        !this.form.petName ||
        !this.form.petAge ||
        this.form.petCategory.length === 0 ||
        !this.form.petDescription ||
        !this.form.petImageUrl 
      ) {
        // Mostrar alerta si algún campo está vacío
        alert('¡Por favor, llene todos los campos!');
        return; // Detener la ejecución si hay campos vacíos
      }

      const token = Cookies.get('token');
      const username = Cookies.get('username');

      if (token && username) {
        const decodedToken = VueJwtDecode.decode(token);
        const userId = decodedToken.uid;
        console.log(decodedToken);

        const requestData = {
          userId,
          name: this.form.petName,
          age: this.form.petAge,
          images: [this.form.petImageUrl], // Envía las imágenes como un array
          categories: this.form.petCategory,
          description: this.form.petDescription,
        };
        console.log('Request Data:', requestData);

        axios
          .post('http://localhost:8080/api/posts', requestData, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          })
          .then((data) => {
            console.log(data);

            // Mostrar notificación de registro exitoso
            if (Notification.permission === 'granted') {
              new Notification('Registro de mascota exitoso', {
                body: 'La mascota fue registrada con éxito.'
              });
            }

            this.$router.push('/petFeed');
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        // Handle unauthorized action
        console.log('No tienes autorización');
      }
    },
  },
  created() {
    // Solicitar permiso para mostrar notificaciones
    if ('Notification' in window) {
      Notification.requestPermission();
    }

    if (!isAuthenticated()) {
      this.$router.push('/');
    }
  },
};
</script>


  
  <style scoped>
  .pet-registration-form .form-select {
  width: calc(100% - 40px); /* Ajuste del ancho */
  padding: 15px;
  border: 1px solid #e0e0e0; /* Color gris más claro */
  border-radius: 8px;
  font-size: 16px;
  appearance: none; /* Elimina la apariencia nativa del sistema operativo */
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="6"><polygon points="0,0 12,0 6,6" fill="%23333"/></svg>') no-repeat right 15px center/8px 10px; /* Agrega una flecha personalizada */
}

.pet-registration-form .form-select:focus {
  outline: none;
  border-color: #ff6600; /* Cambia el color del borde al enfocar */
}
  .pet-registration-container {
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(217, 225, 219, 0.1);
  }
  
  .pet-registration-form .form-group {
    margin-bottom: 20px;
  }
  
  .pet-registration-form .form-label {
    display: block;
    margin-bottom: 5px;
    font-size: 18px;
    color: #333;
  }
  
  
  
  .pet-registration-form .form-input[type="file"] {
    padding: 0;
  }
  
  .pet-registration-form .uploaded-image {
    max-width: 100%;
    height: auto;
    margin-top: 10px;
  }
  
  .pet-registration-form .form-input {
    width: calc(100% - 40px); /* Ajuste del ancho */
    padding: 15px;
    border: 1px solid #e0e0e0; /* Color gris más claro */
    border-radius: 8px;
    font-size: 16px;
  }
  
  .pet-registration-form .submit-button {
  width: calc(100% - 40px); /* Ajuste del ancho */
  padding: 15px;
  border: none;
  border-radius: 8px;
  background-color: #ff6600; /* Cambia el color del fondo a naranja */
  color: rgb(255, 255, 255);
  font-size: 18px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s;
}
  
  
.pet-registration-form .submit-button:hover {
  background-color: #ff944d;
}
  .pet-registration-form {
  max-width: 600px; /* Ajusta este valor según tu preferencia */
  margin: 0 auto;
}

.form-group {
  margin-bottom: 15px;
}
.pet-registration-form .form-columns {
  display: flex;
  justify-content: space-between;
}

.pet-registration-form .form-column {
  flex: 1;
  margin-right: 20px; /* Ajusta el espacio entre las columnas según tu preferencia */
}
  </style>
  