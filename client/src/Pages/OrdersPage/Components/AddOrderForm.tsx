import { useState, FormEvent, ChangeEvent, useEffect } from "react";

import Film from "../../../interfaces/film.interface";
import Order from "../../../interfaces/order.interface";
import Viewer from "../../../interfaces/viewer.interface";
import { getViewers } from "../../../services/viewers";
import Ticket from "../../../interfaces/ticket.interface";
import { getTickets } from "../../../services/tickets";

interface AddOrderFormProps {
  addOrder(order: Order): void,
  films: Film[]
}

export default function AddOrderForm(props: AddOrderFormProps) {
  const { addOrder, films } = props;
  const defaultFormData: Order = {
    ticket_id: '',
    viewer_id: '',
  };
  const [formData, setFormData] = useState<Order>(defaultFormData);
  const [viewers, setViewers] = useState<Viewer[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    getViewers().then(viewers => setViewers(viewers));
    getTickets().then(tickets => setTickets(tickets));
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addOrder(formData);
    setFormData(defaultFormData);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const getFilmTitle = (id: string) => {
    const film: Film | undefined = films.find(film => film._id === id); 
    return film?.title;
  }


  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <div className="add-field">
        <select 
          className="add-input"  
          name="viewer_id" 
          value={formData.viewer_id}
          onChange={handleChange}
          required
        >
          <option value="" disabled selected>Виберіть глядача</option>
          {viewers?.map(viewer => <option value={viewer._id}>{viewer.full_name}</option>)}
        </select>
        <select 
          className="add-input"  
          name="ticket_id" 
          value={formData.ticket_id}
          onChange={handleChange}
          required
        >
          <option value="" disabled selected>Виберіть квиток</option>
          {tickets?.map(ticket => <option value={ticket._id}>
            {`${getFilmTitle(ticket.film_id!)} ${ticket.date} ${ticket.time}`}
          </option>)}
        </select>
      </div>
      <button type="submit" className="add-button">Додати квиток</button>
    </form>
  );
};
