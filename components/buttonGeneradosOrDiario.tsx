'use client'

import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import {addRange, setArticleActive, setOptionSelected, setRunGPT, setShowConfigGpt} from "@redux/diarySlice";
import isLogin from "@components/isLogin";
import {useAppDispatch} from "@redux/hooks";


function ButtonGeneradosOrDiario() {

    const router = useRouter()
    const result = usePathname()
    const dispatch = useAppDispatch()
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