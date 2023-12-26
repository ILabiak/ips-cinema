import SellerItem from "./SellerItem";
import Seller from "../../../interfaces/seller.interface";

interface SellerListProps {
  sellers: Seller[],
  deleteSeller(id: string): void,
  updateSeller(id: string, data: Partial<Seller>): void,
}

export default function SellerList(props: SellerListProps) {
  const { sellers, deleteSeller, updateSeller } = props;

  return (
    <ul className="list">{ 
        sellers.length ? 
        sellers.map((seller) => (
          <SellerItem key={seller._id} seller={seller} onDelete={deleteSeller} onUpdate={updateSeller} />
        )) :
        <div className="list-empty">Продавців нема!</div>
      }
    </ul>
  );
};