'use client'

import Link from "next/link";
import {usePathname} from "next/navigation";
import {useDispatch} from "react-redux";
import {addRange, reset, setArticleActive, setOptionSelected, setRunGPT, setShowConfigGpt} from "@store/diarySlice.js";


function ButtonGeneradosOrDiario() {

    const result = usePathname()
    const dispatch = useDispatch()

    function controllerOnClick() {
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
            prefetch={true}
        >
            {result === '/' ? 'Generados' : 'Diario'}
        </Link>
    );
}

export default ButtonGeneradosOrDiario;