"use client"

import {useEffect, useLayoutEffect, useRef, useState} from "react";
import {
    addRange, setArticleActive,
    setDaySelected,
} from "@redux/diarySlice";
import {mesesAbreviadosEnEspanol} from "@lib/utils";
import isLogin from "@components/isLogin";
import {useRouter} from "next/navigation";
import {useAppDispatch, useAppSelector} from "@redux/hooks";

function GeneratorDays() {

    const todayRef = useRef<HTMLParagraphElement>(null);
    const [today, setToday] = useState<number>(new Date().getDate())
    const [twoDay, setTwoDay] = useState<number | null>(null)
    const dispatch = useAppDispatch();
    const {MonthSelected, daySelected, range} = useAppSelector(state => state.diary)
    const indexMonthSelected = mesesAbreviadosEnEspanol.indexOf(MonthSelected)
    const DayUltimateMonth = new Date(new Date().getFullYear(), indexMonthSelected + 1, 0).getDate()
    const router = useRouter()
    const resultIsLogin = isLogin()

    function onClick(i: number) {
        /*Verificar que este logeado*/
        if (!resultIsLogin) return router.push('/api/auth/login')

        setToday(i);
        dispatch(setDaySelected(i))

        dispatch(setArticleActive(null))
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

    useLayoutEffect(() => {
        if (todayRef.current) {
            todayRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }

    }, []);

    /*Cuando hacemos hover en la fecha y nos vuelve a renderizar los dias
    * entonces tenemos que verificar si ya exite un rango seleccionad.
    * en ese caso, seteamos los dias que estan en el rango en los states de este componente.
    * */
    useEffect(() => {
        if (range?.twoDay && range?.today) {
            setTwoDay(range.twoDay)
            setToday(range.today)
        }
    }, []);

    let watingClick: NodeJS.Timeout | null = null;
    let lastClick = 0

    function doubleClick(e: React.TouchEvent<HTMLDivElement>, i: number) {

        if (lastClick && e.timeStamp - lastClick < 250 && watingClick) {
            lastClick = 0;
            clearTimeout(watingClick);
            console.log("Do the steps to respond double click");
            setTwoDay(i + 1)
            watingClick = null;
        } else {
            lastClick = e.timeStamp;
            watingClick = setTimeout(() => {
                onClick(i + 1)
                watingClick = null;
            }, 251);
        }
    }


    return Array(DayUltimateMonth).fill(0).map((_, i) => {
        //Saber el div que esta seleccionado
        const isDaySelected = daySelected === i + 1
        //Le pone un gris mas claro para diferenciarlo del dia seleccionado con un click
        const isTwoDay = twoDay === i + 1

        const isWithinRange = (twoDay && i + 1 >= today && i + 1 <= twoDay) || (twoDay && i + 1 <= today && i + 1 >= twoDay)

        return (
            <div
                className='cursor-pointer selection:bg-transparent'
                onDoubleClick={(e) => {
                    setTwoDay(i + 1)
                }}
                onClick={() => {
                    onClick(i + 1)
                }}
                onTouchStart={(e) => doubleClick(e, i)}
                key={i}
                ref={isDaySelected ? todayRef : null}
            >
                <p
                    className={`${isTwoDay && 'after:bg-[#ADB5BD] bg-[#ADB5BD] z-50 before:from-[#DEE2E6]' +
                    ' before:to-transparent'} ${isWithinRange && 'bg-[#6C757D] hover:bg-[#6C757D]' +
                    ' after:bg-[#6C757D]' +
                    ' before:from-[#ADB5BD]' +
                    ' before:to-transparent'} ${isDaySelected && 'bg-[#6C757D] hover:bg-[#6C757D]' +
                    ' after:bg-[#6C757D]' +
                    ' before:from-[#ADB5BD]' +
                    ' before:to-transparent'} lg:min-h-[50px] after:h-[97%] after:w-[97%] after:z-8 after:rounded-full after:absolute after:bg-[#343A40] before:bg-gradient-to-b before:from-[#495057] before:to-transparent before:absolute before:h-full before:w-full before:z-2 before:rounded-full text-white rounded-full justify-center flex flex-col items-center relative h-full min-w-[50px] bg-[#343A40] text-xl z-2`}
                >
                    <span className='z-10'>{i + 1}</span>
                </p>
            </div>)
    })
}

export default GeneratorDays;