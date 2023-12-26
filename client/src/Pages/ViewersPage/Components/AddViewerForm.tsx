import { useState, FormEvent, ChangeEvent } from "react";

import Viewer from "../../../interfaces/viewer.interface";

interface AddViewerFormProps {
  addViewer(viewer: Viewer): void
}

export default function AddViewerForm(props: AddViewerFormProps) {
  const { addViewer } = props;
  const defaultFormData: Viewer = {
    full_name: '',
    age: 0,
    gender: '',
  };
  const [formData, setFormData] = useState<Viewer>(defaultFormData);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addViewer(formData);
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
          name="full_name"
          value={formData.full_name}
          onChange={handleChange}
          required
        />
        <input 
          className="add-input" 
          type="number" 
          placeholder="Введіть вік продавця"
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
