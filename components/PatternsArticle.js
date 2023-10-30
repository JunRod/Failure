'use client'

import {useEffect, useState} from "react";

function PatternsArticle({chunks}) {

    const [text, setText] = useState('')

    useEffect(() => {

        const delay = 70
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

export default PatternsArticle;