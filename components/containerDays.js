"use client"

import {useEffect, useRef, useState} from "react";
import Diary from "@styles/diary.module.css";
import {useDispatch, useSelector} from "react-redux";
import {addRange} from "@store/diarySlice";
import Link from "next/link";
import {redirect, usePathname} from "next/navigation";

function ContainerDays() {

    const pathname = usePathname();

    const todayRef = useRef(null);
    const [today, setToday] = useState(new Date().getDate())
    const [twoDay, setTwoDay] = useState(null)
    const dispatch = useDispatch();

    let clickCount = 0;
    let clickTimer;

    const handleMouseDown = (i) => {
        clickCount++;
        if (clickCount === 1) {
            clickTimer = setTimeout(() => {
                // Manejar el clic único después de 300 ms
                setToday(i + 1);
                // Agrega aquí las acciones específicas para el clic único
                clickCount = 0;
            }, 300);
        } else if (clickCount === 2) {
            // Manejar el doble clic
            setTwoDay(i + 1);
            // Agrega aquí las acciones específicas para el doble clic
            clearTimeout(clickTimer);
            clickCount = 0;
        }
    };

    useEffect(() => {
        if (pathname === "/diary") {
            redirect(`/diary/${today}`)
        }
    }, []);

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

    return (Array(31)
        .fill(0)
        .map((_, i) => {

            //Saber el div que contiene el dia de hoy
            const isToday = today === i + 1
            //Le pone un gris mas claro para diferenciarlo del dia seleccionado con un click
            const isTwoDay = twoDay === i + 1

            const isWithinRange = (twoDay && i + 1 >= today && i + 1 <= twoDay) || (twoDay && i + 1 <= today && i + 1 >= twoDay)

            return (
                <Link
                    scroll={false}
                    prefetch={true}
                    key={i}
                    className={`${Diary.day} ${isToday ? Diary.today : ''} ${isWithinRange ? Diary.today : ''} ${isTwoDay ? Diary.twoDay : ''}`}
                    ref={isToday ? todayRef : null}
                    onMouseDown={() => handleMouseDown(i)}
                    href={`/diary/${i + 1}`}
                >
                    {i + 1}
                </Link>)
        }));
}

export default ContainerDays;