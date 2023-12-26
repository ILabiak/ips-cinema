import FilmItem from "./FilmItem";
import Film from "../../../interfaces/film.interface";

interface FilmListProps {
  films: Film[],
  deleteFilm(id: string): void,
  updateFilm(id: string, data: Partial<Film>, file: File | null): void,
}

export default function FilmList(props: FilmListProps) {
  const { films, deleteFilm, updateFilm } = props;

  return (
    <ul className="list">{ 
        films.length ? 
        films.map((film) => (
          <FilmItem key={film._id} film={film} onDelete={deleteFilm} onUpdate={updateFilm}/>
        )) :
        <div className="list-empty">Фільмів нема!</div>
      }
    </ul>
  );
};