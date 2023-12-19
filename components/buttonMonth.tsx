'use client'

import {setOnMonth} from "@redux/diarySlice";
import {useAppDispatch, useAppSelector} from "@redux/hooks";
import {useRouter} from "@node_modules/next/navigation";
import isLogin from "@components/isLogin";

function ButtonMonth() {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const resultIsLogin = isLogin()
    const {onMonth, MonthSelected, daySelected} = useAppSelector(state => state.diary)

    function onClick() {
        if (!resultIsLogin) return router.push('/api/auth/login')

        dispatch(setOnMonth(!onMonth))
    }

    return (
        <div
            onClick={onClick}
            className='after:absolute after:h-[96%] after:w-[96%] after:z-8 after:rounded-[9px] after:bg-[#13c79b]  before:absolute before:z-2 before:rounded-[10px] before:bg-gradient-to-b before:from-[#36FFCE] before:to-transparent before:h-full before:w-full relative min-w-[50px] h-full bg-[#13C79B] rounded-[10px] cursor-pointer uppercase text-white flex flex-col items-center justify-center'
        >
            <span
                className=' bg-clip-text text-transparent font-semibold z-10 text-xl absolute mb-2.5 bg-gradient-to-b from-white from-50% to-transparent to-100%'>
                {onMonth ? daySelected : MonthSelected}
            </span>
            <span
                className='bg-clip-text text-transparent bg-gradient-to-b from-white from-50% to-transparent to-100% font-semibold z-10 text-[10px] mt-[18px] tracking-widest'>
                2023
            </span>
        </div>
    );
}

export default ButtonMonth;