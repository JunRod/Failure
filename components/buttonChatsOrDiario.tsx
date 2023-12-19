'use client'

import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import {setArticleActive} from "@redux/diarySlice";
import isLogin from "@components/isLogin";
import {useAppDispatch} from "@redux/hooks";


function ButtonChatsOrDiario() {

    const router = useRouter()
    const result = usePathname()
    const dispatch = useAppDispatch()
    const resultIsLogin = isLogin()

    function controllerOnClick() {
        /*Verificar que este logeado*/

        if (!resultIsLogin) return router.push('/api/auth/login')
        dispatch(setArticleActive(null))
    }

    return (
        <Link
            onClick={controllerOnClick}
            href={result === '/' ? '/chats' : '/'}
            prefetch={false}
        >
            {result === '/' ? 'Chats' : 'Diario'}
        </Link>
    );
}

export default ButtonChatsOrDiario;