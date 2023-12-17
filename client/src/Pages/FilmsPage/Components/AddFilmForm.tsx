import { useState, FormEvent, ChangeEvent } from "react";

import Film from "../../../interfaces/film.interface";

interface AddFilmFormProps {
  addFilm(film: Film): void
}

export default function AddFilmForm(props: AddFilmFormProps) {
  const { addFilm } = props;
  const defaultFormData:Film = {
    title: '',
    genre: '',
    director: '',
    year: 0,
    description: '',
  };
  const [formData, setFormData] = useState<Film>(defaultFormData);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addFilm(formData);
    setFormData(defaultFormData);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
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
          placeholder="Введіть назву фільма"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input 
          className="add-input" 
          type="text" 
          placeholder="Введіть жанр фільма"
          id="genre"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          required
        />
      </div>
      <div className="add-field">
        <input 
          className="add-input" 
          type="text" 
          placeholder="Введіть продюсера фільма"
          id="director"
          name="director"
          value={formData.director}
          onChange={handleChange}
          required
        />
        <input 
          className="add-input" 
          type="number" 
          placeholder="Введіть рік випуску фільма"
          id="year"
          name="year"
          value={formData.year ? formData.year : ''}
          onChange={handleChange}
          required
        />
      </div> 
      <div className="add-field"></div>
        <textarea
          className="add-textarea" 
          rows={10}
          placeholder="Введіть опис фільму"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      <button type="submit" className="add-button">Додати фільм</button>
    </form>
  );
};
