'use client'

import {obtenerNombreMesEnEspanol} from "@lib/utils.js";
import {useEffect, useState} from "react";
import Diary from "@styles/diary.module.css";
import {useDispatch, useSelector} from "react-redux";
import {setOnMonth, setOnMonthDayText} from "@store/diarySlice.js";

function MonthOnHover() {
    const dispatch = useDispatch()
    const {onMonth, MonthSelected, onMonthDayText, daySelected} = useSelector(state => state.diary)

    useEffect(() => {
        if (onMonth) dispatch(setOnMonthDayText(new Date().getDate()))
    }, [onMonth]);

    function exec() {
        if (!onMonth && !onMonthDayText) return dispatch(setOnMonth(true))

        dispatch(setOnMonth(false))
        dispatch(setOnMonthDayText(null))
    }

    return (<div onMouseOver={() => exec()}
                 className={Diary.month}>
        {(onMonth && onMonthDayText) ? onMonthDayText ? daySelected : onMonthDayText : MonthSelected}
    </div>);
}

export default MonthOnHover;