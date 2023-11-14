'use client'

import Link from "next/link";
import Diary from "@styles/diary.module.css";
import {useDispatch, useSelector} from "react-redux";
import {setOptionSelected, setTransition} from "@store/diarySlice.js";

function OptionsGpt() {

    const dispatch = useDispatch()
    const {range} = useSelector(state => state.diary)

    function optionsSelected(e) {
        const optionSelected = e.target.value

        dispatch(setOptionSelected(optionSelected))
        dispatch(setTransition(`${optionSelected} desde el ${range.today} hasta el ${range.twoDay}`))
    }


    return (
        <section className={Diary.optionsGPT}>
            <button value={'Encontrar habitos negativos'} onClick={optionsSelected}>Encontrar habitos negativos
            </button>
            <button value={'Encontrar habitos negativos'} onClick={optionsSelected}>Encontrar habitos positivos</button>
            <Link href={''}>Proponer nuevas opciones</Link>
        </section>
    );
}

export default OptionsGpt;