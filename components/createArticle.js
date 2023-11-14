'use client'

import Diary from "@styles/diary.module.css";
import {useDispatch, useSelector} from "react-redux";
import {
    addRange,
    setArticleActive,
    setCreateArticle,
    setOptionSelected,
    setRunGPT,
    setShowConfigGpt
} from "@store/diarySlice.js";
import ObjectID from "bson-objectid";

function CreateArticle() {

    const dispatch = useDispatch()

    function controllerCreateArticle() {
        const id = ObjectID().toHexString()

        dispatch(addRange(null))
        dispatch(setArticleActive({titleNote: '', content: '', id}))
        dispatch(setRunGPT(false));
        dispatch(setShowConfigGpt(false));
        dispatch(setOptionSelected(null));
        dispatch(setCreateArticle(true))
    }

    return (
        <div
            onClick={controllerCreateArticle}
            className={Diary.createArticle}>
            <h1>
                +
            </h1>
        </div>
    );
}

export default CreateArticle;
