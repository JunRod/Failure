'use client'

import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {setRunGPT} from "@store/diarySlice.js";

function IATextEffect({chunks}) {

    const [text, setText] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(setRunGPT(null))
        const delay = 50
        const ArrayToString = async () => {
            for (const chunk of chunks) {
                await new Promise((resolve) => setTimeout(resolve, delay))

                setText(prev => prev + chunk)
            }
        }

        ArrayToString()
    }, []);

    return text

}

export default IATextEffect;