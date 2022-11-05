import MesaReservaService from "./reservasMesasService.js";

let mesaReservaService = new MesaReservaService();

//getMesaReserva();

function getMesaReserva() {
    mesaReservaService.getMesaReserva()
        .then((mesas) => {
            showMesas(mesas);
        })
        .catch(error => console.log(error));
}

function showMesas(mesas) {
    let mesasArray = Object.keys(mesas).map((key) => mesas[key]);

    console.log(mesasArray);

    /* mesasArray.forEach(mesa => {
        console.log(mesa);
    }) */
}