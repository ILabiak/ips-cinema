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

  const addFilm = (film: Film): void => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(film),
    });
    setFilms(prevFilms => [film, ...prevFilms]);
  };

  const deleteFilm = (id: string): void => {
    fetch(`${url}/${id}`, {
      method: 'DELETE',
    });
    setFilms(films.filter(film => film._id !== id));
  }

  return (
    <>
      <AddFilmForm addFilm={addFilm} />
      <FilmList films={films} deleteFilm={deleteFilm}/>
    </>
  );
};