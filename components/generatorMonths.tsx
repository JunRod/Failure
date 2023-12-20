'use client'

import {mesesAbreviadosEnEspanol} from "@lib/utils";
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

    function onClick(mes: string) {
        /*Verificar que este logeado*/
        if (!resultIsLogin) return router.push('/api/auth/login')

        dispatch(setMonthSelected(mes))
        dispatch(setArticleActive(null))
    }

    /*className={`${Diary.day} ${mes === MonthSelected ? Diary.monthActive : ''}`}*/
    return mesesAbreviadosEnEspanol.map(mes => (
        <div
            className='cursor-pointer selection:bg-transparent'
            onClick={() => onClick(mes)}
            key={mes}
        >
            <p
                className={` ${MonthSelected === mes && 'bg-[#6C757D] hover:bg-[#6C757D]' +
                ' after:bg-[#6C757D]' +
                ' before:from-[#ADB5BD]' +
                ' before:to-transparent'} lg:min-h-[50px] after:h-[97%] after:w-[97%] after:z-8 after:rounded-full after:absolute after:bg-[#343A40] before:bg-gradient-to-b before:from-[#495057] before:to-transparent before:absolute before:h-full before:w-full before:z-2 before:rounded-full text-white rounded-full justify-center flex flex-col items-center relative h-full min-w-[50px] bg-[#343A40] text-xl z-2`}
                ref={mes === MonthSelected ? currentMonth : null}
            >
                <span className='z-10'>{mes.charAt(0).toUpperCase() + mes.slice(1)}</span>
            </p>
        </div>

    ))
}

export default GeneratorMonths;