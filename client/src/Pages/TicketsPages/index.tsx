import { useEffect, useState } from "react";
import { serverURL } from "../../constants";
import Ticket from "../../interfaces/ticket.interface";
import TicketList from "./Components/TicketsList";
import AddTicketForm from "./Components/AddTicketForm";
import { getFilms } from "../../services/films";
import Film from "../../interfaces/film.interface";

export default function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [films, setFilms] = useState<Film[]>([]);
  const url = `${serverURL}/tickets`;

  useEffect(() => {
    const handleFetchTickets = async () => {
      const response: Response = await fetch(url);
      const data: Ticket[] = await response.json();
      setTickets(data.reverse());
    }

    handleFetchTickets();
    getFilms().then(films => setFilms(films));
  }, [url]);

  const addTicket = (ticket: Ticket): void => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(ticket),
    });
    setTickets(prevTickets => [ticket, ...prevTickets]);
  };

  const updateTicket = (id: string, data: Partial<Ticket> ) => {
    fetch(`${url}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data),
    });
  }

  const deleteTicket = (id: string): void => {
    fetch(`${url}/${id}`, {
      method: 'DELETE',
    });
    setTickets(tickets.filter(ticket => ticket._id !== id));
  }

  return (
    <>
      <AddTicketForm addTicket={addTicket} films={films}/>
      <TicketList 
        tickets={tickets} 
        deleteTicket={deleteTicket} 
        updateTicket={updateTicket}
        films={films}
      />
    </>
  );
};