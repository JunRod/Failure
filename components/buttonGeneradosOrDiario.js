'use client'

import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import {useDispatch} from "react-redux";
import {addRange, setArticleActive, setOptionSelected, setRunGPT, setShowConfigGpt} from "@store/diarySlice.js";
import isLogin from "@components/isLogin.js";


function ButtonGeneradosOrDiario() {

    const router = useRouter()
    const result = usePathname()
    const dispatch = useDispatch()
    const resultIsLogin = isLogin()

    function controllerOnClick() {
        /*Verificar que este logeado*/

        if (!resultIsLogin) return router.push('/api/auth/login')

        dispatch(setRunGPT(false))
        dispatch(setShowConfigGpt(false))
        dispatch(setOptionSelected(null))
        dispatch(addRange(null))
        dispatch(setArticleActive(null))
    }

    return (
        <Link
            onClick={controllerOnClick}
            href={result === '/' ? '/generates' : '/'}
            prefetch={false}
        >
            {result === '/' ? 'Generados' : 'Diario'}
        </Link>
    );
}

export default ButtonGeneradosOrDiario;