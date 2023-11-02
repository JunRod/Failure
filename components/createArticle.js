'use client'

import Diary from "@styles/diary.module.css";
import {useDispatch} from "react-redux";
import {setArticleActive, setCreateArticle} from "@store/diarySlice.js";

function CreateArticle() {

    const dispatch = useDispatch()

    function exec() {
        dispatch(setArticleActive(null))
        dispatch(setCreateArticle(true))
    }

    return (
        <div
            onClick={() => exec()}
            className={Diary.createArticle}>
            <h1>
                +
            </h1>
        </div>
    );
}

export default CreateArticle;