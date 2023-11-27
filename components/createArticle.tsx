'use client'

import Diary from "@styles/diary.module.css";
import {
    addRange,
    setArticleActive,
    setCreateArticle,
    setOptionSelected,
    setRunGPT,
    setShowConfigGpt
} from "@redux/diarySlice";
import ObjectID from "bson-objectid";
import {useRouter} from "next/navigation";
import isLogin from "@components/isLogin";
import {useAppDispatch} from "@redux/hooks";

function CreateArticle() {

    const dispatch = useAppDispatch()
    const router = useRouter()
    const resultIsLogin = isLogin()

    function controllerCreateArticle() {
        /*Verificar que este logeado*/
        if (!resultIsLogin) return router.push('/api/auth/login')

        const id = ObjectID().toHexString()

        dispatch(addRange(null))
        dispatch(setArticleActive({titleNote: '', content: '', id}))
        dispatch(setRunGPT(false));
        dispatch(setShowConfigGpt(false));
        dispatch(setOptionSelected(null));
        dispatch(setCreateArticle(true))
    }

    return (
        <div
            onClick={controllerCreateArticle}
            className={Diary.createArticle}>
            <h1>
                +
            </h1>
        </div>
    );
}

export default CreateArticle;
