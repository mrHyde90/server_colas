"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ticket_1 = __importDefault(require("./ticket"));
class TicketLista {
    constructor() {
        this.tickets = [];
    }
    getTickets() {
        return this.tickets.slice();
    }
    addTicket(id, sala) {
        const newTicket = new ticket_1.default(id, sala);
        this.tickets.push(newTicket);
    }
    deleteTicket(id) {
        this.tickets = this.tickets.filter(ticket => ticket.id !== id);
    }
    getSalas(sala) {
        return this.tickets.filter(ticket => ticket.sala === sala);
    }
    nextSala(sala) {
        const ticketSala = this.getSalas(sala);
        if (!Array.isArray(ticketSala) || !ticketSala.length) {
            // array does not exist, is not an array, or is empty
            return new ticket_1.default(0, "");
        }
        return ticketSala[0];
    }
    nextSalas() {
        const sala1 = this.nextSala("sala-1");
        const sala2 = this.nextSala("sala-2");
        const sala3 = this.nextSala("sala-3");
        const sala4 = this.nextSala("sala-4");
        const allSalas = {
            sala1,
            sala2,
            sala3,
            sala4
        };
        return allSalas;
    }
}
exports.default = TicketLista;
