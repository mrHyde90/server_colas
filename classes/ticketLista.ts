import Ticket from './ticket';
export default class TicketLista {
    public tickets: Ticket[] = [];

    constructor(){}

    getTickets(){
        return this.tickets.slice();
    }

    addTicket(id: number, sala: string){
        const newTicket = new Ticket(id, sala);
        this.tickets.push(newTicket);
    }

    deleteTicket(id: number){
        this.tickets = this.tickets.filter(ticket => ticket.id !== id);
    }

    getSalas(sala: string){
        return  this.tickets.filter(ticket => ticket.sala === sala);
    }

    nextSala(sala: string){
        const ticketSala = this.getSalas(sala);

        if (!Array.isArray(ticketSala) || !ticketSala.length) {
            // array does not exist, is not an array, or is empty
            return new Ticket(0, "");
          }
        return ticketSala[0];
    }

    nextSalas(){
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