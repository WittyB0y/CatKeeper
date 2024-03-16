export interface ICard {
  /* interface of Card, using for read DB */
  id?: number;
  code: string;
  name: string;
  type: number;
  description: string;
  isFavorite: boolean;
  counter: number;
  dateCreated: string;
  dateUpdated: string;
  dateLastSeen: string;
}

export interface ICardProps {
  name?: string;
  code?: string;
  isFavorite: boolean;
  cardData: ICard;
}
