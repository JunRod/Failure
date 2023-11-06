'use client'

import {useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import Diary from "@styles/diary.module.css";

function ArticleActiveOrCreate() {

    const container = useRef();
    const {articleActive, createArticle} = useSelector(state => state.diary)
    const [valuesState, setValuesState] = useState({
        titleNote: '',
        content: ''
    })
    const {titleNote, content} = valuesState

    useEffect(() => {
        function setValues() {
            if (!articleActive) return null
            setValuesState(articleActive)
        }

        setValues()
    }, [articleActive]);

    function saveCreateArticle(e) {
        const {name, value: valueInput} = e.target;

        /*Aca comparamos el articulo que elegimos (articleActive) con
        * el mismo articulo pero con los cambios que hicimos (valuesState)]
        * De tal manera que si existen cambios, entonces guardamos el nuevo articulo
        * */

        for (const [key, value] of Object.entries(articleActive)) {
            if (key === name) {
                if (value !== valueInput) {

                }
            }
        }
    }

    function controllerOnChange(e) {
        setValuesState(
            {...valuesState, [e.target.name]: e.target.value}
        )
    }

    return (
        articleActive || createArticle ? (
            <div className={Diary.containerTemplateCreateArticle} ref={container}>
            <textarea value={titleNote} onChange={controllerOnChange}
                      onBlur={saveCreateArticle}
                      placeholder={'Titulo'}
                      name={'titleNote'}></textarea>
                <textarea
                    placeholder={'Contenido'}
                    value={content} onChange={controllerOnChange}
                    onBlur={saveCreateArticle}
                    name="content"
                    cols="30"
                    rows="10"></textarea>
            </div>
        ) : (<>No hay articulo activo</>)
    )
}

export default ArticleActiveOrCreate;