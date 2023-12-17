import SellerItem from "./SellerItem";
import Seller from "../../../interfaces/seller.interface";

interface SellerListProps {
  sellers: Seller[],
  deleteSeller(id: string): void,
}

export default function SellerList(props: SellerListProps) {
  const { sellers, deleteSeller } = props;

  return (
    <ul className="list">{ 
        sellers.length ? 
        sellers.map((seller) => <SellerItem key={seller._id} seller={seller} onDelete={deleteSeller} />) :
        <div className="list-empty">Продавців нема!</div>
      }
    </ul>
  );
};