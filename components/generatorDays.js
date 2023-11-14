"use client"

import {useEffect, useRef, useState} from "react";
import Diary from "@styles/diary.module.css";
import {useDispatch, useSelector} from "react-redux";
import {
    addRange,
    setArticleActive,
    setDaySelected,
    setMonthSelected,
    setOnMonth, setOptionSelected, setRunGPT,
    setShowConfigGpt
} from "@store/diarySlice";
import {usePathname, useSelectedLayoutSegment} from "next/navigation";
import {mesesAbreviadosEnEspanol, obtenerNombreMesEnEspanol} from "@lib/utils.js";
import isLogin from "@components/isLogin.js";
import {useRouter} from "next/navigation";

function GeneratorDays() {

    const pathname = usePathname();
    const segment = useSelectedLayoutSegment()
    const todayRef = useRef();
    const [today, setToday] = useState(new Date().getDate())
    const [twoDay, setTwoDay] = useState(null)
    const dispatch = useDispatch();
    const {onMonth, onMonthDayText, MonthSelected, daySelected, range} = useSelector(state => state.diary)
    const indexMonthSelected = mesesAbreviadosEnEspanol.indexOf(MonthSelected)
    const DayUltimateMonth = new Date(new Date().getFullYear(), indexMonthSelected + 1, 0).getDate()
    const router = useRouter()
    const resultIsLogin = isLogin()


    function controllerOnClick(i) {
        /*Verificar que este logeado*/
        if (!resultIsLogin) return router.push('/api/auth/login')

        setToday(i);
        dispatch(setDaySelected(i))
        dispatch(setArticleActive(null))
        dispatch(setShowConfigGpt(false))
        dispatch(setOptionSelected(false))
        dispatch(setRunGPT(false))
    }

    function controllerDoubleClick(i) {
        setTwoDay(i);
    }

    useEffect(() => {

        function setSegment() {
            const conditional = segment !== `${obtenerNombreMesEnEspanol()}/${today}` && null !== segment

            if (conditional) {
                const [, , month, day] = pathname.split("/")
                dispatch(setDaySelected(parseInt(day)))
                dispatch(setMonthSelected(month))
            }

        }

        setSegment()
    }, [segment]);

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
                    onDoubleClick={() => controllerDoubleClick(i + 1)}
                    onClick={() => controllerOnClick(i + 1)}
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