import {createSlice} from '@reduxjs/toolkit'
import {obtenerNombreMesEnEspanol} from "@lib/utils.js";

const initialState = {
    range: null,
    articleActive: null,
    transition: null,
    runGPT: null,
    onMonth: false,
    onMonthDayText: null,
    MonthSelected: obtenerNombreMesEnEspanol(),
    daySelected: new Date().getDate(),
    createArticle: false,
    widthContainerArticleActive: null,
}

export const diarySlice = createSlice({
    name: 'diary',
    initialState,
    reducers: {
        addRange: (state, {payload}) => {
            state.range = payload
        },
        setArticleActive: (state, {payload}) => {
            state.articleActive = payload
        },
        setTransition: (state, {payload}) => {
            state.transition = payload
        },
        setRunGPT: (state, {payload}) => {
            state.runGPT = payload
        },
        setOnMonth: (state, {payload}) => {
            state.onMonth = payload
        },
        setOnMonthDayText: (state, {payload}) => {
            state.onMonthDayText = payload
        },
        setMonthSelected: (state, {payload}) => {
            state.MonthSelected = payload
        },
        setDaySelected: (state, {payload}) => {
            state.daySelected = payload
        },
        setCreateArticle: (state, {payload}) => {
            state.createArticle = payload
        },

    },
})

// Action creators are generated for each case reducer function
export const {
    setCreateArticle,
    setDaySelected,
    setMonthSelected,
    setOnMonthDayText,
    setOnMonth,
    setRunGPT,
    addRange, /*setKeyComplete, setKeyActive,*/
    setArticleActive,
    setTransition
} = diarySlice.actions

