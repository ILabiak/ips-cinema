import TicketItem from "./TicketItem";
import Ticket from "../../../interfaces/ticket.interface";
import Film from "../../../interfaces/film.interface";

interface TicketListProps {
  tickets: Ticket[],
  deleteTicket(id: string): void,
  updateTicket(id: string, data: Partial<Ticket>): void,
  films: Film[]
}

export default function TicketList(props: TicketListProps) {
  const { tickets, deleteTicket, updateTicket, films } = props;

  return (
    <ul className="list">{ 
        tickets.length ? 
        tickets.map((ticket) => (
          <TicketItem 
            key={ticket._id} 
            ticket={ticket} 
            onDelete={deleteTicket} 
            onUpdate={updateTicket} 
            films={films}
          />
        )) :
        <div className="list-empty">Квитків нема!</div>
      }
    </ul>
  );
};