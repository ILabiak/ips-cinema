export default interface Viewer {
  _id?: string,
  full_name: string;
  age: number;
  gender: string;
  image?: {
    image: {
      contentType: string,
      data: string
    }
  } | null
};