'use client'

import GeneratorDays from "@components/generatorDays";
import GeneratorMonths from "@components/generatorMonths";
import {useAppSelector} from "@redux/hooks";

function IsDaysOrMonth() {
    const {onMonth, onMonthDayText} = useAppSelector(state => state.diary)

    return (
        (onMonth && onMonthDayText) ? <GeneratorMonths/> : <GeneratorDays/>
    )
}

export default IsDaysOrMonth;