import { useEffect, useState } from "react";
import { serverURL } from "../../constants";
import Order from "../../interfaces/order.interface";
import OrderList from "./Components/OrdersList";
import AddOrderForm from "./Components/AddOrderForm";
import { getFilms } from "../../services/films";
import Film from "../../interfaces/film.interface";
import FilterForm from "./Components/FilterForm";
import Filter from "../../interfaces/filter.interface";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [films, setFilms] = useState<Film[]>([]);
  const [filters, setFilters] = useState<Filter[]>([]);

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

  const addFilter = (name: string, data: string) => {
    setFilters(prevFilters => [{name, data}, ...prevFilters]);
  }

  const deleteFilter = (name: string) => {
    setFilters(filters.filter(filt => filt.name !== name));
  }

  const hasFilter = (name: string): boolean => {
    return filters.some((filter) => filter.name === name);
  };

  return (
    <>
      <AddOrderForm addOrder={addOrder} films={films}/>
      <FilterForm 
        addFilter={addFilter} 
        deleteFilter={deleteFilter} 
        hasFilter={hasFilter}
      />
      <OrderList 
        orders={orders} 
        deleteOrder={deleteOrder} 
        updateOrder={updateOrder}
        films={films}
        filters={filters}
      />
    </>
  );
};