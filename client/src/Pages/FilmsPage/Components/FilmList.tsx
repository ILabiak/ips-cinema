import FilmItem from "./FilmItem";
import Film from "../film.interface";

interface FilmListProps {
  films: Film[],
}

export default function FilmList(props: FilmListProps) {
  const { films } = props;

  return (
    <ul className="list">{ 
        films.length ? 
        films.map((film) => <FilmItem key={film.id} film={film} />) :
        <div className="list-empty">No films!</div>
      }
    </ul>
  );
};