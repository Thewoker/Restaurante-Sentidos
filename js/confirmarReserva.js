import MesaReservaService from './reservasMesasService.js';
import UsuarioRegistradoService from './usuariosRegistradosService.js';
import { database } from './conexionBD.js';
import { ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-database.js";

if(sessionStorage.getItem('usuario') == null) {
    alert('Por favor inicie sesión o regístrese si previamente no lo ha hecho.');
    location.href = 'ingresar.html';
}

if(sessionStorage.getItem('mesa') == null) {
    alert('Por favor seleccione una mesa si previamente no lo ha hecho para realizar su reserva.');
    location.href = 'reservas.html';
}

const inputFechaReserva = document.getElementById('fecha-reserva');
const botonReserva = document.getElementById('confirmar-reserva');

const consultarReserva = new MesaReservaService;

function actualizarEstadoReservasDisponibles(fechaDeReserva) {
    consultarReserva.getMesaReserva()
    .then((mesas) => {

        const fechaYMesaDisponible = mesas[`mesa${sessionStorage.getItem('mesa')}`]['disponible'][inputFechaReserva.value];
        const refMesaYFecha = ref(database, `mesas/mesa${sessionStorage.getItem('mesa')}/disponible/${inputFechaReserva.value}`);

        if(fechaYMesaDisponible) {
            set(refMesaYFecha, false);
            agregarReservaAUsuarioSolicitante(`mesa${sessionStorage.getItem('mesa')}: ${inputFechaReserva.value}, reservado el ${fechaDeReserva}`);
        } else {
            alert('Esta mesa ya se encuentra reservada en esta misma fecha, por favor pruebe en otra fecha.');
        }
    })
    .catch(error => console.log(error));
}

const usuarioSolicitante = new UsuarioRegistradoService;

var permisoPagoAutomatico = false;

function agregarReservaAUsuarioSolicitante(reserva) {
    usuarioSolicitante.getUsuarioRegistrado()
    .then((usuarios) => {
        permisoPagoAutomatico = false;

        const usuarioConNuevaReserva = usuarios[`usuario${sessionStorage.getItem('usuario')}`];

        const regExFechaDeReservaRealizada = /.{2}$/;
        let fechaDeReservaRealizada = regExFechaDeReservaRealizada.exec(reserva);
        console.log('Fecha de realización de la reserva: ' + fechaDeReservaRealizada[0]);
        
        const regExFechaYMesaDeReserva = /mesa.{13}/;
        let fechaYMesaDeReserva = regExFechaYMesaDeReserva.exec(reserva);
        
        const regExFechaDeReserva = /.{2}$/;
        let fechaDeReserva = regExFechaDeReserva.exec(fechaYMesaDeReserva[0]);
        console.log('Fecha de la reserva: ' + fechaDeReserva[0]);

        function reservaPagadaAutomaticamente(reservaRecibida) {
            if(usuarioConNuevaReserva.reservasPagadas == undefined) {
                usuarioConNuevaReserva.reservasPagadas = [];
                usuarioConNuevaReserva.reservasPagadas.push(reservaRecibida);
            } else {
                usuarioConNuevaReserva.reservasPagadas.push(reservaRecibida);
            }

            console.log("Objeto usuario a actualizar: ");
            console.log(usuarioConNuevaReserva);
    
            const refUsuarioQueHaReservado = ref(database, `usuarios/usuario${sessionStorage.getItem('usuario')}`);
            set(refUsuarioQueHaReservado, usuarioConNuevaReserva);
            alert('Reserva agendada y pagada automáticamente.');
        }

        if(fechaDeReservaRealizada[0][0] == '0') {
            if(fechaDeReserva[0][0] == '0') {
                if(parseInt(fechaDeReservaRealizada[0][1]) + 1 == parseInt(fechaDeReserva[0][1])) {
                    //Pago automático
                    aumentarCantidadIngresosPorReservas();
                    permisoPagoAutomatico = true;
                    reservaPagadaAutomaticamente(reserva);
                }
            } else if(parseInt(fechaDeReservaRealizada[0][1]) + 1 == parseInt(fechaDeReserva[0])) {
                //Pago automático
                    aumentarCantidadIngresosPorReservas();
                    permisoPagoAutomatico = true;
                    reservaPagadaAutomaticamente(reserva);
            }
        } else {
            if(fechaDeReserva[0][0] == '0') {
                if(parseInt(fechaDeReservaRealizada[0]) + 1 == parseInt(fechaDeReserva[0][1])) {
                    //Pago automático
                    aumentarCantidadIngresosPorReservas();
                    permisoPagoAutomatico = true;
                    reservaPagadaAutomaticamente(reserva);
                }
            } else if(parseInt(fechaDeReservaRealizada[0]) + 1 == parseInt(fechaDeReserva[0])) {
                //Pago automático
                    aumentarCantidadIngresosPorReservas();
                    permisoPagoAutomatico = true;
                    reservaPagadaAutomaticamente(reserva);
            }
        }

        if(!permisoPagoAutomatico) {
            if(usuarioConNuevaReserva.reservasSinPagar == undefined) {
                usuarioConNuevaReserva.reservasSinPagar = [];
                usuarioConNuevaReserva.reservasSinPagar.push(reserva);
            } else {
                usuarioConNuevaReserva.reservasSinPagar.push(reserva);
            }
    
            console.log("Objeto usuario a actualizar: ");
            console.log(usuarioConNuevaReserva);
    
            const refUsuarioQueHaReservado = ref(database, `usuarios/usuario${sessionStorage.getItem('usuario')}`);
            set(refUsuarioQueHaReservado, usuarioConNuevaReserva);
            alert('Reserva agendada.');
        }
    })
    .catch(error => console.log(error));
};

botonReserva.addEventListener('click', (evento) => {
    evento.preventDefault();

    let fechaActual = new Date();
    console.log(inputFechaReserva.value);
    const regExDias = /\d{2}/.exec(fechaActual);
    let mes = '';
    if(fechaActual.getMonth() + 1 < 10) {
        mes = '0';
        mes += fechaActual.getMonth() + 1;
    } else {
        mes += fechaActual.getMonth() + 1;
    }
    fechaActual = fechaActual.getFullYear() + '-' + mes + '-' + regExDias[0];
    console.log(fechaActual);

    if(inputFechaReserva.value == '') {
        alert('Por favor use una fecha válida, puede utilizar el ícono de calendario al extremo derecho de la barra donde debe ingresar la fecha.');
    }

    let fechaIngresada = inputFechaReserva.value;
    
    console.log(inputFechaReserva.value);
    console.log('reserva el mes: ' + fechaIngresada[5] + fechaIngresada[6] + ' y dia: ' + fechaIngresada[8] + fechaIngresada[9]);

    if(fechaIngresada[5] == '0') {
        if(fechaIngresada[6] < fechaActual[6] || fechaIngresada[6] > parseInt(fechaActual[6]) + 1) {
            console.log('fallo'); 
            alert('No se puede realizar reservas antes de mañana o después de un mes de la fecha actual.');
        } else {
            if(fechaIngresada[8] == '0') {
                if(fechaIngresada[9] > fechaActual[9]) {
                    console.log('fallo');
                   actualizarEstadoReservasDisponibles(fechaActual);
                   console.log('estado disponible cambia a false.'); 
                } else if(fechaIngresada[9] <= fechaActual[9] && fechaIngresada[6] == parseInt(fechaActual[6]) + 1) {
                    console.log('fallo');
                    actualizarEstadoReservasDisponibles(fechaActual);
                    console.log('estado disponible cambia a false.');
                } else {
                    console.log('fallo'); 
                    alert('No se puede realizar reservas antes de mañana o después de un mes de la fecha actual.');
                }
            } else {
                if(parseInt(fechaIngresada[8] + fechaIngresada[9]) > parseInt(fechaActual[8] + fechaActual[9])) {
                    console.log('fallo');
                    actualizarEstadoReservasDisponibles(fechaActual);
                    console.log('estado disponible cambia a false.'); 
                 } else if(parseInt(fechaIngresada[8] + fechaIngresada[9]) <= parseInt(fechaActual[8] + fechaActual[9]) 
                    && fechaIngresada[6] == parseInt(fechaActual[6]) + 1) {
                    console.log('fallo');
                     actualizarEstadoReservasDisponibles(fechaActual);
                     console.log('estado disponible cambia a false.');
                 } else {
                    console.log('fallo'); 
                    alert('No se puede realizar reservas antes de mañana o después de un mes de la fecha actual.');
                 }
            }
        }
    } else {
        if(parseInt(fechaIngresada[5] + fechaIngresada[6]) < parseInt(fechaActual[5] + fechaActual[6]) 
            || parseInt(fechaIngresada[5] + fechaIngresada[6]) > parseInt(fechaActual[5] + fechaActual[6]) + 1) {
            console.log('fallo'); 
            alert('No se puede realizar reservas antes de mañana o después de un mes de la fecha actual.');
        } else {
            if(fechaIngresada[8] == '0') {
                if(fechaIngresada[9] > fechaActual[9]) {
                    console.log('fallo');
                   actualizarEstadoReservasDisponibles(fechaActual);
                   console.log('estado disponible cambia a false.'); 
                } else if(fechaIngresada[9] <= fechaActual[9] 
                    && parseInt(fechaIngresada[5] + fechaIngresada[6]) == parseInt(fechaActual[5] + fechaActual[6]) + 1) {
                    console.log('fallo');
                    actualizarEstadoReservasDisponibles(fechaActual);
                    console.log('estado disponible cambia a false.');
                } else {
                    console.log('fallo'); 
                    alert('No se puede realizar reservas antes de mañana o después de un mes de la fecha actual.');
                }
            } else {
                if(parseInt(fechaIngresada[8] + fechaIngresada[9]) < parseInt(fechaActual[8] + fechaActual[9])) {
                    console.log('fallo');
                    actualizarEstadoReservasDisponibles(fechaActual);
                    console.log('estado disponible cambia a false.'); 
                 } else if(parseInt(fechaIngresada[8] + fechaIngresada[9]) <= parseInt(fechaActual[8] + fechaActual[9]) 
                    && parseInt(fechaIngresada[5] + fechaIngresada[6]) == parseInt(fechaActual[5] + fechaActual[6]) + 1) {
                    console.log('fallo');
                     actualizarEstadoReservasDisponibles(fechaActual);
                     console.log('estado disponible cambia a false.');
                 } else {
                    console.log('fallo'); 
                     alert('No se puede realizar reservas antes de mañana o después de un mes de la fecha actual.');
                 }
            }
        }
    }
});

//Se consulta los ingresos totales por reservas para acumularlos

const refIngresosTotalesReservas = ref(database, 'ingresosTotalesPorReservas');

function getIngresosTotalesPorReservas() {
    const promise = new Promise((resolve, reject) => {
        onValue(refIngresosTotalesReservas, (snapshot) => {
            const data = snapshot.val();
            resolve(data);
        }, {
            onlyOnce: true
        });
    });

    return promise;
}

function aumentarCantidadIngresosPorReservas() {
    getIngresosTotalesPorReservas()
        .then(ingresosTotales => {

            let acumulacionIngresos = ingresosTotales;
            acumulacionIngresos += 500;
            set(refIngresosTotalesReservas, acumulacionIngresos);
        })
        .catch(error => {console.log(error)});
}