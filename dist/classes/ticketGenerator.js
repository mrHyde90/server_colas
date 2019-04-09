"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TicketGenerator {
    constructor() {
        this.counter = 1;
    }
    static get instance() {
        //regresa la instancia, si no se encuentra entonces el instance agarra la clase
        return this._instance || (this._instance = new this());
    }
    generarTicket() {
        const ticketNuevo = {
            id: this.counter,
            sala: `sala-${this.counter % 4 + 1}`
        };
        this.incrementarCounter();
        return ticketNuevo;
    }
    getContador() {
        return this.counter;
    }
    incrementarCounter() {
        this.counter++;
    }
    reiniciarContador() {
        this.counter = 1;
    }
}
exports.default = TicketGenerator;
