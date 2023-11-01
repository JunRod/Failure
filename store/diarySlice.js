import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    range: null,
    /*keyComplete: false,
    keyActive: false,*/
    articleActive: null,
    transition: null,
    runGPT: null,
}

export const diarySlice = createSlice({
    name: 'diary',
    initialState,
    reducers: {
        addRange: (state, {payload}) => {
            state.range = payload
        },
        /* setKeyComplete: (state, {payload}) => {
             state.keyComplete = payload
         },
         setKeyActive: (state, {payload}) => {
             state.keyActive = payload
         },*/
        setArticleActive: (state, {payload}) => {
            state.articleActive = payload
        },
        setTransition: (state, {payload}) => {
            state.transition = payload
        },
        setRunGPT: (state, {payload}) => {
            state.runGPT = payload
        },
    },
})

// Action creators are generated for each case reducer function
export const {
    setRunGPT,
    addRange, /*setKeyComplete, setKeyActive,*/
    setArticleActive,
    setTransition
} = diarySlice.actions

