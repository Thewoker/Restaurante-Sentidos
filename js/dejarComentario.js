import { database } from './conexionBD.js';
import { ref, onValue, set } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-database.js";

const botonEnviarComentario = document.getElementById('boton-enviar-comentario');
const inputComentario = document.getElementById('message');

inputComentario.addEventListener('click', (evento) => {
    if(sessionStorage.getItem('usuario') == null) {
        alert('Para comentar primero debe ingrsar con su nombre de usuario y contraseña');
        location.href = 'ingresar.html';
    };
});

botonEnviarComentario.addEventListener('click', (evento) => {
    evento.preventDefault();
    if(sessionStorage.getItem('usuario') != null) {
        let comentario = inputComentario.value;
    
        const clienteQueComenta = ref(database, `usuarios/usuario${sessionStorage.getItem('usuario')}/comentarios`);
    
        set(clienteQueComenta, comentario);
        alert('Comentario enviado con éxito.');
    } else {
        alert('Para comentar primero debe ingrsar con su nombre de usuario y contraseña');
        location.href = 'ingresar.html';
    }
});