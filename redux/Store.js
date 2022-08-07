import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slicers/UserSlice';

import animeInfoID from './slicers/AnimeDetailsSlice';
import searchItems from './slicers/SearchSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    animeInfo: animeInfoID,
    searchItems: searchItems,
  },
})