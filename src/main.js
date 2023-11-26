import { createApp } from 'vue'
import '@fortawesome/fontawesome-free/css/all.css';
import './style.css'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'; // Importa Vue Router
import RegisterM from './components/Register.vue';
import LoginM from './components/Login.vue';
import PetRegisterM from './components/PetRegister.vue';
import PetFeedM from './components/PetFeed.vue';



const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/register', component: RegisterM }, // Define la ruta para la página de registro
      { path: '/', component: LoginM },
      { path: '/PetRegister', component: PetRegisterM },
      { path: '/PetFeed', component: PetFeedM },
     
    ],
  });
  
  const app = createApp(App);
  app.use(router); // Usa el enrutador
  
  app.mount('#app');
  