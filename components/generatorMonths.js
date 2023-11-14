'use client'

import {mesesAbreviadosEnEspanol, obtenerNombreMesEnEspanol} from "@lib/utils.js";
import Link from "next/link";
import Diary from "@styles/diary.module.css";
import {setArticleActive, setMonthSelected} from "@store/diarySlice.js";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef} from "react";

function GeneratorMonths() {

    const dispatch = useDispatch();
    const {MonthSelected} = useSelector(state => state.diary)
    const currentMonth = useRef();

    useEffect(() => {
        const monthElement = currentMonth.current
        if (monthElement) {
            monthElement.scrollIntoView({
                behavior: "smooth", block: "start",
            })
        }

    }, []);

    function controllerOnClick(mes) {
        dispatch(setMonthSelected(mes))
        dispatch(setArticleActive(null))
    }

    return (mesesAbreviadosEnEspanol.map(mes => (<p
        key={mes}
        ref={mes === MonthSelected ? currentMonth : null}
        className={`${Diary.day} ${mes === MonthSelected ? Diary.monthActive : ''}`}
        onClick={() => controllerOnClick(mes)}
    >
        {mes.charAt(0).toUpperCase() + mes.slice(1)}
    </p>)));
}


export default GeneratorMonths;