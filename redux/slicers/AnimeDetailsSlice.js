import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    animeInfoID: 1,
    isAnimeDetailsOpen: false
}

export const animeInfoSlice = createSlice({
  name: 'animeInfoID',
  initialState,
  reducers: {
    setAnimeInfoID: (state, action) => {
      state.animeInfoID = action.payload
    },
    setIsAnimeDetailsOpen: (state, action) => {
      state.isAnimeDetailsOpen = action.payload
    },
  },
})

// it will set the anime id
export const { setAnimeInfoID, setIsAnimeDetailsOpen } = animeInfoSlice.actions;

// it will provide the anime id to store
export default animeInfoSlice.reducer;