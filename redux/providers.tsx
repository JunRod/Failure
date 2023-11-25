"use client"
import {store} from "@redux/store";
import {Provider} from "react-redux";
import {Props} from "@ts/types";

function Providers({children}: Props) {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
}

export default Providers;