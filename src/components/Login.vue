<template>
    <div class="container">
      <div class="content">
        <div class="login-container">
          <div class="image-container">
            <img src="https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1915&q=80" alt="Login Image" class="login-image">
          </div>
          <div class="form-container">
            <h2 class="login-title">Iniciar sesión</h2>
            <form @submit.prevent="iniciarSesion" class="login-form">
              <div class="form-group">
                <label for="username" class="form-label">Nombre de usuario:</label>
                <input type="text" class="form-input" v-model="UserName" placeholder="Ingresa tu nombre de usuario" required>
              </div>
              <div class="form-group">
                <label for="password" class="form-label">Contraseña:</label>
                <input type="password" class="form-input" v-model="Password" placeholder="Ingresa tu contraseña" required>
              </div>
              <button type="submit" class="login-button">Iniciar sesión</button>
              <div class="register-link">
                <span>¿No tienes una cuenta?</span>
                <router-link to="/register">Registrarse</router-link> <!-- Cambiar la URL -->
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script>
  import Cookies from 'js-cookie';
  import axios from 'axios';
  
  export default {
    name: 'LoginM',
    data() {
      return {
        err: '',
        UserName: '',
        Password: '',
        loading: false,
        token: '',
      };
    },
    methods: {
      async iniciarSesion() {
        try {
          const response = await axios.post('http://localhost:8080/api/users/login', {
            username: this.UserName,
            password: this.Password,
          });
  
          if (response.status === 200) {
            const { token, UserName } = response.data;
            Cookies.set('token', token);
            Cookies.set('username', UserName);
            this.$router.push('/PetFeed');
          } else {
            const errorData = response.data;
            this.err = errorData.message; // Assuming your server sends error messages in a 'message' property
          }
        } catch (error) {
          console.error('Error during login:', error);
        }
      },
    },
  };
  </script>
    
    <style>
    body {
      margin: 0;
      padding: 0;
      background-image: url('https://images.unsplash.com/photo-1563988346719-7a13ccfcc69d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80');
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;
    }
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      padding: 20px;
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
      padding: 20px;
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
    </style>
    