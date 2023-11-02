'use client'

import GeneratorDays from "@components/generatorDays.js";
import {useSelector} from "react-redux";
import GeneratorMonths from "@components/generatorMonths.js";

function IsDaysOrMonth() {
    const {onMonth, onMonthDayText} = useSelector(state => state.diary)

    return (
        (onMonth && onMonthDayText) ? <GeneratorMonths/> : <GeneratorDays/>
    )
}

export default IsDaysOrMonth;