import { serverURL } from "../constants";
import Film from "../interfaces/film.interface";

const baseUrl = `${serverURL}/films`;

export const getFilms = async () => {
  const response: Response = await fetch(baseUrl);
  const films: Film[] = await response.json();
  return films;
}
