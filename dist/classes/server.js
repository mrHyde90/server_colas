"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const environment_1 = require("../global/environment");
const socket_io_1 = __importDefault(require("socket.io"));
const socket = __importStar(require("../sockets/socket"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.port = environment_1.SERVER_PORT;
        this.httpServer = new http_1.default.Server(this.app);
        this.io = socket_io_1.default(this.httpServer);
        this.escucharSockets();
    }
    escucharSockets() {
        this.io.on("connection", cliente => {
            console.log("Escuchando sockets");
            //Obteniendo todos los tickets
            socket.obtener_tickets(cliente, this.io);
            // Socket addTicket
            socket.guardarTicket(cliente, this.io);
            //Obteniendo el siguietne ticket
            socket.obtener_ticket_sala(cliente, this.io);
            // siguiente ticket
            socket.nextTicket(cliente, this.io);
            // Escuchando todas las salas
            socket.nextSalas(cliente, this.io);
        });
    }
    static get instance() {
        //regresa la instancia, si no se encuentra entonces el instance agarra la clase
        return this._instance || (this._instance = new this());
    }
    start(callback) {
        this.httpServer.listen(this.port, callback);
    }
}
exports.default = Server;
