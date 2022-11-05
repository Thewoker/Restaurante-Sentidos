import { database } from './conexionBD.js';
import { ref, onValue } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-database.js";

class MesaReservaService {
    constructor() {
        this.database = database;
        this.mesaReservaRef = ref(this.database, 'mesas');
    }

    getMesaReserva() {
        const promise = new Promise((resolve, reject) => {
            onValue(this.mesaReservaRef, (snapshot) => {
                const data = snapshot.val();
                resolve(data);
            }, {
                onlyOnce: true
            });
        });

        return promise;
    }
}

export default MesaReservaService;