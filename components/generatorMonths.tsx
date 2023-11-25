'use client'

import {mesesAbreviadosEnEspanol} from "@lib/utils";
import Diary from "@styles/diary.module.css";
import {setArticleActive, setMonthSelected} from "@redux/diarySlice";
import {useEffect, useRef} from "react";
import isLogin from "@components/isLogin";
import {useRouter} from "next/navigation";
import {useAppDispatch, useAppSelector} from "@redux/hooks";

function GeneratorMonths() {

    const dispatch = useAppDispatch();
    const {MonthSelected} = useAppSelector(state => state.diary)
    const currentMonth = useRef<HTMLParagraphElement | null>(null);
    const router = useRouter()
    const resultIsLogin = isLogin()


    useEffect(() => {
        const monthElement = currentMonth.current
        if (monthElement) {
            monthElement.scrollIntoView({
                behavior: "smooth", block: "start",
            })
        }

    }, []);

    function OnClick(mes: string) {
        /*Verificar que este logeado*/
        if (!resultIsLogin) return router.push('/api/auth/login')

        dispatch(setMonthSelected(mes))
        dispatch(setArticleActive(null))
    }

    return (mesesAbreviadosEnEspanol.map(mes => (
            <p
                key={mes}
                ref={mes === MonthSelected ? currentMonth : null}
                className={`${Diary.day} ${mes === MonthSelected ? Diary.monthActive : ''}`}
                onClick={() => OnClick(mes)}
            >
                {mes.charAt(0).toUpperCase() + mes.slice(1)}
            </p>
        )
    ));
}


export default GeneratorMonths;