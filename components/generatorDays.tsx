"use client"

import {useEffect, useRef, useState} from "react";
import Diary from "@styles/diary.module.css";
import {
    addRange,
    setArticleActive,
    setDaySelected,
    setOnMonth, setOptionSelected, setRunGPT,
    setShowConfigGpt
} from "@redux/diarySlice";
import {mesesAbreviadosEnEspanol} from "@lib/utils";
import isLogin from "@components/isLogin";
import {useRouter} from "next/navigation";
import {useAppDispatch, useAppSelector} from "@redux/hooks";

function GeneratorDays() {

    const todayRef = useRef<HTMLParagraphElement | null>(null);
    const [today, setToday] = useState<number>(new Date().getDate())
    const [twoDay, setTwoDay] = useState<number | null>(null)
    const dispatch = useAppDispatch();
    const {onMonth, onMonthDayText, MonthSelected, daySelected, range} = useAppSelector(state => state.diary)
    const indexMonthSelected = mesesAbreviadosEnEspanol.indexOf(MonthSelected)
    const DayUltimateMonth = new Date(new Date().getFullYear(), indexMonthSelected + 1, 0).getDate()
    const router = useRouter()
    const resultIsLogin = isLogin()

    function OnClick(i: number) {
        /*Verificar que este logeado*/
        if (!resultIsLogin) return router.push('/api/auth/login')

        setToday(i);
        dispatch(setDaySelected(i))
        dispatch(setArticleActive(null))
        dispatch(setShowConfigGpt(false))
        dispatch(setOptionSelected(false))
        dispatch(setRunGPT(false))
    }

    function onDoubleClick(i: number) {
        setTwoDay(i);
    }

    /*Cuando se esta ejecutandfo GPT y apretamos un articulo o el boton para crear un nuevo articulo,
    * se reinicia el rango, entonces si es null, reiniciamos los rangos de today y twoDay
    * */
    useEffect(() => {
        if (!range) {
            setToday(new Date().getDate())
            setTwoDay(null)
        }
    }, [range]);


    useEffect(() => {
        if (twoDay && today) {
            dispatch(addRange({today, twoDay}))
        }
    }, [twoDay, today]);

    useEffect(() => {
        const todayElement = todayRef.current;

        if (todayElement) {
            todayElement.scrollIntoView({
                behavior: "smooth", block: "start",
            })
        }
    }, [])

    return (Array(DayUltimateMonth)
        .fill(0)
        .map((_, i) => {

            //Saber el div que esta seleccionado
            const isDaySelected = daySelected === i + 1
            //Le pone un gris mas claro para diferenciarlo del dia seleccionado con un click
            const isTwoDay = twoDay === i + 1

            const isWithinRange = (twoDay && i + 1 >= today && i + 1 <= twoDay) || (twoDay && i + 1 <= today && i + 1 >= twoDay)

            return (
                <p
                    onDoubleClick={() => onDoubleClick(i + 1)}
                    onClick={() => OnClick(i + 1)}
                    onMouseOver={() => (onMonth && onMonthDayText) && dispatch(setOnMonth(true))}
                    key={i}
                    className={`${Diary.day} ${isDaySelected ? Diary.today : ''} ${isWithinRange ? Diary.today : ''} ${isTwoDay ? Diary.twoDay : ''}`}
                    ref={isDaySelected ? todayRef : null}
                >
                    {i + 1}
                </p>)
        }));
}

export default GeneratorDays;