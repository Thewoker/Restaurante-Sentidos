import { database } from './conexionBD.js';
import { ref, set } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-database.js";
import UsuarioRegistradoService from './usuariosRegistradosService.js';

const formulario = document.getElementById('fieldset-registro').value;

const nombre = document.getElementById('nombre-usuario');
const apellido = document.getElementById('apellido');
const dni = document.getElementById('dni');
const celular = document.getElementById('celular');
const domicilio = document.getElementById('domicilio');
const contrasena = document.getElementById('contrasena');
const correoElectronico = document.getElementById('correo-electronico');


const nombreMensajeValidacion = document.getElementById('legend-nombre');
const apellidoMensajeValidacion = document.getElementById('legend-apellido');
const dniMensajeValidacion = document.getElementById('legend-dni');
const celularMensajeValidacion = document.getElementById('legend-celular');
const domicilioMensajeValidacion = document.getElementById('legend-domicilio');
const contrasenaMensajeValidacion = document.getElementById('legend-contrasena');
const correoElectronicoMensajeValidacion = document.getElementById('legend-correo-electronico');

const listaLegends = [nombreMensajeValidacion, apellidoMensajeValidacion, dniMensajeValidacion,
    celularMensajeValidacion, dniMensajeValidacion, contrasenaMensajeValidacion, correoElectronicoMensajeValidacion];

const botonRegistrarse = document.getElementById('boton-registrarse');

let nombreCorrecto = false;
let apellidoCorrecto = false;
let dniCorrecto = false;
let celularCorrecto = false;
let domicilioCorrecto = false;
let contrasenaCorrecto = false;
let correoElectronicoCorrecto = false;

function validarNombre(comprobarNombre) {
    const nombreValido = /^[A-ZÑ][a-zñ]{3,20}$/;
    if(nombreValido.test(comprobarNombre)) {
        console.log('nombre válido');
        console.log(nombre.value);
        nombreCorrecto = true;
    } else {
        console.log('nombre inválido');
        console.log(nombre.value);
        nombreMensajeValidacion.innerText = 'El nombre debe empezar con mayúscula y seguir con' 
        + 'minúsculas y tener entre 3 y 20 caracteres';
        nombreMensajeValidacion.style.color = 'red';
    }
}

function validarApellido(comprobarApellido) {
    const apellidoValido = /^[A-ZÑ][a-zñ]{3,20}$/;
    if(apellidoValido.test(comprobarApellido)) {
        console.log('apellido válido');
        console.log(apellido.value);
        apellidoCorrecto = true;
    } else {
        console.log('apellido inválido');
        console.log(apellido.value);
        apellidoMensajeValidacion.innerText = 'El apellido debe empezar con mayúscula y seguir con' 
        + 'minúsculas y tener entre 3 y 20 caracteres';
        apellidoMensajeValidacion.style.color = 'red';
    }
}

function validarDni(comprobarDni) {
    const dniValido = /^[0-9]{6,9}$/;
    if(dniValido.test(comprobarDni)) {
        console.log('dni válido');
        console.log(dni.value);
        dniCorrecto = true;
    } else {
        console.log('dni inválido');
        console.log(dni.value);
        dniMensajeValidacion.innerText = 'El DNI debe tener solo números y poseer ' 
        + 'entre 6 y 9 caracteres';
        dniMensajeValidacion.style.color = 'red';
    }
}

function validarCelular(comprobarCelular) {
    const celularValido = /^[0-9]{10,12}$/;
    if(celularValido.test(comprobarCelular)) {
        console.log('celular válido');
        console.log(celular.value);
        celularCorrecto = true;
    } else {
        console.log('celular inválido');
        console.log(celular.value);
        celularMensajeValidacion.innerText = 'El celular debe tener solo números y poseer ' 
        + 'entre 10 y 12 caracteres';
        celularMensajeValidacion.style.color = 'red';
    }
}

