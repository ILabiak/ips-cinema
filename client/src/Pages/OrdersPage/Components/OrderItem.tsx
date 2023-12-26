import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import Order from "../../../interfaces/order.interface";
import Film from "../../../interfaces/film.interface";
import { getViewers } from "../../../services/viewers";
import Viewer from "../../../interfaces/viewer.interface";
import { getTickets } from "../../../services/tickets";
import Ticket from "../../../interfaces/ticket.interface";

interface OrderItemProps {
  order: Order,
  onDelete(id: number): void,
  onUpdate(id: number, data: Partial<Order>): void,
  films: Film[]
};

export default function OrderItem (props: OrderItemProps) { 
  const { order, onDelete, onUpdate, films } = props;
  const defaultFormData: Order = {
    ticket_id: order.ticket_id,
    viewer_id: order.viewer_id,
  };

  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [formData, setFormData] = useState<Order>(defaultFormData);
  const [viewers, setViewers] = useState<Viewer[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const viewers = await getViewers();
      const tickets = await getTickets()
      setTickets(tickets);
      setViewers(viewers);
    }

    fetchData();
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsEditing(val => !val);
    let newData: Partial<Order> = {};
    type F = keyof Order;

    for (const key of Object.keys(formData) as F[]) {
      if (formData[key] !== defaultFormData[key]) {
        newData = {...newData, [key]: formData[key]};
      }
    }
    onUpdate(order.id!, newData);
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
    onDelete(order.id!);
  };

  const handleEditlick = () => {
    setIsEditing(val => !val);
  }

  const getFilmTitle = (id: string) => {
    const film: Film | undefined = films.find(film => film._id === id); 
    return film?.title;
  }

  return <li className="item">
    <form className="" onSubmit={handleSubmit} onReset={handleReset}>
      { !isEditing && <div className="row">
        <button type="button" onClick={handleEditlick}>&#x270E;</button>
        <button type="button" onClick={handleDeleteClick}>&#10006;</button>
        </div> }     
      <div className="row">
        <label htmlFor="order_viewer_id">Глядач:</label>
        <select 
          className="add-input"  
          name="viewer_id" 
          id="order_viewer_id"
          value={formData.viewer_id} 
          onChange={handleChange}
          required
          disabled={!isEditing}
        >
          {viewers?.map(viewer => <option value={viewer._id}>{viewer.full_name}</option>)}
        </select>
      </div>
      <div className="row">
        <label htmlFor="order_ticket_id">Квиток</label>
          <select 
            className="add-input"  
            name="ticket_id" 
            id="order_ticket_id"
            value={formData.ticket_id} 
            onChange={handleChange}
            required
            disabled={!isEditing}
          >
            {tickets?.map(ticket => <option value={ticket._id}>
              {`${getFilmTitle(ticket.film_id!)} ${ticket.date} ${ticket.time}`}
            </option>)}
          </select>
      </div>
      { isEditing && <div className="row">
          <button type="submit">Оновити дані замовлення</button>
          <button type="reset">Скасувати редагування</button>
        </div> 
      }
    </form>
  </li>
};