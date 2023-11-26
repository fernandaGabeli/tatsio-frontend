import Cookies from 'js-cookie'

export function isAuthenticated() {
    const token = Cookies.get('token')
    return token !== undefined && token !== null
}
//permite verificar si el usuario ha iniciado sesión en la 
//aplicación web y está autorizado para acceder a ciertas funcionalidades o páginas restringidas.