'use client'

import Diary from "@styles/diary.module.css";
import {setArticleActive, setCreateArticle} from "@store/diarySlice.js";
import {useDispatch} from "react-redux";
import {useState} from "react";

function GenerateArticles({articles}) {

    const dispatch = useDispatch();
    const [articleActiveCSS, setArticleActiveCSS] = useState(null)

    function setArticle(article) {
        dispatch(setCreateArticle(false));
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
                    <i className={Diary.task}>
                        {task}
                        <svg
                            onClick={() => console.log('delete article')}
                            xmlns="http://www.w3.org/2000/svg"
                            className={`${Diary.delete} icon icon-tabler icon-tabler-trash-filled`}
                            width="22" height="22" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"
                            fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path
                                d="M20 6a1 1 0 0 1 .117 1.993l-.117 .007h-.081l-.919 11a3 3 0 0 1 -2.824 2.995l-.176 .005h-8c-1.598 0 -2.904 -1.249 -2.992 -2.75l-.005 -.167l-.923 -11.083h-.08a1 1 0 0 1 -.117 -1.993l.117 -.007h16z"
                                strokeWidth="0" fill="currentColor"></path>
                            <path
                                d="M14 2a2 2 0 0 1 2 2a1 1 0 0 1 -1.993 .117l-.007 -.117h-4l-.007 .117a1 1 0 0 1 -1.993 -.117a2 2 0 0 1 1.85 -1.995l.15 -.005h4z"
                                strokeWidth="0" fill="currentColor"></path>
                        </svg>
                    </i>
                    <h1>{titleNote}</h1>
                    <p>{content}</p>
                </div>
            )
        })
    );
}

export default GenerateArticles;