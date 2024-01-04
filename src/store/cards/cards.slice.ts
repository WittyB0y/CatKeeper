import { createSlice } from "@reduxjs/toolkit";

interface ICard {
    id: number;
    name: string;
    photo?: string;
    code: string;
    type: string;
}

const initialState: { cards: ICard[] } = {
    cards: [],

}
export const cardsSlice = createSlice({
   name: "card",
   initialState,
   reducers: {
       addCard: (state, action: { payload: ICard }) => {
           state.cards.push(action.payload)
       }

   }
});
export const { addCard } = cardsSlice.actions;
