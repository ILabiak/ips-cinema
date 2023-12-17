import Seller from "../../../interfaces/seller.interface";

interface SellerItemProps {
  seller: Seller,
  onDelete(id: string): void,
};

export default function SellerItem (props: SellerItemProps) { 
  const { seller, onDelete } = props;

  const handleClick = () => {
    onDelete(seller._id!);
  };

  return <li className="item">
    <ul>
      <li className="item-text">Продавець: {seller.full_name}</li>
      <li className="item-text">Вік: {seller.age} </li>
      <li className="item-text">Стать: {seller.gender} </li>
    </ul>
    <button type="button" onClick={handleClick}>&#10006;</button>
  </li>
};