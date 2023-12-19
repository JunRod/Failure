'use client'

import {useEffect, useRef, useState} from "react";
import {addRange, setArticleActive, setChatData, setDeleteChat, setShowChatGPT} from "@redux/diarySlice";
import {toast} from "sonner";
import {useAppDispatch, useAppSelector} from "@redux/hooks";
import {range} from "@node_modules/@mongodb-js/saslprep/dist/util";

interface ChatData {
    prompt: string;
    completion: string;
}

interface ChatDataContainer {
    id: string;
    chat: Array<ChatData>
}

function GenerateChats() {

    const {dataUserActive, range, chatData, isLoadingGPT} = useAppSelector(state => state.diary)
    const [chatsState, setGeneratesState] = useState<Array<ChatDataContainer>>([])
    const dispatch = useAppDispatch()

    function controllerDelete(Chat: ChatDataContainer) {
        const {id, chat} = Chat
        const {prompt} = chat[0] ?? {}

        dispatch(setDeleteChat(id))

        /*Verificar si el articulo que estamos borrando se encuentra en article active para tambien borrarlo de ahi*/
        if (id === chatData?.id) {
            dispatch(setChatData({id: '', chat: []}))
            dispatch(setShowChatGPT(false))
        }

        const titleToast = prompt?.length > 20 ? `${prompt.slice(0, 20)}...` : prompt
        toast.success(`Generado eliminado: ${titleToast} `)
    }

    /*Revertir orden de generates para que se pinte del ultimo al primero*/
    useEffect(() => {
        function getGenerates() {
            if (!dataUserActive) return null

            const {chats} = dataUserActive
            setGeneratesState(chats.length > 0 ? [...chats].reverse() : chats)
        }

        getGenerates()
    }, [dataUserActive]);

    function onClick(Chat: ChatDataContainer) {
        if (isLoadingGPT) return null
        dispatch(setChatData(Chat))
    }

    useEffect(() => {
        function getRange() {
            if (range) return null

            const numerosExtraidos = chatData.id.match(/\d+/g);
            if (numerosExtraidos) dispatch(addRange({
                today: parseInt(numerosExtraidos[0]),
                twoDay: parseInt(numerosExtraidos[1])
            }))
        }

        getRange()

    }, [chatData]);

    if (chatsState.length === 0) return (
        <h1 className='text-center text-white'>Ups! No se encontraron chats.</h1>
    )

    return (
        <div className='flex flex-col w-full gap-3'>

            {chatsState?.map(Chat => {

                const {id, chat} = Chat
                const {prompt, completion} = chat[0] ?? {}
                const isArticleActive = id === chatData.id ?? false

                return (
                    <div
                        onClick={() => onClick(Chat)}
                        key={id}
                        className={`${isArticleActive && 'bg-[#6C757D] border-[1px] border-[#6C757D]'}  group relative flex flex-col gap-2 p-2 rounded-[10px] bg-[#343A40] border-[1px] border-[#495057] min-h-[90px] text-white`}
                    >
                        <div className=' flex flex-row justify-between items-center relative w-full'>
                            <h1 className='font-semibold relative max-h-[50px] w-[90%] overflow-y-auto break-words'>{prompt}</h1>
                            <svg
                                onClick={(e) => {
                                    e.stopPropagation()
                                    controllerDelete(Chat)
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
                        <p className='flex-1 font-normal overflow-hidden line-clamp-3'>{completion}</p>
                    </div>
                )
            })}

        </div>

    )
}

export default GenerateChats;