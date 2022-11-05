const botonFinalizarSesion = document.getElementById('cerrar-sesion');

botonFinalizarSesion.addEventListener('click', () => {
    if(sessionStorage.getItem('usuario') == null) {
        alert('No se ha iniciado ninguna sesión.');
    } else {
        sessionStorage.removeItem('usuario');
        alert('Sesión cerrada.');
        location.href = 'index.html';
    }
});