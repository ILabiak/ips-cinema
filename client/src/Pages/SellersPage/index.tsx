import { useEffect, useState } from "react";
import { serverURL } from "../../constants";
import Seller from "../../interfaces/seller.interface";
import SellerList from "./Components/SellersList";
import AddSellerForm from "./Components/AddSelletForm";

export default function SellersPage() {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const url = `${serverURL}/sellers`;

  useEffect(() => {
    const handleFetchSellers = async () => {
      const response: Response = await fetch(url);
      const data: Seller[] = await response.json();
      setSellers(data.reverse());
    }

    handleFetchSellers();
  }, [url]);

  const addSeller = (seller: Seller): void => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(seller),
    });
    setSellers(prevSellers => [seller, ...prevSellers]);
  };

  const updateSeller = (id: string, data: Partial<Seller> ) => {
    fetch(`${url}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data),
    });
  }

  const deleteSeller = (id: string): void => {
    fetch(`${url}/${id}`, {
      method: 'DELETE',
    });
    setSellers(sellers.filter(seller => seller._id !== id));
  }

  return (
    <>
      <AddSellerForm addSeller={addSeller} />
      <SellerList sellers={sellers} deleteSeller={deleteSeller} updateSeller={updateSeller}/>
    </>
  );
};