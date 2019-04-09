import Ticket from './ticket';
export default class TicketGenerator {
    private counter = 1;
    private static _instance: TicketGenerator;
    constructor(){}

    public static get instance(){
		//regresa la instancia, si no se encuentra entonces el instance agarra la clase
		return this._instance || (this._instance = new this());
    }

    generarTicket(){
        const ticketNuevo: Ticket = {
            id: this.counter,
            sala: `sala-${this.counter % 4 + 1}`
        };
        this.incrementarCounter();
        return ticketNuevo;
    }

    getContador(){
        return this.counter;
    }

    incrementarCounter(){
        this.counter++;
    }

    reiniciarContador(){
        this.counter = 1;
    }
}