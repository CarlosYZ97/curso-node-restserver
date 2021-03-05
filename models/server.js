const express = require('express');
var cors = require('cors');
const { dbConnection } = require('../database/config');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.middleware();
        this.routes();
        this.conectarDB();
    }

    async conectarDB() {
        await dbConnection();
    }

    //Middleware
    middleware() {

        this.app.use(cors());
        // Lectura y parseo del body
        this.app.use(express.json());
        this.app.use(express.static('public'));

    }

    routes() {

        this.app.use(this.usuariosPath, require('../routes/usuarios'));

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('El servidor está en el puerto', this.port);
        });
    }
}

module.exports = Server;