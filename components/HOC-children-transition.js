"use client"

import {useSelector} from "react-redux";
import Transition from "@components/transition.js";

function HocChildrenTransition({children}) {

    const {transition} = useSelector(state => state.diary)

    return (
        <body>
        {children}
        {transition ? (<Transition/>) : null}
        </body>
    );
}

export default HocChildrenTransition;