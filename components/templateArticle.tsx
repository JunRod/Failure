'use client'

import {useEffect, useRef, useState} from "react";
import {useCompletion} from "ai/react";
import {
    Article,
    createDocumentAndInsertOrInsert, saveGenerateInState,
    setArticleActive,
    setCreateArticle, setOptionSelected, setRunGPT, setShowConfigGpt,
    setUpdateArticle
} from "@redux/diarySlice";
import OptionsGpt from "@components/optionsGpt";
import SaveButton from "@components/saveButton";
import ObjectID from "bson-objectid";
import {usePathname} from "next/navigation";
import {toast} from "sonner";
import {useAppDispatch, useAppSelector} from "@redux/hooks";

function TemplateArticle() {

    const textareaContentRef = useRef<HTMLTextAreaElement | null>(null);
    const refTitleNote = useRef<HTMLTextAreaElement | null>(null);
    const dispatch = useAppDispatch()
    const {
        runGPT,
        showConfigGpt,
        dataUserActive,
        articleActive,
        idDocument,
        createArticle,
        MonthSelected,
        daySelected,
        optionSelected,
        range
    } = useAppSelector(state => state.diary)
    const [showButtonSave, setShowButtonSave] = useState(true)
    const [saveGenerate, setSaveGenerate] = useState(false)
    const pathname = usePathname()

    /*SDK IA Vercel*/
    const {completion, complete} = useCompletion(
        {
            api: '/api/completion',
            onFinish: () => {
                setShowButtonSave(true)
            }
        }
    )


    /*Ni bien contentsString tiene algo, se manda a GPT atravez de complete.*/
    useEffect(() => {
        function setComplete() {
            if (!runGPT || !optionSelected || !dataUserActive || !range) return null

            const {today, twoDay} = range

            const MoreThanOne = dataUserActive.data
                .filter((document) =>
                    ((document.day <= twoDay && document.day >= today) || (document.day <= today && document.day >= twoDay))
                )
                .map(document => document.articles)
                .flat()

            if (MoreThanOne.length < 2) {
                toast.error('Debe haber al menos 2 articulos para generar')
                dispatch(setRunGPT(false))
                dispatch(setShowConfigGpt(false))
                dispatch(setOptionSelected(null))
                return null
            }

            const resultRange = MoreThanOne.map((article, index) => `[Nota ${index + 1}]: ${article.content}`)
                .join('\n')

            const promptFinal = `${optionSelected} que se repiten al menos 2 veces. Por favor, enumera cada hábito seguido de un salto de línea y la cantidad de veces que se repitió: \\n${resultRange}`
            complete(promptFinal)
        }

        setComplete()
    }, [runGPT, optionSelected]);

    /*Guardamos el generate el state de  dataUserActive > generates*/
    useEffect(() => {

        function controllerSaveGenerate() {
            if (!saveGenerate || !range) return null
            const newObject = {
                id: ObjectID().toHexString(),
                prompt: `${optionSelected} desde el ${range.today} hasta el ${range.twoDay}`,
                content: completion
            }

            dispatch(saveGenerateInState(newObject))
            dispatch(setShowConfigGpt(false))
            dispatch(setOptionSelected(null))

            /*Meterle al boton otra propiedad pero donde se ejecute opacity a 0*/
            setShowButtonSave(false)
            setSaveGenerate(false)
        }

        controllerSaveGenerate()
    }, [saveGenerate]);

    /*Cuando createArticle sea true, entonces enfocamos el primer textarea*/
    useEffect(() => {
        function isFocusTextarea() {
            if (!createArticle || !refTitleNote?.current) return null
            refTitleNote.current.focus()
        }

        isFocusTextarea()
    }, [createArticle]);

    function saveUpdates(e: React.FocusEvent<HTMLTextAreaElement>) {

        const {name, value} = e.target;

        /*Cuando hacemos onBlur entonces si el articleActive es distinto en valores
        * con su equivalente articulo pero en dataUserActive, reemplazamos
        * el articleActive por el articulo que esta en dataUserActive
        * */

        /*Ya que esto se ejecuta despues de sacar el docus en el textarea
        * entonces cuando en el textarea tenga el complete de la ia, no
        * queremos que esto se ejecute si hacemos onfocus.
        * */
        if (runGPT || pathname === '/generates') return null

        if (createArticle) {

            /*Verificamos que value no este vacia*/
            if (value === '') return null

            /*Verificamos si existe un documento del mes y dia en el que estamos, si no existe, lo creamos*/
            const isExistDocument = dataUserActive?.data.filter(document => document._id === idDocument)[0]

            const newObject = {
                object: articleActive,
                day: daySelected,
                month: MonthSelected,
                isExistDocument: !!isExistDocument,
            }

            /*Si existe entonces agregamos el articulo al documento*/
            dispatch(createDocumentAndInsertOrInsert(newObject))
            dispatch(setCreateArticle(false))

            return null
        }

        /*TODO: PROCESIMIENTO PARA ACTUALIZAR UN ARTICLE*/
        /*Nos traemos el contenedor del mes y dia en el que estamos, esos contienen los articulos*/
        const containerMonthDayCurrent = dataUserActive?.data.filter(article => article._id === idDocument)[0]

        if (!articleActive || !containerMonthDayCurrent) return null

        /*Luego el articulo original equivalente al que esta en articleActive*/
        const articleOriginal = containerMonthDayCurrent?.articles.find(article => article.id === articleActive.id);

        if (!articleActive || !articleOriginal) return null

        /*Verificamos si title o content del articleActive es diferente al title o content del articulo original*/
        for (const [key, value] of Object.entries(articleActive)) {
            if (name === key) {
                if (value !== articleOriginal[key]) {
                    /*Si es diferente entonces tenemos que reemplazar el articleActive por el articulo original*/
                    dispatch(setUpdateArticle(articleActive))
                }
            }
        }
    }

    /*Cuando hacemos cambios en cada input entonces tambien actualizamos los campos que se estan
    * cambiando pero en el state de articleActive*/
    function controllerOnChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        const {name, value} = e.target;
        dispatch(setArticleActive({...articleActive, [name]: value}))

    }

    useEffect(() => {
        function scrollDown() {
            if (!runGPT || !textareaContentRef?.current) return null

            textareaContentRef.current.scrollTop = textareaContentRef.current.scrollHeight
        }

        scrollDown()
    }, [completion]);

    if (showConfigGpt && !runGPT) return (<OptionsGpt/>)

    if (runGPT) return (<>
        <textarea
            ref={textareaContentRef}
            placeholder='Contenido'
            value={completion?.length === 0 ? 'Generando...' : completion}
            name="content"
            wrap="hard"
            readOnly={true}
        />
        <SaveButton setSaveGenerate={setSaveGenerate} showButtonSave={showButtonSave}/>
    </>)

    return articleActive ? (
        <>
            <textarea
                ref={refTitleNote}
                readOnly={pathname === '/generates'}
                onBlur={saveUpdates}
                onChange={controllerOnChange}
                value={articleActive?.titleNote}
                placeholder='Titulo'
                name='titleNote'
                wrap="soft"
            />
            <textarea
                readOnly={pathname === '/generates'}
                onBlur={saveUpdates}
                onChange={controllerOnChange}
                placeholder='Contenido'
                value={articleActive?.content}
                name="content"
                wrap="hard"
            />
        </>
    ) : (<>No hay articulo activo</>)
}

export default TemplateArticle;
