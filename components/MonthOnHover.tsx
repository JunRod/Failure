'use client'

import {useEffect} from "react";
import Diary from "@styles/diary.module.css";
import {setOnMonth, setOnMonthDayText} from "@redux/diarySlice";
import {useAppDispatch, useAppSelector} from "@redux/hooks";

function MonthOnHover() {
    const dispatch = useAppDispatch()
    const {onMonth, MonthSelected, onMonthDayText, daySelected} = useAppSelector(state => state.diary)

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