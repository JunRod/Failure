'use client'

import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import Diary from "@styles/diary.module.css";
import {deleteGenerate, setArticleActive} from "@store/diarySlice.js";
import {toast} from "sonner";

function GenerateGenerates() {

    const {dataUserActive, articleActive} = useSelector(state => state.diary)
    const [generatesState, setGeneratesState] = useState([])
    const [indexDelete, setIndexDelete] = useState(null)
    const dispatch = useDispatch()

    function controllerOnClick(generate) {
        const {id, prompt: titleNote, content} = generate
        dispatch(setArticleActive({id, titleNote, content}))
    }

    function controllerDelete(id, titleNote) {
        setIndexDelete(id)
        dispatch(deleteGenerate(id))
        /*Verificar si el articulo que estamos borrando se encuentra en article active para tambien borrarlo de ahi*/
        if (id === articleActive?.id) {
            dispatch(setArticleActive(null))
        }

        const titleToast = titleNote.length > 20 ? `${titleNote.slice(0, 20)}...` : titleNote

        toast.success(`Generado eliminado: ${titleToast} `)
    }

    useEffect(() => {
        function getGenerates() {
            if (!dataUserActive) return null

            const {generates} = dataUserActive
            setGeneratesState([...generates].reverse())
        }

        getGenerates()
    }, [dataUserActive]);

    if (generatesState.length === 0) return (
        <h1 className={Diary.notFound}>Ups! No se encontraron generados</h1>
    )

    return generatesState?.map(generate => {

        const {id, prompt} = generate

        const isArticleActive = id === articleActive?.id ?? false

        return (
            <div
                onClick={() => controllerOnClick(generate)}
                key={generate.id}
                className={`${Diary.article} ${isArticleActive ? Diary.articleActive : ''}`}
            >
                <div className={Diary.containerTitleDelete}>
                    <h1 className={Diary.title}>{generate.prompt}</h1>
                    <svg
                        onClick={(e) => {
                            e.stopPropagation()
                            controllerDelete(id, prompt)
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        className={`${Diary.delete} icon icon-tabler icon-tabler-trash-filled ${indexDelete === id ? Diary.deleteActive : ''}`}
                        width="22" height="22" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"
                        fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path
                            d="M20 6a1 1 0 0 1 .117 1.993l-.117 .007h-.081l-.919 11a3 3 0 0 1 -2.824 2.995l-.176 .005h-8c-1.598 0 -2.904 -1.249 -2.992 -2.75l-.005 -.167l-.923 -11.083h-.08a1 1 0 0 1 -.117 -1.993l.117 -.007h16z"
                            strokeWidth="0" fill="currentColor"></path>
                        <path
                            d="M14 2a2 2 0 0 1 2 2a1 1 0 0 1 -1.993 .117l-.007 -.117h-4l-.007 .117a1 1 0 0 1 -1.993 -.117a2 2 0 0 1 1.85 -1.995l.15 -.005h4z"
                            strokeWidth="0" fill="currentColor"></path>
                    </svg>
                </div>
                <p>{generate.content}</p>
            </div>
        )
    })
}

export default GenerateGenerates;