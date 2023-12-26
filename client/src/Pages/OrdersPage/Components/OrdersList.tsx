import OrderItem from "./OrderItem";
import Order from "../../../interfaces/order.interface";
import Film from "../../../interfaces/film.interface";

interface OrderListProps {
  orders: Order[],
  deleteOrder(id: number): void,
  updateOrder(id: number, data: Partial<Order>): void,
  films: Film[]
}

export default function OrderList(props: OrderListProps) {
  const { orders, deleteOrder, updateOrder, films } = props;

  return (
    <ul className="list">{ 
        orders.length ? 
        orders.map((order) => (
          <OrderItem 
            key={order.id} 
            order={order} 
            onDelete={deleteOrder} 
            onUpdate={updateOrder} 
            films={films}
          />
        )) :
        <div className="list-empty">Квитків нема!</div>
      }
    </ul>
  );
};