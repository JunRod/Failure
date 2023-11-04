import {useLayoutEffect, useRef} from "react";
import Diary from "@styles/diary.module.css";

function TemplateCreateArticle() {
    const container = useRef();
    let anchoMaximo

    useLayoutEffect(() => {
        if (container.current)
            anchoMaximo = parseInt(container.current.getBoundingClientRect().width)
    }, [container.current]);

    function limitarAncho(e) {

        const inputValue = e.target.value;
        const maxLength = Math.floor((anchoMaximo - 310) / 8);

        if (inputValue.length > maxLength) {
            e.target.value = inputValue
                .slice(0, maxLength)
        }
    }

    function saveCreateArticle(e) {
    }

    return (
        <div className={Diary.containerTemplateCreateArticle} ref={container}>
            <input onBlur={saveCreateArticle} placeholder={'Titulo'} type="text" onInput={limitarAncho}
                   name={'title'}/>
            <textarea onBlur={saveCreateArticle} name="content" cols="30" rows="10"></textarea>
        </div>);
}

export default TemplateCreateArticle;