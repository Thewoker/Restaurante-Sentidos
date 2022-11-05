import UsuarioRegistradoService from './usuariosRegistradosService.js';

const usuarioIngresado = document.getElementById('usuario-ingresado');
const contrasenaIngresado = document.getElementById('contrasena-ingresado');

const botonIngresar = document.getElementById('boton-ingresar');

botonIngresar.addEventListener('click', (evento) => {
    evento.preventDefault();

    console.log('Informacion get de sesion: ' + (sessionStorage.getItem('usuario')));

    console.log(usuarioIngresado.value);
    console.log(contrasenaIngresado.value);

    const corroborarUsuario = new UsuarioRegistradoService;

    function comprobarUsuario() {
        corroborarUsuario.getUsuarioRegistrado()
            .then((usuarios) => {
                console.log(usuarios);
                let listaUsuarios = Object.keys(usuarios).map((nombre) => usuarios[nombre]);
                console.log(listaUsuarios);
                var nombreInvalido = true;
                
                const BreakPoint = {};
                try {
                    listaUsuarios.forEach(usuario => {
                        console.log(usuario.nombre);
                        if(usuario.nombre == usuarioIngresado.value ) {
                            nombreInvalido = false;
                            if(usuario.password == contrasenaIngresado.value) {
                                alert('Sea bienvenido ' + usuario.nombre + ' ' + usuario.apellido);
                                sessionStorage.setItem('usuario', usuario.id);
                            } else {
                                alert('Contraseña incorrecta, inténtelo nuevamente.');
                            }
                            throw BreakPoint;
                        }
                    });
                } catch (error) {
                    if (error !== BreakPoint) throw error;
                }

                if(nombreInvalido) {
                    alert('Nombre de usuario incorrecto, inténtelo nuevamente.');
                }
            })
            .catch(error => console.log(error));
    }

    comprobarUsuario();
})




  