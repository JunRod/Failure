'use client'

import {useSelector} from "react-redux";

function ContentArticleActive() {
    const {articleActive} = useSelector(state => state.diary)

    if (!articleActive) {
        return <></>
    }

    const {task, titleNote, content} = articleActive;

    return (
        <>
            <i>{task}</i>
            <h1>{titleNote}</h1>
            <p>{content}</p>
        </>
    );
}

export default ContentArticleActive;