import {createSlice} from '@reduxjs/toolkit'
import {obtenerNombreMesEnEspanol} from "@lib/utils";
import ObjectID from "bson-objectid";
import {WritableDraft} from "@node_modules/immer/src/types/types-external";

export interface ArticleActive {
    id: string,
    titleNote: string,
    content: string,
}

interface DataUserActive {
    _id: string,
    user: string,
    data: Array<Data>,
    generates: Array<Generate>
}

interface Data {
    _id: string,
    day: number,
    month: string,
    articles: Array<Article>
}

export interface Article {
    titleNote: string,
    content: string,
    id: string,

    [key: string]: string
}

interface Generate {
    id: string,
    prompt: string,
    content: string,
}

interface SliceState {
    range: null | { today: number, twoDay: number },
    articleActive: null | ArticleActive,
    /**/
    transition: null | string,
    showConfigGpt: boolean,
    runGPT: boolean,
    optionSelected: null | string,
    /**/
    onMonth: boolean,
    onMonthDayText: null | string,
    MonthSelected: string,
    daySelected: number,
    createArticle: boolean,
    dataUserActive: null | DataUserActive,
    idDocument: null | string,
}

const initialState: SliceState = {
    range: null,
    articleActive: null,
    /**/
    transition: null,
    showConfigGpt: false,
    runGPT: false,
    optionSelected: null,
    /**/
    onMonth: false,
    onMonthDayText: null,
    MonthSelected: obtenerNombreMesEnEspanol(),
    daySelected: new Date().getDate(),
    createArticle: false,
    dataUserActive: null,
    idDocument: null,
}

export const diary = createSlice({
    name: 'diary',
    initialState,
    reducers: {
        reset: () => initialState,
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
        setDataUserActive: (state, {payload}) => {
            state.dataUserActive = payload
        },
        setUpdateArticle: (state, {payload}) => {

            if (state.dataUserActive === null) return

            state.dataUserActive = {
                ...state.dataUserActive,
                data: state.dataUserActive.data.map(document => {
                    if (document._id === state.idDocument) {
                        return {
                            ...document,
                            articles: document.articles.map(article => {
                                return article.id === payload.id ? payload : article
                            }),
                        }
                    }
                    return document
                })
            }
        },
        setIdDocument: (state, {payload}) => {
            state.idDocument = payload
        },
        createDocumentAndInsertOrInsert: (state, {payload}) => {

            if (state.dataUserActive === null) return

            const {object, isExistDocument, day, month} = payload

            if (isExistDocument) {
                state.dataUserActive = {
                    ...state.dataUserActive,
                    data: state.dataUserActive.data.map(document => {
                        if (document._id === state.idDocument) {
                            return {
                                ...document,
                                articles: [...document.articles, object]
                            }
                        }
                        return document
                    })
                }
            } else {
                state.dataUserActive = {
                    ...state.dataUserActive,
                    data: [...state.dataUserActive.data, {
                        _id: ObjectID().toHexString(),
                        day,
                        month,
                        articles: [object]
                    }]
                }
            }

        },
        deleteArticle: (state, {payload}) => {

            if (state.dataUserActive === null) return

            state.dataUserActive = {
                ...state.dataUserActive,
                data: state.dataUserActive.data.map(document => {
                    if (document._id === state.idDocument) {

                        if (document.articles.length === 1) {
                            return false
                        }

                        return {
                            ...document,
                            articles: document.articles.filter(article => {
                                return article.id !== payload
                            })
                        }
                    }
                    return document
                }) as WritableDraft<Data>[]
            }
        },
        setShowConfigGpt: (state, {payload}) => {
            state.showConfigGpt = payload
        },
        setOptionSelected: (state, {payload}) => {
            state.optionSelected = payload
        },
        saveGenerateInState: (state, {payload}) => {

            if (state.dataUserActive === null) return

            state.dataUserActive = {
                ...state.dataUserActive,
                generates: [...state.dataUserActive.generates, payload]
            }
        },
        deleteGenerate: (state, {payload}) => {
            if (state.dataUserActive === null) return

            state.dataUserActive = {
                ...state.dataUserActive,
                generates: state.dataUserActive.generates.filter(generate => generate.id !== payload)
            }
        }
    },
})

// Action creators are generated for each case reducer function
export const {
    deleteGenerate,
    saveGenerateInState,
    setOptionSelected,
    setShowConfigGpt,
    deleteArticle,
    createDocumentAndInsertOrInsert,
    setIdDocument,
    setUpdateArticle,
    setDataUserActive,
    setCreateArticle,
    setDaySelected,
    setMonthSelected,
    setOnMonthDayText,
    setOnMonth,
    setRunGPT,
    addRange, /*setKeyComplete, setKeyActive,*/
    setArticleActive,
    setTransition
} = diary.actions

export default diary.reducer

