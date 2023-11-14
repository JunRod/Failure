'use client'

import Block_1 from "@components/block_1.js";
import {usePathname} from "next/navigation";


function IsDiaryOrGenerates() {
    const pathname = usePathname()

    return pathname === '/' ? <Block_1/> : null
}

export default IsDiaryOrGenerates;