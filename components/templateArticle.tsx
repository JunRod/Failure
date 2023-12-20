'use client'


import {useEffect, useRef} from "react";
import {
    createDocumentAndInsertOrInsert,
    setArticleActive, setCreateArticle,
    setUpdateArticle,
} from "@redux/diarySlice";
import {usePathname} from "next/navigation";
import {useAppDispatch, useAppSelector} from "@redux/hooks";
import Microphone from "@components/Microphone";

function TemplateArticle() {

    const refTitleNote = useRef<HTMLTextAreaElement | null>(null);
    const dispatch = useAppDispatch()
    const {
        dataUserActive,
        articleActive,
        createArticle,
        daySelected,
        MonthSelected,
        idDocument
    } = useAppSelector(state => state.diary)
    const pathname = usePathname()

    function CreateArticle() {
        /*Verificamos si existe un documento del mes y dia en el que estamos, si no existe, lo creamos*/
        const isExistDocument = dataUserActive?.data.filter(document => document._id === idDocument)[0]

        const newObject = {
            object: articleActive,
            day: daySelected,
            month: MonthSelected,
            isExistDocument: !!isExistDocument,
        }

        dispatch(createDocumentAndInsertOrInsert(newObject))
        dispatch(setCreateArticle(false))
    }

    function UpdateArticle() {
        dispatch(setUpdateArticle(articleActive))
    }

    useEffect(() => {
        function createOrUpdate() {

            /*Si estamos en /generates, cuando hacemos onfucus, no se ejecuta nada*/
            if (pathname === '/generates') return null

            if (createArticle) return CreateArticle()
            UpdateArticle()
        }

        createOrUpdate()
    }, [articleActive]);

    /*Cuando hacemos cambios en cada input entonces tambien actualizamos los campos que se estan
    * cambiando pero en el state de articleActive*/
    function onChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        const {name, value} = e.target;
        dispatch(setArticleActive({...articleActive, [name]: value}))
    }

    /*Cuando createArticle sea true, entonces enfocamos el primer textarea*/
    useEffect(() => {
        function isFocusTextarea() {
            if (!createArticle || !refTitleNote?.current) return null
            refTitleNote.current.focus()
        }

        isFocusTextarea()
    }, [createArticle]);

    if (!articleActive) return (<div className={'text-center'}>Elige un articulo</div>)

    return (
        <div className='flex flex-col'>
            <textarea
                className='lg:scrollbar-thumb-[#495057] lg:scrollbar-thumb-rounded-full lg:scrollbar lg:scrollbar-w-[2px] text-lg  h-auto font-medium z-10 overflow-y-auto focus:outline-0 resize-none text-white border-0 p-0 bg-[#343A40] w-full'
                ref={refTitleNote}
                readOnly={pathname === '/generates'}
                onChange={onChange}
                value={articleActive?.titleNote}
                placeholder='Titulo'
                name='titleNote'
                wrap="soft"
            />
            <textarea
                className='lg:scrollbar-thumb-[#495057] lg:scrollbar-thumb-rounded-full lg:scrollbar lg:scrollbar-w-[2px] my-1 mb-4 h-[400px] font-light overflow-y-auto z-10  focus:outline-0 resize-none text-white border-0 p-0 bg-[#343A40] w-full'
                readOnly={pathname === '/generates'}
                onChange={onChange}
                placeholder='Contenido'
                value={articleActive?.content}
                name="content"
                wrap="hard"
            />
            <Microphone/>
        </div>
    )
}

export default TemplateArticle;