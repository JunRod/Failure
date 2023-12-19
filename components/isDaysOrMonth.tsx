'use client'

import GeneratorDays from "@components/generatorDays";
import GeneratorMonths from "@components/generatorMonths";
import {useAppSelector} from "@redux/hooks";

function IsDaysOrMonth() {
    const {onMonth} = useAppSelector(state => state.diary)

    return onMonth ? <GeneratorMonths/> : <GeneratorDays/>
}

export default IsDaysOrMonth;