"use client"
import {store} from "@store/store";
import {Provider} from "react-redux";

function Providers(props) {
    return (
        <Provider store={store}>
            {props.children}
        </Provider>
    );
}

export default Providers;