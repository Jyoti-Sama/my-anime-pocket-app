import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isCharacterSearchEnabled: false,
    globalSearchValue: "",
    globalAnimeID: 1,
    globalCharacterID: 1,

    animeSearchResult: [],
    characterSearchResult: [],

    animeSearchPageInfo: [],
    characterSearchPageInfo: [],

    isAnimeDetailsOpen: false,
    

}

export const searchSlice = createSlice({
    name: 'animeSearch',
    initialState,
    reducers: {
        setIsCharacterSearchEnabled: (state, action) => {
            state.isCharacterSearchEnabled = action.payload
        },
        setGlobalSearchValue: (state, action) => {
            state.globalSearchValue = action.payload
        },
        setGlobalAnimeID: (state, action) => {
            state.globalAnimeID = action.payload
        },
        setGlobalCharacterID: (state, action) => {
            state.globalCharacterID = action.payload
        },
        setAnimeSearchResult: (state, action) => {
            state.animeSearchResult = action.payload
        },
        setCharacterSearchResult: (state, action) => {
            state.characterSearchResult = action.payload
        },
        setAnimeSearchPageInfo: (state, action) => {
            state.animeSearchPageInfo = action.payload
        },
        setCharacterSearchPageInfo: (state, action) => {
            state.characterSearchPageInfo = action.payload
        },
        setIsAnimeDetailsOpen: (state, action) => {
            state.isAnimeDetailsOpen = action.payload
        },
    },
})

// it will set the details
export const { 
    setIsCharacterSearchEnabled, 
    setGlobalSearchValue, 
    setGlobalAnimeID, 
    setGlobalCharacterID,
    setAnimeSearchResult,
    setCharacterSearchResult,
    setAnimeSearchPageInfo,
    setCharacterSearchPageInfo,
    setIsAnimeDetailsOpen,
 } = searchSlice.actions;

// it will provide the details to store
export default searchSlice.reducer;