import { useEffect, useState } from "react";
import Film from "./film.interface";
import { serverURL } from "../../constants";
import FilmList from "./Components/FilmList";
import AddFilmForm from "./Components/AddFilmForm";

export default function FilmsPage() {
  const [films, setFilms] = useState<Film[]>([]);
  const url = `${serverURL}/films`;

  useEffect(() => {
    const handleFetchFilms = async () => {
      const response = await fetch(url);
      const data = await response.json();
      setFilms(data);
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
    setFilms(prevFilms => [...prevFilms, film]);
  };

  return (
    <>
      <AddFilmForm addFilm={addFilm} />
      <FilmList films={films} />
    </>
  );
};