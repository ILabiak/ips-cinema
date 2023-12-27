import OrderItem from "./OrderItem";
import Order from "../../../interfaces/order.interface";
import Film from "../../../interfaces/film.interface";
import Filter from "../../../interfaces/filter.interface";
import { useEffect, useState } from "react";
import { getTickets } from "../../../services/tickets";
import { getViewers } from "../../../services/viewers";

interface OrderListProps {
  orders: Order[],
  deleteOrder(id: number): void,
  updateOrder(id: number, data: Partial<Order>): void,
  films: Film[],
  filters: Filter[],
}

export default function OrderList(props: OrderListProps) {
  const { orders, deleteOrder, updateOrder, films, filters } = props;
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);

  useEffect(() => {
    const filterByDate = filters.find(filt => filt.name === 'byDate')?.data;
    const filterByViewer = filters.find(filt => filt.name === 'byViewer')?.data;

    const fetchData = async () => {
      const tickets = await getTickets();
      const viewers = await getViewers();

      setFilteredOrders(orders.filter(order => {
        if (filterByDate) {
          const ticket = tickets.find(ticket => ticket._id === order.ticket_id)!;
          return ticket.date === filterByDate;
        }
        if (filterByViewer) {
          const viewer = viewers.find(viewer => viewer._id === order.viewer_id)!;
          console.log(viewer.full_name === filterByDate)
          return viewer.full_name === filterByViewer;
        }
        return order;
      }))
    }
    fetchData();
    }, [filters, orders]);
  
  return (
    <ul className="list">{filteredOrders.length}{ 
      filteredOrders.length ? 
        filteredOrders
          .map((order) => (
            <OrderItem 
              key={order.id} 
              order={order} 
              onDelete={deleteOrder} 
              onUpdate={updateOrder} 
              films={films}
            />
        )) :
        <div className="list-empty">Замовлень нема!</div>
      }
    </ul>
  );
};