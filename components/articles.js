'use client'

import Diary from "@styles/diary.module.css";
import {setArticleActive} from "@store/diarySlice.js";
import {useDispatch} from "react-redux";
import {useState} from "react";

function Articles({articles}) {

    const dispatch = useDispatch();
    const [articleActiveCSS, setArticleActiveCSS] = useState(null)

    function setArticle(article) {
        dispatch(setArticleActive(article));
        setArticleActiveCSS(article.id)
    }

    return (
        articles?.map(article => {
            const {id, task, titleNote, content} = article;
            return (
                <div
                    onClick={() => setArticle(article)}
                    key={id}
                    className={`${Diary.article} ${id === articleActiveCSS ? Diary.articleActive : ''}`}
                >
                    <i>{task}</i>
                    <h1>{titleNote}</h1>
                    <p>{content}</p>
                </div>
            )
        })
    );
}

export default Articles;