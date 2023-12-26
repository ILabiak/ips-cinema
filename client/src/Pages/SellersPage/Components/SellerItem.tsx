import { useState, FormEvent, ChangeEvent } from "react";
import Seller from "../../../interfaces/seller.interface";

interface SellerItemProps {
  seller: Seller,
  onDelete(id: string): void,
  onUpdate(id: string, data: Partial<Seller>): void
};

export default function SellerItem (props: SellerItemProps) { 
  const { seller, onDelete, onUpdate } = props;
  const defaultFormData: Seller = {
    full_name: seller.full_name,
    age: seller.age,
    gender: seller.gender,
  };

  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [formData, setFormData] = useState<Seller>(defaultFormData);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsEditing(val => !val);
    let newData: Partial<Seller> = {};
    type F = keyof Seller;

    for (const key of Object.keys(formData) as F[]) {
      if (formData[key] !== defaultFormData[key]) {
        newData = {...newData, [key]: formData[key]};
      }
    }
    onUpdate(seller._id!, newData);
  };

  const handleReset = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsEditing(val => !val);
    setFormData(defaultFormData);
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleDeleteClick = () => {
    onDelete(seller._id!);
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
        <label htmlFor="seller_full_name">Продавець:</label>
        <input 
          type="text"
          id="seller_full_name"
          name="full_name"
          value={formData.full_name} 
          onChange={handleChange} 
          required
          disabled={!isEditing}
        />
      </div>
      <div className="row">
        <label htmlFor="seller_age">Вік:</label>
        <input 
          type="number" 
          id="seller_age"
          name="age"
          value={formData.age} 
          onChange={handleChange} 
          required
          disabled={!isEditing}
        />
      </div>
      <div className="row">
        <label htmlFor="seller_gender">Стать:</label>
        <input 
          type="text" 
          id="seller_gender"
          name="gender"
          value={formData.gender} 
          onChange={handleChange} 
          required
          disabled={!isEditing}
        />
      </div>
      { isEditing && <div className="row">
          <button type="submit">Оновити дані продавця</button>
          <button type="reset">Скасувати редагування</button>
        </div> 
      }
    </form>
  </li>
};