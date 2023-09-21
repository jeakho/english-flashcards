export interface WordCard {
  id: number;
  value: string;
  transcriptions: { gb: string, us: string };
  image: { link: string, author: { name: string, link: string } };
  translations: string[];
}