function validarDomicilio(comprobarDomicilio) {
    const DomicilioValido = /^[a-z0-9_\-\s]{6,20}$/i;
    if(DomicilioValido.test(comprobarDomicilio)) {
        console.log('domicilio válido');
        console.log(domicilio.value);
        domicilioCorrecto = true;
    } else {
        console.log('domicilio inválido');
        console.log(domicilio.value);
        domicilioMensajeValidacion.innerText = 'El domicilio debe tener ' 
        + 'entre 6 y 20 caracteres';
        domicilioMensajeValidacion.style.color = 'red';
    }
}

function validarContrasena(comprobarContrasena) {
    const nombreContrasena = /^[a-z0-9_\-!"#$%&/()=?¡¨*ñÑ]{8,20}$/i;
    if(nombreContrasena.test(comprobarContrasena)) {
        console.log('contrasena válida');
        console.log(contrasena.value);
        contrasenaCorrecto = true;
    } else {
        console.log('contrasena inválida');
        console.log(contrasena.value);
        contrasenaMensajeValidacion.innerText = 'La contraseña debe tener ' 
        + 'entre 8 y 20 caracteres';
        contrasenaMensajeValidacion.style.color = 'red';
    }
}

function validarCorreoElectronico(comprobarCorreoElectronico) {
    const correoElectronicoValido = /^[a-zñA-ZÑ0-9_]{3,20}@[a-zA-Z]{2,10}.com$/;
    if(correoElectronicoValido.test(comprobarCorreoElectronico)) {
        console.log('correo electrónico válido');
        console.log(correoElectronico.value);
        correoElectronicoCorrecto = true;
    } else {
        console.log('correo electrónico inválido');
        console.log(correoElectronico.value);
        correoElectronicoMensajeValidacion.innerText = 'El correo electrónico debe contener entre 3 y 20 caracteres ' 
        + 'antes del arroba y entre 2 y 10 caracteres antes del ".com"';
        correoElectronicoMensajeValidacion.style.color = 'red';
    }
}

botonRegistrarse.addEventListener('click', (evento) => {
    evento.preventDefault();
    listaLegends.forEach( mensaje => {
        mensaje.innerText = "*";
        mensaje.style.color = 'black';
    })
    validarNombre(nombre.value);
    validarApellido(apellido.value);
    validarDni(dni.value);
    validarCelular(celular.value);
    validarDomicilio(domicilio.value);
    validarContrasena(contrasena.value);
    validarCorreoElectronico(correoElectronico.value);
    if(nombreCorrecto && apellidoCorrecto &&
        dniCorrecto && celularCorrecto &&
        domicilioCorrecto && contrasenaCorrecto &&
        correoElectronicoCorrecto) {

        const registroUsuarios = new UsuarioRegistradoService;

        function agregarNuevoUsuario() {
            registroUsuarios.getCantidadUsuarioRegistrado()
                .then((cantidad) => {
                    console.log(cantidad + 1);
                    const actualizarCantidadUsuarios = ref(database, 'cantidadUsuarios');
                    set(actualizarCantidadUsuarios, cantidad + 1);

                    const newUserRef = ref(database, `usuarios/usuario${cantidad + 1}`);
                    console.log('usuario numero ' + (cantidad + 1) + ' agregado.');

                    const usuario = {
                        id: cantidad + 1,
                        nombre: nombre.value,
                        apellido: apellido.value,
                        dni: dni.value,
                        celular: celular.value,
                        domicilio: domicilio.value,
                        password: contrasena.value,
                        email: correoElectronico.value
                    };
                    
                    set(newUserRef, usuario);
                })
                .catch(error => console.log(error));
        }

        agregarNuevoUsuario();

        alert('usuario agregado');
    }
    nombreCorrecto = false;
    apellidoCorrecto = false;
    dniCorrecto = false;
    celularCorrecto = false;
    domicilioCorrecto = false;
    contrasenaCorrecto = false;
    correoElectronicoCorrecto = false;
});