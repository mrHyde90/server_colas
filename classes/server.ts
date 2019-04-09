import express from 'express';
import http from "http";
import {SERVER_PORT} from '../global/environment';
import socketIO from "socket.io";
import * as socket from '../sockets/socket';
class Server {
    private static _instance: Server;
    //La aplicacion
    public app: express.Application;
    //El servidor
    private httpServer: http.Server;
    //El puerto
    private port: number;
    //el socket
    private io: socketIO.Server;
    
    constructor(){
        this.app = express();
        this.port = SERVER_PORT;

        this.httpServer = new http.Server(this.app);
        this.io = socketIO(this.httpServer);
        this.escucharSockets();
    }

    escucharSockets(){
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
      })
    }

    public static get instance(){
		//regresa la instancia, si no se encuentra entonces el instance agarra la clase
		return this._instance || (this._instance = new this());
    }
    
    start(callback: Function){
		this.httpServer.listen(this.port, callback);
	}

}

export default Server;