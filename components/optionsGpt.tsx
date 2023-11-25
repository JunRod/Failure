'use client'

import Diary from "@styles/diary.module.css";
import {setOptionSelected, setTransition} from "@redux/diarySlice";
import {useAppDispatch, useAppSelector} from "@redux/hooks";
import React from "react";

function OptionsGpt() {

    const dispatch = useAppDispatch()
    const {range} = useAppSelector(state => state.diary)

    function optionsSelected(e: React.MouseEvent<HTMLButtonElement>) {
        if (!range) return

        const optionSelected = e.currentTarget.value

        dispatch(setOptionSelected(optionSelected))
        dispatch(setTransition(`${optionSelected} desde el ${range.today} hasta el ${range.twoDay}`))
    }


    return (
        <section className={Diary.optionsGPT}>
            <button className={Diary.optionButton} value={'Encontrar habitos negativos'}
                    onClick={optionsSelected}>Encontrar habitos negativos
            </button>
            <button className={Diary.optionButton} value={'Encontrar habitos positivos'}
                    onClick={optionsSelected}>Encontrar habitos positivos
            </button>
            <p className={Diary.proponer}>Proponer nuevas opciones</p>
        </section>
    );
}

export default OptionsGpt;