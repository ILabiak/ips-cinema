import { serverURL } from "../constants";
import Ticket from "../interfaces/ticket.interface";

const url = `${serverURL}/tickets`;

export const getTickets = async () => {
  const response: Response = await fetch(url);
  const data: Ticket[] = await response.json()
  return data;
}