'use client'

import Diary from '../styles/diary.module.css';
import {useDispatch, useSelector} from "react-redux";
import {setArticleActive, setCreateArticle, setRunGPT, setTransition} from "@store/diarySlice.js";

function Transition() {

    const dispatch = useDispatch()
    const {transition, runGPT} = useSelector(state => state.diary)

    function exec(value) {
        dispatch(setRunGPT(value))
        dispatch(setArticleActive(null))
        dispatch(setCreateArticle(false))

        setTimeout(() => {
            dispatch(setTransition(null))
        }, 600)
    }


    return (
        <div className={`${Diary.bartender}`}>
            <div className={Diary.transition}>
                <h1>{transition}</h1>
                <h2>Deseas continuar?</h2>
                <div>
                    <button onClick={() => exec(true)}>Si</button>
                    <button onClick={() => exec(false)}>No</button>
                </div>
            </div>
            <div className={`${runGPT ? Diary.barOff : Diary.bar}`}></div>
            <div className={`${runGPT ? Diary.barOff : Diary.bar}`}></div>
            <div className={`${runGPT ? Diary.barOff : Diary.bar}`}></div>
            <div className={`${runGPT ? Diary.barOff : Diary.bar}`}></div>
            <div className={`${runGPT ? Diary.barOff : Diary.bar}`}></div>
        </div>
    );
}

export default Transition;