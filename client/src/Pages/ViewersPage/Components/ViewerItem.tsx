import { useState, FormEvent, ChangeEvent } from "react";
import Viewer from "../../../interfaces/viewer.interface";

interface ViewerItemProps {
  viewer: Viewer,
  onDelete(id: string): void,
  onUpdate(id: string, data: Partial<Viewer>): void
};

export default function ViewerItem (props: ViewerItemProps) { 
  const { viewer, onDelete, onUpdate } = props;
  const defaultFormData: Viewer = {
    full_name: viewer.full_name,
    age: viewer.age,
    gender: viewer.gender,
  };

  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [formData, setFormData] = useState<Viewer>(defaultFormData);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsEditing(val => !val);
    let newData: Partial<Viewer> = {};
    type F = keyof Viewer;

    for (const key of Object.keys(formData) as F[]) {
      if (formData[key] !== defaultFormData[key]) {
        newData = {...newData, [key]: formData[key]};
      }
    }
    onUpdate(viewer._id!, newData);
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
    onDelete(viewer._id!);
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
        <label htmlFor="viewer_full_name">Глядач:</label>
        <input 
          type="text"
          id="viewer_full_name"
          name="full_name"
          value={formData.full_name} 
          onChange={handleChange} 
          required
          disabled={!isEditing}
        />
      </div>
      <div className="row">
        <label htmlFor="viewer_age">Вік:</label>
        <input 
          type="number" 
          id="viewer_age"
          name="age"
          value={formData.age} 
          onChange={handleChange} 
          required
          disabled={!isEditing}
        />
      </div>
      <div className="row">
        <label htmlFor="viewer_gender">Стать:</label>
        <input 
          type="text" 
          id="viewer_gender"
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