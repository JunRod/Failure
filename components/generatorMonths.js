'use client'

import {mesesAbreviadosEnEspanol, obtenerNombreMesEnEspanol} from "@lib/utils.js";
import Link from "next/link";
import Diary from "@styles/diary.module.css";
import {setMonthSelected} from "@store/diarySlice.js";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef} from "react";

function GeneratorMonths() {

    const dispatch = useDispatch();
    const {MonthSelected, daySelected} = useSelector(state => state.diary)
    const currentMonth = useRef();

    useEffect(() => {
        const monthElement = currentMonth.current
        if (monthElement) {
            monthElement.scrollIntoView({
                behavior: "smooth", block: "start",
            })
        }

    }, []);

    return (mesesAbreviadosEnEspanol.map(mes => (<Link
                scroll={false}
                key={mes}
                ref={mes === MonthSelected ? currentMonth : null}
                className={`${Diary.day} ${mes === MonthSelected ? Diary.monthActive : null}`}
                href={`/diary/${mes}/${daySelected}`}
                onClick={() => dispatch(setMonthSelected(mes))}
            >
                {mes.charAt(0).toUpperCase() + mes.slice(1)}
            </Link>)));
}


export default GeneratorMonths;