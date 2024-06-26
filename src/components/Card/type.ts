export type ICardWithoutId = Omit<ICard, 'id'>;

export interface ICard {
  /* interface of Card, using for read DB */
  id: number;
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

export type TCardProps = Pick<ICard, 'id' | 'name' | 'isFavorite' | 'code'>;
