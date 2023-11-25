import {Toaster} from "sonner";

function ToasterJs() {

    return (<div className={'toaster'}>
        <Toaster
            position="top-center"
            expand={false}
            richColors
        /></div>)
}

export default ToasterJs;