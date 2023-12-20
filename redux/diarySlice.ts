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
    chats: Array<ChatDataContainer>
}

interface ChatData {
    prompt: string;
    completion: string;
}

interface ChatDataContainer {
    id: string;
    chat: Array<ChatData>
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

interface ChatData {
    prompt: string;
    completion: string;
}

interface ChatDataContainer {
    id: string;
    chat: Array<ChatData>
}

interface SliceState {
    range: null | { today: number, twoDay: number },
    articleActive: null | ArticleActive,
    showChatGPT: boolean,
    isLoadingGPT: boolean,
    onMonth: boolean,
    MonthSelected: string,
    daySelected: number,
    createArticle: boolean,
    dataUserActive: null | DataUserActive,
    idDocument: null | string,
    chatData: ChatDataContainer
}

const initialState: SliceState = {
    range: null,
    articleActive: null,
    showChatGPT: true,
    isLoadingGPT: false,
    onMonth: false,
    MonthSelected: obtenerNombreMesEnEspanol(),
    daySelected: new Date().getDate(),
    createArticle: false,
    dataUserActive: null,
    idDocument: null,
    chatData: {id: '', chat: []}
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
        setOnMonth: (state, {payload}) => {
            state.onMonth = payload
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

            state.dataUserActive.data = state?.dataUserActive?.data.map(document => {
                if (document?._id === state.idDocument) {
                    return {
                        ...document,
                        articles: document?.articles?.map(article => {
                            return article?.id === payload?.id ? payload : article
                        }),
                    }
                }
                return document
            })
        },
        setIdDocument: (state, {payload}) => {
            state.idDocument = payload
        },
        createDocumentAndInsertOrInsert: (state, {payload}) => {

            if (state.dataUserActive === null) return

            const {object, isExistDocument, day, month} = payload

            state.dataUserActive.data = isExistDocument
                ? state.dataUserActive?.data?.map(document => {
                    if (document?._id === state.idDocument) {
                        return {
                            ...document,
                            articles: [...document?.articles, object]
                        };
                    }
                    return document;
                })
                : [
                    ...state.dataUserActive.data,
                    {
                        _id: ObjectID().toHexString(),
                        day,
                        month,
                        articles: [object]
                    }
                ];

        },
        deleteArticle: (state, {payload}) => {

            if (state.dataUserActive === null) return

            state.dataUserActive.data = state?.dataUserActive?.data?.map(document => {
                if (document?._id === state.idDocument) {

                    return document?.articles?.length === 1
                        ? false
                        : {
                            ...document,
                            articles: document?.articles?.filter(article => {
                                return article?.id !== payload
                            })
                        }
                }
                return document
            }) as WritableDraft<Data>[]
        },
        setShowChatGPT: (state, {payload}) => {
            state.showChatGPT = payload
        },
        setSaveChatInDataUser: (state, {payload}) => {

            if (state?.dataUserActive === null) return;

            const chatIndex = state?.dataUserActive?.chats?.findIndex(chat => chat.id === payload.id);

            if (chatIndex !== -1) {
                // El chat ya existe, actualiza el elemento en el array
                state.dataUserActive.chats = state?.dataUserActive?.chats?.map((chat, index) =>
                    index === chatIndex ? payload : chat
                );
            } else {
                // El chat no existe, añádelo al array
                state.dataUserActive.chats?.push(payload);
            }
        },
        setDeleteChat: (state, {payload}) => {
            if (state.dataUserActive === null) return

            state.dataUserActive.chats = state.dataUserActive?.chats.filter(chat => chat?.id !== payload)
        },
        setUpdateLastChat: (state, {payload: completion}) => {

            const lastIndex = state?.chatData?.chat?.length - 1;

            state.chatData.chat = state?.chatData?.chat?.map((chat, index) => {
                if (index === lastIndex) {
                    return {...chat, completion}
                }
                return chat
            })
        },
        setChatData: (state, {payload}) => {
            state.chatData = payload
        },
        setIsLoadingGPT: (state, {payload}) => {
            state.isLoadingGPT = payload
        }
    },
})

// Action creators are generated for each case reducer function
export const {
    setIsLoadingGPT,
    setChatData,
    setUpdateLastChat,
    setSaveChatInDataUser,
    setDeleteChat,
    setShowChatGPT,
    deleteArticle,
    createDocumentAndInsertOrInsert,
    setIdDocument,
    setUpdateArticle,
    setDataUserActive,
    setCreateArticle,
    setDaySelected,
    setMonthSelected,
    setOnMonth,
    addRange, /*setKeyComplete, setKeyActive,*/
    setArticleActive,
} = diary.actions

export default diary.reducer



