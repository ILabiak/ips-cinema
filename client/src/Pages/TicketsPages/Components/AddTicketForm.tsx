import { useState, FormEvent, ChangeEvent } from "react";

import Film from "../../../interfaces/film.interface";
import Ticket from "../../../interfaces/ticket.interface";

interface AddTicketFormProps {
  addTicket(ticket: Ticket): void,
  films: Film[]
}

export default function AddTicketForm(props: AddTicketFormProps) {
  const { addTicket, films } = props;
  const defaultFormData: Ticket = {
    date: '',
    seat: 0,
    time: '',
    film_id: '',
  };
  const [formData, setFormData] = useState<Ticket>(defaultFormData);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTicket(formData);
    setFormData(defaultFormData);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };


  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <div className="add-field">
       <input 
          className="add-input" 
          type="date" 
          placeholder="Введіть дату сеансу"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <input 
          className="add-input" 
          type="number" 
          placeholder="Введіть міце в кінотеатрі"
          name="seat"
          value={formData.seat ? formData.seat : ''}
          onChange={handleChange}
          required
        />
      </div>
      <div className="add-field">
        <input 
          className="add-input" 
          type="time" 
          placeholder="Введіть час сеансу"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        />
        <select 
          className="add-input"  
          name="film_id" 
          value={formData.film_id}
          onChange={handleChange}
          required
        >
          <option value="" disabled selected>Виберіть фільм</option>
          {films?.map(film => <option value={film._id}>{film.title}</option>)}
        </select>
      </div>
      <button type="submit" className="add-button">Додати квиток</button>
    </form>
  );
};
