import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    range: null,
    keyComplete: false,
    keyActive: false,
    articleActive: null,
}

export const diarySlice = createSlice({
    name: 'diary',
    initialState,
    reducers: {
        addRange: (state, {payload}) => {
            state.range = payload
        },
        setKeyComplete: (state, {payload}) => {
            state.keyComplete = payload
        },
        setKeyActive: (state, {payload}) => {
            state.keyActive = payload
        },
        setArticleActive: (state, {payload}) => {
            state.articleActive = payload
        },
    },
})

// Action creators are generated for each case reducer function
export const {addRange, setKeyComplete, setKeyActive, setArticleActive} = diarySlice.actions

