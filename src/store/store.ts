import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { cardsSlice } from "./cards/cards.slice";


const rootReducer = combineReducers({
    [cardsSlice.name]: cardsSlice.reducer
})

export const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof rootReducer>
