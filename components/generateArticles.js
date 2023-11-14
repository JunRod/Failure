'use client'

import Diary from "@styles/diary.module.css";
import {
    addRange, deleteArticle,
    setArticleActive,
    setIdDocument, setOptionSelected,
    setRunGPT, setShowConfigGpt
} from "@store/diarySlice.js";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {toast} from "sonner";

function GenerateArticles() {

    const dispatch = useDispatch();
    const [articles, setArticles] = useState([])
    const [indexDelete, setIndexDelete] = useState(null)
    const {
        articleActive,
        dataUserActive,
        daySelected,
        MonthSelected,
        idDocument
    } = useSelector(state => state.diary)


    function articleSelected(article) {

        dispatch(addRange(null))
        dispatch(setRunGPT(false));
        dispatch(setShowConfigGpt(false));
        dispatch(setOptionSelected(null));
        dispatch(setArticleActive(article));
    }

    function controllerDelete(id, titleNote) {
        setIndexDelete(id)
        dispatch(deleteArticle(id))
        /*Verificar si el articulo que estamos borrando se encuentra en article active para tambien borrarlo de ahi*/
        if (id === articleActive?.id) {
            dispatch(setArticleActive(null))
        }

        const titleToast = titleNote.length > 20 ? `${titleNote.slice(0, 20)}...` : titleNote

        toast.success(`Articulo eliminado: ${titleToast} `)
    }

    /*Si dataUserActive tiene un cambio, entonces verificamos si indexDelete tiene algo,
    * eso significa que estamos borrando, por lo tanto, reiniciamos indexDelete a null
    * */
    useEffect(() => {
        function isDelete() {
            if (!indexDelete) return null
            setIndexDelete(null)
        }

        isDelete()

    }, [dataUserActive]);

    useEffect(() => {
        function filterArticles() {
            if (!dataUserActive) return null
            const {data} = dataUserActive
            const documentMonthAndDay = data?.filter(article => article.day === daySelected && article.month === MonthSelected)

            /*Si encuentra un documento con el mes y dia entonces existe almenos un articulo*/
            if (documentMonthAndDay?.length === 0) {
                setArticles([])
                dispatch(setIdDocument(null))
                return null
            }
            /*Guardamos el id del documento para usarlo en el CRUD*/
            idDocument !== documentMonthAndDay[0]._id && dispatch(setIdDocument(documentMonthAndDay[0]._id))

            setArticles([...documentMonthAndDay[0].articles].reverse())
        }

        filterArticles()
    }, [dataUserActive, daySelected, MonthSelected]);

    return articles.length === 0 ?
        (<h1 className={Diary.notFound}>Ups! No se encontraron articulos</h1>)
        :
        (articles?.map(article => {

            const {id, titleNote, content} = article;
            /*si no hay ningun articleactive activo y no se ha ejecutado el gpt, entonces se pintara el article
             seleccionado*/
            const isArticleActive = id === articleActive?.id ?? false

            return (
                <div
                    onClick={() => articleSelected(article)}
                    key={id}
                    className={`${Diary.article} ${isArticleActive ? Diary.articleActive : ''}`}
                >
                    <div className={Diary.containerTitleDelete}>
                        <h1 className={Diary.title}>{titleNote}</h1>
                        <svg
                            onClick={(e) => {
                                e.stopPropagation()
                                controllerDelete(id, titleNote)
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
                    <p>{content}</p>
                </div>
            )
        }))

}

export default GenerateArticles;
