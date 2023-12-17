import { useEffect, useState } from "react";
import Film from "./film.interface";
import { serverURL } from "../../constants";
import FilmList from "./Components/FilmList";

export default function FilmsPage() {
  const [films, setFilms] = useState<Film[]>([]);

  useEffect(() => {
    const handleFetchFilms = async () => {
      const response = await fetch(`${serverURL}/films`);
      const data = await response.json();
      setFilms(data);
    }

    handleFetchFilms();
  }, []);

  return (
    <FilmList films={films}/>
  );
};