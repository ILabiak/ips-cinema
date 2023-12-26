import { useEffect, useState } from "react";
import { serverURL } from "../../constants";
import Order from "../../interfaces/order.interface";
import OrderList from "./Components/OrdersList";
import AddOrderForm from "./Components/AddOrderForm";
import { getFilms } from "../../services/films";
import Film from "../../interfaces/film.interface";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [films, setFilms] = useState<Film[]>([]);
  const url = `${serverURL}/orders`;

  useEffect(() => {
    const handleFetchOrders = async () => {
      const response: Response = await fetch(url);
      const data: Order[] = await response.json();
      setOrders(data.reverse());
    }

    handleFetchOrders();
    getFilms().then(films => setFilms(films));
  }, [url]);

  const addOrder = (order: Order): void => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(order),
    });
    setOrders(prevOrders => [order, ...prevOrders]);
  };

  const updateOrder = (id: number, data: Partial<Order> ) => {
    fetch(`${url}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data),
    });
  }

  const deleteOrder = (id: number): void => {
    fetch(`${url}/${id}`, {
      method: 'DELETE',
    });
    setOrders(orders.filter(order => order.id !== id));
  }

  return (
    <>
      <AddOrderForm addOrder={addOrder} films={films}/>
      <OrderList 
        orders={orders} 
        deleteOrder={deleteOrder} 
        updateOrder={updateOrder}
        films={films}
      />
    </>
  );
};