import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import type { ICard } from '../../components/Card/type'
import { addCard, deleteCardFromDB, getCardsOrCreateDB } from './utils';

const initialState: Record<'cards', ICard[]> = {
  cards: [],
};


export const loadCardsFromDB = () => async (dispatch: Dispatch) => {
  try {
    const cardsData = await getCardsOrCreateDB();
    dispatch(setCards(cardsData)); // Обновляем состояние Store с полученными данными
  } catch (error) {
    console.error('Error loading cards from DB:', error);
  }
};

export const deleteCard = (id: number) => async (dispatch: Dispatch) => {
  try {
    await deleteCardFromDB(id); // Вызов функции удаления из БД
    dispatch(loadCardsFromDB()); // Перезагрузка карточек из БД после удаления
  } catch (error) {
    console.error('Error deleting card:', error);
  }
};

export const addCardToDB = (card: ICard) => async (dispatch: Dispatch) => {
  try {
    await addCard(card); // Функция для добавления карточки в базу данных
    dispatch(loadCardsFromDB()); // Перезагрузка карточек из базы данных после добавления новой карточки
  } catch (error) {
    console.error('Error adding card to DB:', error);
  }
};

export const cardsSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    setCards: (state, action: PayloadAction<ICard[]>) => {
      state.cards = action.payload;
    },
    deleteCard: () => {

    }
  },
});

export const { setCards } = cardsSlice.actions;