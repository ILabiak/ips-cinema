import { useState, FormEvent, ChangeEvent } from "react";

import Seller from "../../../interfaces/seller.interface";

interface AddSellerFormProps {
  addSeller(seller: Seller): void
}

export default function AddSellerForm(props: AddSellerFormProps) {
  const { addSeller } = props;
  const defaultFormData: Seller = {
    full_name: '',
    age: 0,
    gender: '',
  };
  const [formData, setFormData] = useState<Seller>(defaultFormData);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addSeller(formData);
    setFormData(defaultFormData);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };


  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <div className="add-field">
       <input 
          className="add-input" 
          type="text" 
          placeholder="Введіть ім'я та прізвище продавці"
          id="full_name"
          name="full_name"
          value={formData.full_name}
          onChange={handleChange}
          required
        />
        <input 
          className="add-input" 
          type="text" 
          placeholder="Введіть вік продавця"
          id="age"
          name="age"
          value={formData.age ? formData.age : ''}
          onChange={handleChange}
          required
        />
      </div>
      <div className="add-field">
        <input 
          className="add-input" 
          type="text" 
          placeholder="Введіть стать продавця"
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="add-button">Додати продавця</button>
    </form>
  );
};
