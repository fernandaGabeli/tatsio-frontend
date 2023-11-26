<template>
  <div>
    
      <div class="title-container">
        <h2 class="dar">Mascotas</h2>
      </div>
      <div>
      <div v-if="!isCameraOpen" @click="openCamera" class="camera-icon">
        <i class="fas fa-camera"></i>
      </div>
      <div v-if="isCameraOpen" @click="closeCamera" class="camera-close-icon">
        <i class="fas fa-times"></i>
      </div>
    </div>
    <div class="main-container">
      <div class="button-container">
        <button @click="redirectToNewRecord" class="btn btn-orange btn-new-record">Nuevo registro</button>
        <button @click="logout" class="btn btn-orange btn-logout">Cerrar Sesión</button>
     </div>
    
    </div>
    <div class="search-container">
      <div class="search-input-container">
        <span class="search-icon">🔍</span>
        <input type="text" placeholder="Buscar..." class="search-input">
      </div>
      
      </div>
   <br>
    <div class="container">
      <div class="card-deck">
        <div v-for="catalog in ListaCatalog" :key="catalog._id" class="card">
          <img
            v-if="catalog.images && catalog.images.length > 0"
            :src="catalog.images[0]"
            class="card-img-left"
            alt="Imagen de la mascota"
          />
          <div class="card-body">
            <h5 class="card-title">{{ catalog.name }}</h5>
            <div class="info-row">
              <p class="card-text"><strong>Edad:</strong> {{ catalog.age }}</p>
            </div>
            <div class="text-wrapper">
              <p class="card-text description">{{ catalog.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Cookies from 'js-cookie';
import VueJwtDecode from 'vue-jwt-decode';
import { isAuthenticated } from '../Auth';


export default {
  name: 'listaCatalog',
  data() {
    return {
      ListaCatalog: null,
      isCameraOpen: false,
      cameraStream: null,
    };
  },
  methods: { 
    redirectToNewRecord() {
      // Redirecciona a la página /petregister
      this.$router.push('/petregister');
    },
    async logout() {
    try {
      // Elimina el token y redirige a la página de inicio de sesión
      Cookies.remove('token');
      await this.$router.push('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  },
  openCamera() {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          this.isCameraOpen = true; // Cambia el estado de la cámara
          this.showCameraStream(stream);
        })
        .catch((error) => {
          console.error('Error al acceder a la cámara:', error);
        });
    },
    
  
    showCameraStream(stream) {
      // Almacena el stream para cerrarlo más tarde si es necesario
      this.cameraStream = stream;

      const videoElement = document.createElement('video');
      videoElement.srcObject = stream;
      document.body.appendChild(videoElement);
      videoElement.play();
    },
    closeCamera() {
      // Detén el stream y elimina el elemento de video
      if (this.cameraStream) {
        const tracks = this.cameraStream.getTracks();
        tracks.forEach(track => track.stop());
        this.cameraStream = null;
      }

      this.isCameraOpen = false;
      // Elimina el elemento de video del DOM
      const videoElement = document.querySelector('video');
      if (videoElement) {
        videoElement.parentNode.removeChild(videoElement);
      }
    },
  
  },
  mounted() {
    const token = Cookies.get('token');
    const username = Cookies.get('username');
    
    if (token && username) {
      const decodedToken = VueJwtDecode.decode(token);
      const userId = decodedToken.uid;
      console.log(decodedToken);

      let direccion = 'http://localhost:8080/api/posts';
      axios.get(direccion, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then(data => {
        this.ListaCatalog = data.data;
      })
      .catch(error => {
        console.error('Error al obtener la lista de catálogo:', error);
      });
    }
  },
  created() {
    if (!isAuthenticated()) {
      this.$router.push('/');
    }
  },
};
</script>

<style scoped>

.camera-close-icon {
  position: absolute;
  top: 10px; /* Ajusta la posición vertical según tus necesidades */
  right: 10px; /* Ajusta la posición horizontal según tus necesidades */
  z-index: 2; /* Asegura que el ícono de cerrar esté encima del elemento de video */
  cursor: pointer;
  font-size: 24px;
  color: #333;
}
.main-container {
  display: flex;
  flex-direction: column; /* Ajusta la dirección principal alineando verticalmente */
  align-items: flex-start; /* Alinea los elementos a la izquierda */
}
.button-container {
  margin-right: 15px; /* Ajusta el margen derecho según tu preferencia */
  align-self: flex-end; /* Mueve el button-container al extremo derecho */
}
.btn-new-record,
.btn-logout {
  margin-right: 10px; /* Ajusta el margen derecho de los botones */
  margin-bottom: 10px; /* Ajusta el espacio entre los botones */
}

.registro-container {
  margin-bottom: 20px;
}
.izquierda {
  text-align: center;
}

.dar {
  color: black;
  margin-bottom: 0;
}

.card-deck {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.card {
  width: 100%; /* Usamos el 100% del ancho del contenedor */
  max-width: 600px; /* Limitamos el ancho máximo según tus necesidades */
  height: auto; /* Ajustamos la altura automáticamente según el contenido */
  margin-bottom: 10px;
  font-size: 14px;
  background-color: #e0e0e0;
  border: 1px solid #ff6600;
  border-radius: 8px;
  display: flex;
}
.card-img-left {
  width: 150px;
  height: 150px;
  object-fit: cover;
  align-self: center; /* Alinea la imagen al centro verticalmente */
}

.card-body {
  padding: 5px;
  flex: 1; /* Hace que el cuerpo de la tarjeta ocupe todo el espacio disponible */
}
.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center; /* Alinea verticalmente el contenido */
  margin-bottom: -5px; /* Ajusta el espacio entre las filas */
}


.card-title {
  font-size: 16px;
  margin-bottom: 0; /* Ajusta el espacio entre el título y el resto del contenido */
  text-align: center; /* Centra el texto */
}


.text-wrapper {
  max-height: 100px; /* Establece una altura máxima para el div que contiene el texto */
  overflow: hidden;
  text-overflow: ellipsis; /* Agrega puntos suspensivos cuando el texto se corta */
  white-space: normal; /* Permite que el texto se desplace a la siguiente línea si es necesario */
}
.card-text {
  font-size: 14px;
  text-align: justify; /* Justifica el texto */
}

.description {
  text-align: justify; /* Justifica el texto */
}

.btn-new-record {
  margin-top: 0px; /* Ajusta el espacio entre el botón y las tarjetas */
  margin-right: 10px; /* Ajusta el espacio entre el botón y el borde derecho */
  align-self: flex-end; /* Coloca el botón en la esquina superior derecha */
  background-color: #ff6600; /* Color de fondo naranja */
  border-color: #ff6600; /* Color del borde naranja */
  color: #fff; /* Color del texto blanco */
}
.search-container {
  margin-top: 5px;
  text-align: center;
  width: 100%;
  height: 50px;
  
  display: flex;
  justify-content: center;
  align-items: center;
}


.search-input-container {
  display:flex;
  align-items: center;
  background-color: #e0e0e0;
  border: 1px solid #6b6666; /* Establece un borde para la barra de búsqueda */
  border-radius: 15px; /* Bordes redondeados */
  width: 80%; /* Ajusta el ancho del contenedor de la barra de búsqueda */
  margin: 0 auto; /* Centra el contenedor en el espacio disponible */

}

.search-icon {
  padding: 2px;
  font-size: 15px;
}

.search-input {
  width: 100%; /* Usamos el 100% del ancho del contenedor */
  flex: 1;
  color: black;
  padding: 6px;
  font-size: 12px;
  border: none;
  background-color: transparent;
  border-radius: 4px;
}

</style>