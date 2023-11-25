"use client"

import Transition from "@components/transition";
import React from "react";
import {useAppSelector} from "@redux/hooks";

function HocChildrenTransition({children}: { children: React.ReactNode }) {

    const {transition} = useAppSelector(state => state.diary)

    return (
        <>
            {children}
            {transition ? (<Transition transition={transition}/>) : null}
        </>

    );
}

export default HocChildrenTransition;