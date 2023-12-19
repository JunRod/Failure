'use client'

import {
    Article, ArticleActive, deleteArticle,
    setArticleActive, setCreateArticle,
    setIdDocument,
    setShowChatGPT
} from "@redux/diarySlice";
import {useEffect, useState} from "react";
import {toast} from "sonner";
import {useAppDispatch, useAppSelector} from "@redux/hooks";

function GenerateArticles() {

    const dispatch = useAppDispatch();
    const [articles, setArticles] = useState<Array<Article>>([])
    const [indexDelete, setIndexDelete] = useState<string | null>(null)
    const {
        articleActive,
        dataUserActive,
        daySelected,
        MonthSelected,
        idDocument,
        isLoadingGPT,
        createArticle,
        showChatGPT
    } = useAppSelector(state => state.diary)


    function onClick(article: ArticleActive) {
        if (isLoadingGPT) return null

        if (createArticle) dispatch(setCreateArticle(false))
        if (showChatGPT) dispatch(setShowChatGPT(false))
        dispatch(setArticleActive(article));
    }

    function controllerDelete(id: string, titleNote: string) {
        setIndexDelete(id)
        dispatch(deleteArticle(id))
        /*Verificar si el articulo que estamos borrando se encuentra en article active para tambien borrarlo de ahi*/
        if (id === articleActive?.id) dispatch(setArticleActive(null))

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
            const document = data?.filter(article => article.day === daySelected && article.month === MonthSelected)

            /*Si encuentra un documento con el mes y dia entonces existe almenos un articulo*/
            if (document?.length === 0) {
                setArticles([])
                dispatch(setIdDocument(null))
                return null
            }
            const [documentMonthAndDay] = document

            /*Guardamos el id del documento para usarlo en el CRUD*/
            idDocument !== documentMonthAndDay._id && dispatch(setIdDocument(documentMonthAndDay._id))

            setArticles([...documentMonthAndDay.articles].reverse())
        }

        filterArticles()
    }, [dataUserActive, daySelected, MonthSelected]);


    if (articles.length === 0) return (<h1 className='text-white text-center'>Ups! No se encontraron articulos</h1>)

    return articles?.map(article => {

        const {id, titleNote, content} = article;
        /*si no hay ningun articleactive activo y no se ha ejecutado el gpt, entonces se pintara el article
         seleccionado*/
        const isArticleActive = id === articleActive?.id ?? false

        return (
            <div
                onClick={() => onClick(article)}
                key={id}
                className={`${isArticleActive && 'bg-[#6C757D] border-[1px] border-[#6C757D]'} group relative flex flex-col gap-2 p-2 rounded-[10px] bg-[#343A40] border-[1px] border-[#495057] min-h-[90px] text-white`}
            >
                <div className='flex flex-row justify-between items-center relative w-full'>
                    <h1 className='font-medium relative max-h-[50px] w-[90%] overflow-y-auto break-words'>{titleNote ? titleNote : 'Sin' +
                        ' titulo'}</h1>
                    <svg
                        onClick={(e) => {
                            e.stopPropagation()
                            controllerDelete(id, titleNote)
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        className={`hidden group-hover:flex icon icon-tabler icon-tabler-trash-filled `}
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
                <p className='flex-1 font-normal overflow-hidden line-clamp-3'>{content ? content : '...'}</p>
            </div>
        )
    })

}

export default GenerateArticles;
