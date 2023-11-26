<template>
    <div class="login-container">
      <div class="image-container">
        <img src="https://images.unsplash.com/photo-1592754862816-1a21a4ea2281?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80" alt="Login Image" class="login-image">
      </div>
      <div class="form-container">
        <h2 class="login-title">Regístrate</h2>
        <form @submit.prevent="login" class="login-form">
          <div class="form-group-row">
            <div class="form-group">
              <label for="firstName" class="form-label">Usuario:</label>
              <input type="text" class="form-input" v-model="form.UserName" placeholder="Nombre de usuario" required >
            </div>
            <div class="form-group">
              <label for="firstName" class="form-label">Nombre:</label>
              <input type="text" class="form-input" v-model="form.Firstname" placeholder="Nombre" requiered>
            </div>
          
          </div>
          <div class="form-group-row">
          
            <div class="form-group">
              <label for="lastName" class="form-label">Apellido:</label>
              <input type="lastName" class="form-input" v-model="form.LastName" placeholder="Apellido" required>
            </div>
            <div class="form-group">
              <label for="phone" class="form-label">Teléfono celular:</label>
              <input type="text" class="form-input" v-model="form.Phone" placeholder="Número de teléfono" required>
            </div>
            
          </div>
          <div class="form-group">
            <label for="password" class="form-label">Contraseña:</label>
            <input type="text" class="form-input" v-model="form.Password" placeholder="Contraseña" required>
          </div>
         
         
          <button type="submit" class="login-button" @click="guardar()" >Regístrate</button>
          <div class="register-link">
            <span>¿Ya tienes una cuenta?</span>
            <a href="/">Inicia sesión</a> <!-- Cambiar la URL -->
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    name: 'RegisterM',
    data:function() {
      return {
        form:{
            "UserName" :  null,
                "Firstname" :  null,
                "LastName" :  null,
                "Phone":  null, 
                "Password":  null, 
               
                

            }
      };
    },
    methods: {
      guardar() {
        
        var tele = {
    username: this.form.UserName,
    firstname: this.form.Firstname, 
    lastname: this.form.LastName,
    cellphone: parseInt(this.form.Phone),
    password: this.form.Password
};
        axios
        .post('http://localhost:8080/api/users/register', tele)
        .then((data) => {
          console.log(data);
         // Mostrar notificación de registro exitoso
         if (Notification.permission === 'granted') {
            new Notification('Registro exitoso', {
              body: 'Fue registrado con éxito.'
            });
          }

          this.$router.push("/");
        })
        .catch((e) => {
          console.log(e);
        });
    }
  },
  created() {
    // Solicitar permiso para mostrar notificaciones
    if ('Notification' in window) {
      Notification.requestPermission();
    }
  }
};
</script>
  
  <style>
  body {
    margin: 0;
    padding: 0;
    background-image: url('https://images.unsplash.com/photo-1516655855035-d5215bcb5604?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
  }
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 1200px; 
    margin: 0 auto;
    background-color: #c81d1d;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(203, 58, 58, 0.1);
    padding: 5px;
  }
  .image-container {
    flex: 1;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    overflow: hidden;
  }
  .login-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .form-container {
    flex: 1;
    padding: 5px;
 
  }
  .login-title {
    text-align: center;
    margin-bottom: 20px;
    font-size: 24px;
  }
  .form-group {
    margin-bottom: 15px;
  }
  .form-label {
  display: block;
    margin-bottom: 5px;
    font-size: 15px;
    color: #333;
     text-align: left;
     
  }
  .form-input {
    width: calc(100% - 20px);
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-top: 5px;
    background-color: white;
    color: black;
  }
  .login-button {
    width: calc(100% - 20px);
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: #333;
    color: rgb(255, 255, 255);
    font-size: 16px;
    cursor: pointer;
    margin-top: 10px;
  }
  .login-button:hover {
    background-color: rgb(249, 144, 7);
  }
  .register-link {
    text-align: center;
    margin-top: 10px;
  }
  .register-link span {
    margin-right: 5px;
  }
  .register-link a {
    color: #333;
    text-decoration: underline;
  }
  .register-link a:hover {
    color: #555;
  }
  
  .form-group-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
  }
  
  .form-group-row .form-group {
    width: calc(75% - 9px);
    padding: 2px;
  }
  
  @media (max-width: 600px) {
    .form-group-row {
      flex-direction: column;
    }
  
    .form-group-row .form-group {
      width: 100%;
    }
  }
  </style>
  
  
  
  
  