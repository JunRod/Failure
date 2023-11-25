'use client'

import Diary from '../styles/diary.module.css';
import {
    setArticleActive,
    setCreateArticle,
    setOptionSelected,
    setRunGPT,
    setShowConfigGpt,
    setTransition
} from "@redux/diarySlice";
import {useEffect, useState} from "react";
import {useAppDispatch} from "@redux/hooks";

function Transition({transition}: { transition: string | null }) {

    const dispatch = useAppDispatch()
    const [transitionLocal, setTransitionLocal] = useState(false)

    function exec(value: boolean) {
        dispatch(setRunGPT(value))
        dispatch(setArticleActive(null))
        dispatch(setCreateArticle(false))

        if (!value) {
            dispatch(setShowConfigGpt(false))
            dispatch(setOptionSelected(null))
        }

        setTransitionLocal(false)
        setTimeout(() => {
            dispatch(setTransition(null))
        }, 800)
    }

    useEffect(() => {
        function controllerTransition() {
            if (transition) {
                setTransitionLocal(true)
            }
        }

        controllerTransition()
    }, [transition]);


    return (
        <div className={`${Diary.bartender}`}>
            <div className={`${Diary.transition} ${!transitionLocal && Diary.fadeOff}`}>
                <h1>{transition}</h1>
                <h2>Deseas continuar?</h2>
                <div>
                    <button onClick={() => exec(true)}>Si</button>
                    <button onClick={() => exec(false)}>No</button>
                </div>
            </div>
            <div className={`${transitionLocal ? Diary.bar : Diary.barOff}`}></div>
            <div className={`${transitionLocal ? Diary.bar : Diary.barOff}`}></div>
            <div className={`${transitionLocal ? Diary.bar : Diary.barOff}`}></div>
            <div className={`${transitionLocal ? Diary.bar : Diary.barOff}`}></div>
            <div className={`${transitionLocal ? Diary.bar : Diary.barOff}`}></div>

        </div>
    );
}

export default Transition;