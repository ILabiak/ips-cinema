import Film from "../../../interfaces/film.interface";

interface FilmItemProps {
  film: Film,
  onDelete(id: string): void,
};

export default function FilmItem (props: FilmItemProps) { 
  const { film, onDelete } = props;

  const handleClick = () => {
    onDelete(film._id!);
  };

  return <li className="item">
    <ul>
      <li className="item-text">{film.title}</li>
      <li className="item-text">Жанр: {film.genre} </li>
      <li className="item-text">Продюсер: {film.director} </li>
      <li className="item-text">Рік: {film.year} </li>
      <li className="item-text">Опис: {film.description} </li>
    </ul>
    <button type="button" onClick={handleClick}>&#10006;</button>
  </li>
};