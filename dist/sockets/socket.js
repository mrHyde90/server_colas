"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ticketLista_1 = __importDefault(require("../classes/ticketLista"));
const ticketGenerator_1 = __importDefault(require("../classes/ticketGenerator"));
// Creating the list and fill it
exports.ticketList = new ticketLista_1.default();
const dummyData = [
    { id: 99, sala: "sala-1" },
    { id: 100, sala: "sala-2" },
    { id: 101, sala: "sala-3" },
    { id: 102, sala: "sala-4" }
];
exports.ticketList.tickets.push(...dummyData);
const generador = ticketGenerator_1.default.instance;
exports.obtener_tickets = (cliente, io) => {
    cliente.on("obtener-tickets", () => {
        console.log("Obteniendo todos los tickets");
        //Se lo emite a todos
        //Se lo emite solo al cleinte, unicamente a la persona que se esta conectando
        io.to(cliente.id).emit('tickets-activos', exports.ticketList.getTickets());
    });
};
exports.obtener_ticket_sala = (cliente, io) => {
    cliente.on("obtener-ticket", (payload) => {
        const ticketSala = exports.ticketList.nextSala(payload.sala);
        console.log(payload.sala);
        io.to(cliente.id).emit("ticket-sala", ticketSala);
    });
};
exports.guardarTicket = (cliente, io) => {
    cliente.on("guardar-ticket", () => {
        console.log("Guardando ticket");
        //Se genera el nuevo ticket
        const nuevoTicket = generador.generarTicket();
        // agregamos nuestro nuevo ticket
        exports.ticketList.addTicket(nuevoTicket.id, nuevoTicket.sala);
        // Emitimos nuestro nuevo ticket para que sea escuchado
        io.emit("ticket-nuevo", nuevoTicket);
    });
};
exports.nextTicket = (cliente, io) => {
    cliente.on("next-ticket", (payload) => {
        exports.ticketList.deleteTicket(payload.id);
        const ticketSala = exports.ticketList.nextSala(payload.sala);
        io.emit("ticket-sala", ticketSala);
    });
};
exports.nextSalas = (cliente, io) => {
    cliente.on("next-salas", () => {
        const salas = exports.ticketList.nextSalas();
        io.emit("listen-salas", salas);
    });
};
