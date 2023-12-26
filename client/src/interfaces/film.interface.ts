export default interface Film {
  _id?: string,
  title: string;
  genre: string;
  director: string;
  year: number;
  description: string;
  pictureId?: string;
};