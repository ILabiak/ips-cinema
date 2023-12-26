import { useState, FormEvent, ChangeEvent } from "react";
import Ticket from "../../../interfaces/ticket.interface";
import Film from "../../../interfaces/film.interface";

interface TicketItemProps {
  ticket: Ticket,
  onDelete(id: string): void,
  onUpdate(id: string, data: Partial<Ticket>): void,
  films: Film[]
};

export default function TicketItem (props: TicketItemProps) { 
  const { ticket, onDelete, onUpdate, films } = props;
  const defaultFormData: Ticket = {
    date: ticket.date,
    seat: ticket.seat,
    time: ticket.time,
    film_id: ticket.film_id,
  };

  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [formData, setFormData] = useState<Ticket>(defaultFormData);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsEditing(val => !val);
    let newData: Partial<Ticket> = {};
    type F = keyof Ticket;

    for (const key of Object.keys(formData) as F[]) {
      if (formData[key] !== defaultFormData[key]) {
        newData = {...newData, [key]: formData[key]};
      }
    }
    onUpdate(ticket._id!, newData);
  };

  const handleReset = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsEditing(val => !val);
    setFormData(defaultFormData);
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleDeleteClick = () => {
    onDelete(ticket._id!);
  };

  const handleEditlick = () => {
    setIsEditing(val => !val);
  }

  return <li className="item">
    <form className="" onSubmit={handleSubmit} onReset={handleReset}>
      { !isEditing && <div className="row">
        <button type="button" onClick={handleEditlick}>&#x270E;</button>
        <button type="button" onClick={handleDeleteClick}>&#10006;</button>
        </div> }
      <div className="row">
        <label htmlFor="ticket_date">Дата сеансу:</label>
        <input 
          type="date"
          id="ticket_date"
          name="date"
          value={formData.date} 
          onChange={handleChange} 
          required
          disabled={!isEditing}
        />
      </div>
      <div className="row">
        <label htmlFor="ticket_seat">Місце в кінотеатрі:</label>
        <input 
          type="number" 
          id="ticket_seat"
          name="seat"
          value={formData.seat} 
          onChange={handleChange} 
          required
          disabled={!isEditing}
        />
      </div>
      <div className="row">
        <label htmlFor="ticket_time">Час сеансу:</label>
        <input 
          type="time" 
          id="ticket_time"
          name="time"
          value={formData.time} 
          onChange={handleChange} 
          required
          disabled={!isEditing}
        />
      </div>
      <div className="row">
        <label htmlFor="ticket_film_id">Назва фільму:</label>
        <select 
          className="add-input"  
          name="film_id" 
          id="ticket_film_id"
          value={formData.film_id} 
          onChange={handleChange}
          required
          disabled={!isEditing}
        >
          {films?.map(film => <option value={film._id}>{film.title}</option>)}
        </select>
      </div>
      { isEditing && <div className="row">
          <button type="submit">Оновити дані квитка</button>
          <button type="reset">Скасувати редагування</button>
        </div> 
      }
    </form>
  </li>
};