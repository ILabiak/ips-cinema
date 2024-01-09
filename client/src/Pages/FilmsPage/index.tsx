import { useEffect, useState } from "react";
import Film from "../../interfaces/film.interface";
import { serverURL } from "../../constants";
import FilmList from "./Components/FilmList";
import AddFilmForm from "./Components/AddFilmForm";

export default function FilmsPage() {
  const [films, setFilms] = useState<Film[]>([]);
  const url = `${serverURL}/films`;

  useEffect(() => {
    const handleFetchFilms = async () => {
      const response: Response = await fetch(url);
      const data: Film[] = await response.json();
      setFilms(data.reverse());
    }

    handleFetchFilms();
  }, [url]);

  const addFilm = (film: Film, file: File | null): void => {
    const fData = new FormData();
    fData.append('file', file!);
    type F = keyof Film;

    for (const key of Object.keys(film) as F[]) {
      fData.append(key, String(film[key]));
    }

    fetch(url, {
      method: 'POST',
      body: fData,
    });
    setFilms(prevFilms => [film, ...prevFilms]);
  };

  const updateFilm = (id: string, data: Partial<Film>, file: File | null) => {
    const fData = new FormData();
    fData.append('file', file!);
    type F = keyof Film;

    for (const key of Object.keys(data) as F[]) {
      fData.append(key, String(data[key]));
    }

    fetch(`${url}/${id}`, {
      method: 'PATCH',
      body: fData,
    });
    const updatedFilms = films.map(film => {
      if (film._id === id) return {...film, ...data};
      return film;
    })
    setFilms(updatedFilms);
  }

  const deleteFilm = (id: string): void => {
    fetch(`${url}/${id}`, {
      method: 'DELETE',
    });
    setFilms(films.filter(film => film._id !== id));
  }

  return (
    <>
      <AddFilmForm addFilm={addFilm} />
      <FilmList films={films} deleteFilm={deleteFilm} updateFilm={updateFilm}/>
    </>
  );
};