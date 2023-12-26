import { useState, FormEvent, ChangeEvent } from "react";

import Film from "../../../interfaces/film.interface";

interface FilmItemProps {
  film: Film,
  onDelete(id: string): void,
  onUpdate(id: string, data: Partial<Film>): void
};

export default function FilmItem (props: FilmItemProps) { 
  const { film, onDelete, onUpdate } = props;
  const defaultFormData: Film = {
    title: film.title,
    genre: film.genre,
    director: film.director,
    year: film.year,
    description: film.description
  };

  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [formData, setFormData] = useState<Film>(defaultFormData);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsEditing(val => !val);
    let newData: Partial<Film> = {};
    type F = keyof Film;

    for (const key of Object.keys(formData) as F[]) {
      if (formData[key] !== defaultFormData[key]) {
        newData = {...newData, [key]: formData[key]};
      }
    }
    onUpdate(film._id!, newData);
  };

  const handleReset = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsEditing(val => !val);
    setFormData(defaultFormData);
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleDeleteClick = () => {
    onDelete(film._id!);
  };

  const handleEditlick = () => {
    setIsEditing(val => !val);
  }

  return <li className="item">
    <form onSubmit={handleSubmit} onReset={handleReset}>
      { !isEditing && <div className="row">
        <button type="button" onClick={handleEditlick}>&#x270E;</button>
        <button type="button" onClick={handleDeleteClick}>&#10006;</button>
        </div> }
      <div className="row">
        <label htmlFor="film_title">Назва:</label>
        <input 
          type="text"
          id="film_title"
          name="title"
          value={formData.title} 
          onChange={handleChange} 
          required
          disabled={!isEditing}
        />
      </div>
      <div className="row">
        <label htmlFor="film_genre">Жанр:</label>
        <input 
          type="text" 
          id="film_genre"
          name="genre"
          value={formData.genre} 
          onChange={handleChange} 
          required
          disabled={!isEditing}
        />
      </div>
      <div className="row">
        <label htmlFor="film_director">Продюсер:</label>
        <input 
          type="text" 
          id="film_director"
          name="director"
          value={formData.director} 
          onChange={handleChange} 
          required
          disabled={!isEditing}
        />
      </div>
      <div className="row">
        <label htmlFor="film_year">Рік:</label>
        <input 
          type="number" 
          id="film_year"
          name="year"
          value={formData.year} 
          onChange={handleChange} 
          required
          disabled={!isEditing}
        />
      </div>
      <div className="row">
        <label htmlFor="film_description">Опис:</label>
        <textarea
          rows={isEditing ? 10 : 5}
          id="film_description"
          name="description"
          value={formData.description}
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