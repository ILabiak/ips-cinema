import { serverURL } from "../constants";
import Viewer from "../interfaces/viewer.interface";

const url = `${serverURL}/viewers`;

export const getViewers = async () => {
  const response: Response = await fetch(url);
  const data: Viewer[] = await response.json()
  return data;
}