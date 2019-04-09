import {Socket} from 'socket.io';
import socketIO from "socket.io";
import TicketLista from '../classes/ticketLista';
import Ticket from '../classes/ticket';
import TicketGenerator from '../classes/ticketGenerator';

// Creating the list and fill it
export const ticketList = new TicketLista();
const dummyData: Ticket[] = [
    {id: 99, sala: "sala-1"},
    {id: 100, sala: "sala-2"},
    {id: 101, sala: "sala-3"},
    {id: 102, sala: "sala-4"}
];
ticketList.tickets.push( ...dummyData);

const generador = TicketGenerator.instance;

export const obtener_tickets = (cliente: Socket, io: socketIO.Server) => {
	cliente.on("obtener-tickets", () => {
        console.log("Obteniendo todos los tickets");
		//Se lo emite a todos
		//Se lo emite solo al cleinte, unicamente a la persona que se esta conectando
		io.to(cliente.id).emit('tickets-activos', ticketList.getTickets());
	})
}

export const obtener_ticket_sala = (cliente: Socket, io: socketIO.Server) => {
    cliente.on("obtener-ticket", (payload: {sala: string}) => {
        const ticketSala = ticketList.nextSala(payload.sala);
        console.log(payload.sala);
        io.to(cliente.id).emit("ticket-sala", ticketSala);
    })
}

export const guardarTicket = (cliente: Socket, io: socketIO.Server) =>{
    cliente.on("guardar-ticket", () => {
        console.log("Guardando ticket");
        //Se genera el nuevo ticket
        const nuevoTicket = generador.generarTicket();
        // agregamos nuestro nuevo ticket
        ticketList.addTicket(nuevoTicket.id, nuevoTicket.sala);
        // Emitimos nuestro nuevo ticket para que sea escuchado
        io.emit("ticket-nuevo", nuevoTicket);
    })
}

export const nextTicket = (cliente: Socket, io: socketIO.Server) => {
    cliente.on("next-ticket", (payload: {id: number, sala: string}) => {
        ticketList.deleteTicket(payload.id);
        const ticketSala = ticketList.nextSala(payload.sala);
        io.emit("ticket-sala", ticketSala);
    })
}

export const nextSalas = (cliente: Socket, io: socketIO.Server) => {
    cliente.on("next-salas", () => {
        const salas = ticketList.nextSalas();
        io.emit("listen-salas", salas);
    })
}