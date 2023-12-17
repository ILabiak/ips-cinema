import Film from "../film.interface";

interface FilmItemProps {
  film: Film
};

export default function FilmItem (props: FilmItemProps) { 
  const { film } = props;
  return <li className="item">
    <ul>
      <li className="item-text">{film.title}</li>
      <li className="item-text">Жанр: {film.genre} </li>
      <li className="item-text">Продюсер: {film.director} </li>
      <li className="item-text">Рік: {film.year} </li>
      <li className="item-text">Опис: {film.description} </li>
    </ul>
  </li>
};