import { database } from './conexionBD.js';
import { ref, onValue } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-database.js";

class UsuarioRegistradoService {
    constructor() {
        this.database = database;
        this.usuarioRegistradoRef = ref(this.database, 'usuarios');
        this.cantidadUsuarioRegistradoRef = ref(this.database, 'cantidadUsuarios');
    }

    getUsuarioRegistrado() {
        const promise = new Promise((resolve, reject) => {
            onValue(this.usuarioRegistradoRef, (snapshot) => {
                const data = snapshot.val();
                resolve(data);
            }, {
                onlyOnce: true
            });
        });

        return promise;
    }

    getCantidadUsuarioRegistrado() {
        const promise = new Promise((resolve, reject) => {
            onValue(this.cantidadUsuarioRegistradoRef, (snapshot) => {
                const data = snapshot.val();
                resolve(data);
            }, {
                onlyOnce: true
            });
        });

        return promise;
    }
}

export default UsuarioRegistradoService;