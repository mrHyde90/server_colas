export default class Ticket {
    public id: number;
    public sala: string;
    constructor(id: number, sala: string){
        this.id = id;
        this.sala = sala;
    }
}