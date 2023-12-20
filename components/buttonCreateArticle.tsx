'use client'

import {
    addRange,
    setArticleActive,
    setCreateArticle,
    setShowChatGPT,
} from "@redux/diarySlice";
import ObjectID from "bson-objectid";
import {useRouter} from "next/navigation";
import isLogin from "@components/isLogin";
import {useAppDispatch, useAppSelector} from "@redux/hooks";

function ButtonCreateArticle() {

    const dispatch = useAppDispatch()
    const router = useRouter()
    const resultIsLogin = isLogin()
    const {
        range,
        createArticle,
        showChatGPT
    } = useAppSelector(state => state.diary)

    function onClick() {
        /*Verificar que este logeado*/
        if (!resultIsLogin) return router.push('/api/auth/login')

        const id = ObjectID().toHexString()

        dispatch(setArticleActive({titleNote: '', content: '', id}))
        if (!createArticle) dispatch(setCreateArticle(true))
        if (range) dispatch(addRange(null))
        if (showChatGPT) dispatch(setShowChatGPT(false))
    }

    /*className={Diary.createArticle}*/
    return (
        <div
            onClick={onClick}
            className=' w-full h-[30px] flex items-center justify-center text-white text-center bg-[#343A40] transition-all  relative rounded-[10px] cursor-pointer hover:border-[1px] hover:border-[#6C757D] hover:bg-[#6C757D] ease border-[1px] border-[#495057] hover:h-[45px] duration-100'
        >
            <h1>
                +
            </h1>
        </div>
    );
}

export default ButtonCreateArticle;
