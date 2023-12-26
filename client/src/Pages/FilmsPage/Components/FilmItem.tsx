import { useState, FormEvent, ChangeEvent } from "react";

import Film from "../../../interfaces/film.interface";
import { serverURL } from "../../../constants";

interface FilmItemProps {
  film: Film,
  onDelete(id: string): void,
  onUpdate(id: string, data: Partial<Film>, file: File | null): void
};

export default function FilmItem (props: FilmItemProps) { 
  const { film, onDelete, onUpdate } = props;
  const defaultFormData: Film = {
    title: film.title,
    genre: film.genre,
    director: film.director,
    year: film.year,
    description: film.description,
    pictureId: film.pictureId,
  };

  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [formData, setFormData] = useState<Film>(defaultFormData);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files![0];
    if (f) setFile(f);
  };

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
    onUpdate(film._id!, newData, file);
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
    console.log(film.pictureId)
    onDelete(film._id!);
  };

  const handleEditlick = () => {
    setIsEditing(val => !val);
  }

  const handleDeleteImage = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      pictureId: '',
    }));
  }

  return <li className="item">
    <form onSubmit={handleSubmit} onReset={handleReset}>
      { !isEditing && <div className="row">
        <button type="button" onClick={handleEditlick}>&#x270E;</button>
        <button type="button" onClick={handleDeleteClick}>&#10006;</button>
        </div> }
      <div className="item-container">
        <div className="item-row">
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
          {isEditing && !formData.pictureId && (
            <div className="row">
              <label htmlFor="film_file">Зображення:</label>
              <input   
                type="file" 
                name="file"
                id="film_file"
                onChange={handleFileChange}
              />
          </div>
          )}
        </div>
        <div className="item-row">
          <div className="row">
            {film.pictureId ? (
              <img className="item-img" src={`${serverURL}/${film.pictureId}.webp`} alt={film.title} />
            ): (
              <div className="item-empty-img"><p>Зображення нема</p></div>
            )}
            
          </div>
          {isEditing && formData.pictureId && (
            <div className="row">
              <button className="item-delete-img" type="button" onClick={handleDeleteImage}>Видалити зображення</button>
            </div>
          )}
          
        </div>
      </div>
      { isEditing && <div className="row">
          <button type="submit">Оновити дані фільма</button>
          <button type="reset">Скасувати редагування</button>
        </div> 
      }
    </form>
  </li>
};