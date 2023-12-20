'use client'

import {toast} from "sonner";
import {useCompletion} from "ai/react";
import {useAppDispatch, useAppSelector} from "@redux/hooks";
import {useEffect, useRef, useState} from "react";
import {setChatData, setIsLoadingGPT, setSaveChatInDataUser, setUpdateLastChat} from "@redux/diarySlice";
import {useRouter} from "next/navigation";
import LogoGPT from "@components/logoGPT";
import OptionsChatGPT from "@components/optionsChatGPT";
import {useUser} from "@auth0/nextjs-auth0/client";
import Image from "next/image";

function ChatGpt() {

    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
    const divRef = useRef<HTMLDivElement>(null);
    const [textArea, setTextArea] = useState('')
    const dispatch = useAppDispatch()
    const {
        chatData,
        dataUserActive,
        range,
        MonthSelected,
    } = useAppSelector(state => state.diary)
    const {completion, complete, stop, isLoading} = useCompletion(
        {
            api: '/api/completion',
        }
    )
    const {user} = useUser();

    function onClick(prompt?: string) {


        if (!dataUserActive || !range) return null

        const {today, twoDay} = range

        /*Verificamos si existen almenos 2 articulos en el rango seleccionado*/
        const moreThanOne = dataUserActive.data
            .filter((document) =>
                ((document.day <= twoDay && document.day >= today) || (document.day <= today && document.day >= twoDay))
            )
            .map(document => document.articles)
            .flat()

        if (moreThanOne.length < 2) return toast.error('Debe haber al menos 2 articulos para interactuar con ellos')

        /*Formateamos el content de los articulos encontrados*/
        const resultRange = moreThanOne.map((article, index) => `[Nota ${index + 1}]: ${article.content}`)
            .join('\n')

        const promptFinal = `${prompt ? prompt : textArea}: \n${resultRange}`

        /*Primero insertamos el prompt.*/
        dispatch(setChatData(
            {...chatData, chat: [...chatData.chat, {prompt: prompt ? prompt : textArea, completion: ''}]}
        ))

        complete(promptFinal)

        setTextArea('')
    }

    function optionSelected(option: string) {
        onClick(option)
    }

    /*Actualizamos el chat que actualmente estamos interactuando cada que hay un complete
    * o respuesta de gpt
    * */
    useEffect(() => {
        if (completion) dispatch(setUpdateLastChat(completion))
    }, [completion]);

    function createTitle() {
        const currentYear = new Date().getFullYear()

        if (!range) return null

        if (range.today === range.twoDay) {
            return `Interactuando con articulos del ${range.today}/${MonthSelected}/${currentYear}`
        } else {
            return `Interactuando con articulos del ${range.today}/${MonthSelected}/${currentYear} al ${range.twoDay}/${MonthSelected}/${currentYear}`
        }
    }

    /*Actualizar el id de ChatData cada que cambia el range*/
    useEffect(() => {
        if (range) dispatch(setChatData({...chatData, id: `${range.today}-${range.twoDay}-${MonthSelected}`}))
    }, [range]);

    /*Cuando enviamos una prompt, entonces ya podemos guardar el chat en DataUserActive*/
    useEffect(() => {
        if (chatData.chat.length > 0) dispatch(setSaveChatInDataUser(chatData))
    }, [chatData.chat]);

    /*Cuando seleccionamos otro rango, verificamos si el chat ya existe con los datos de ese rango.
    * si existe, entonces mostramos el chat
    * */
    useEffect(() => {
        function getChatData() {
            if (!range) return null

            const {today, twoDay} = range
            const idCurrentChat = `${today}-${twoDay}-${MonthSelected}`
            const idCurrentReverse = `${twoDay}-${today}-${MonthSelected}`

            const result = dataUserActive?.chats?.find(
                (chat) => chat?.id === idCurrentChat || chat?.id === idCurrentReverse
            )

            if (result) {
                dispatch(setChatData(result))
            } else {
                dispatch(setChatData({id: idCurrentChat, chat: []}))
            }
        }

        getChatData()
    }, [range, MonthSelected]);


    /*isLoading global para no interrumpir la generacion de gpt apretando los articles o chats.
    * para eso esta el boton de stop priemero.*/
    useEffect(() => {
        dispatch(setIsLoadingGPT(isLoading))
    }, [isLoading]);

    /*Scroll cuando generamos respuesta con IA*/
    useEffect(() => {
        function scrollDown() {
            if (!divRef?.current) return null
            divRef.current.scrollTop = divRef.current.scrollHeight
        }

        scrollDown()
    }, [completion, chatData]);

    useEffect(() => {
        const textArea = textAreaRef?.current;
        if (textArea) {
            textArea.style.height = 'auto';
            textArea.style.height = textArea.scrollHeight - 40 + 'px';
        }
    }, [textArea]);

    return (
        <div className='relative flex flex-col justify-between min-h-full '>
            <div
                className='mb-3 w-full flex justify-end bg-gradient-to-b from-[#ADB5BD] font-medium from-30% to-80% to-transparent bg-clip-text text-transparent'>
                GPT 4 Turbo
            </div>
            <h1 className='text-center text-[#656D75] font-light text-sm'>{createTitle()}</h1>
            {
                chatData?.chat?.length > 0 ?
                    (<div ref={divRef}
                          className='lg:h-full lg:scrollbar-thumb-[#495057] lg:scrollbar-thumb-rounded-full lg:scrollbar lg:scrollbar-w-[6px] flex flex-col my-6 max-h-[600px] overflow-y-auto gap-5'>
                        {
                            chatData?.chat?.map((chat, index) => (
                                    <section key={index}
                                             className='last:border-0 flex flex-col gap-5 border-b-[1px] border-[#495057] pb-5'>
                                        <div className=' self-start flex flex-row gap-2'>
                                            <Image
                                                width={13}
                                                height={3}
                                                className={`h-[20px] w-[20px] relative flex rounded-full bg-white`}
                                                src={user?.picture ?? ''} alt="image"
                                            />
                                            <div>
                                                <span className='font-semibold'>Tu</span>
                                                <h2>{chat.prompt}</h2>
                                            </div>
                                        </div>
                                        <div className='self-start text-left flex flex-row gap-1'>
                                            <div
                                                className={`h-[20px] min-w-[20px] relative flex rounded-full bg-white`}
                                            >
                                                <svg
                                                    className='w-full h-full'
                                                    viewBox="0 0 512 512">
                                                    <path
                                                        d="M378.68 230.011a71.432 71.432 0 003.654-22.541 71.383 71.383 0 00-9.783-36.064c-12.871-22.404-36.747-36.236-62.587-36.236a72.31 72.31 0 00-15.145 1.604 71.362 71.362 0 00-53.37-23.991h-.453l-.17.001c-31.297 0-59.052 20.195-68.673 49.967a71.372 71.372 0 00-47.709 34.618 72.224 72.224 0 00-9.755 36.226 72.204 72.204 0 0018.628 48.395 71.395 71.395 0 00-3.655 22.541 71.388 71.388 0 009.783 36.064 72.187 72.187 0 0077.728 34.631 71.375 71.375 0 0053.374 23.992H271l.184-.001c31.314 0 59.06-20.196 68.681-49.995a71.384 71.384 0 0047.71-34.619 72.107 72.107 0 009.736-36.194 72.201 72.201 0 00-18.628-48.394l-.003-.004zM271.018 380.492h-.074a53.576 53.576 0 01-34.287-12.423 44.928 44.928 0 001.694-.96l57.032-32.943a9.278 9.278 0 004.688-8.06v-80.459l24.106 13.919a.859.859 0 01.469.661v66.586c-.033 29.604-24.022 53.619-53.628 53.679zm-115.329-49.257a53.563 53.563 0 01-7.196-26.798c0-3.069.268-6.146.79-9.17.424.254 1.164.706 1.695 1.011l57.032 32.943a9.289 9.289 0 009.37-.002l69.63-40.205v27.839l.001.048a.864.864 0 01-.345.691l-57.654 33.288a53.791 53.791 0 01-26.817 7.17 53.746 53.746 0 01-46.506-26.818v.003zm-15.004-124.506a53.5 53.5 0 0127.941-23.534c0 .491-.028 1.361-.028 1.965v65.887l-.001.054a9.27 9.27 0 004.681 8.053l69.63 40.199-24.105 13.919a.864.864 0 01-.813.074l-57.66-33.316a53.746 53.746 0 01-26.805-46.5 53.787 53.787 0 017.163-26.798l-.003-.003zm198.055 46.089l-69.63-40.204 24.106-13.914a.863.863 0 01.813-.074l57.659 33.288a53.71 53.71 0 0126.835 46.491c0 22.489-14.033 42.612-35.133 50.379v-67.857c.003-.025.003-.051.003-.076a9.265 9.265 0 00-4.653-8.033zm23.993-36.111a81.919 81.919 0 00-1.694-1.01l-57.032-32.944a9.31 9.31 0 00-4.684-1.266 9.31 9.31 0 00-4.684 1.266l-69.631 40.205v-27.839l-.001-.048c0-.272.129-.528.346-.691l57.654-33.26a53.696 53.696 0 0126.816-7.177c29.644 0 53.684 24.04 53.684 53.684a53.91 53.91 0 01-.774 9.077v.003zm-150.831 49.618l-24.111-13.919a.859.859 0 01-.469-.661v-66.587c.013-29.628 24.053-53.648 53.684-53.648a53.719 53.719 0 0134.349 12.426c-.434.237-1.191.655-1.694.96l-57.032 32.943a9.272 9.272 0 00-4.687 8.057v.053l-.04 80.376zm13.095-28.233l31.012-17.912 31.012 17.9v35.812l-31.012 17.901-31.012-17.901v-35.8z"/>
                                                </svg>
                                            </div>
                                            <div className='flex flex-col'>
                                                <span className='font-semibold relative'>ChatGPT</span>
                                                <span className='flex flex-row'>
                                                    {chat.completion}
                                                    {chat.completion.length === 0 ? (
                                                        <div
                                                            className='mt-2 invert gap-1 flex space-x-2 justify-center items-center'>
                                                            <div
                                                                className='h-2 w-2  bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                                                            <div
                                                                className='h-2 w-2 !m-0 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                                                            <div
                                                                className='h-2 w-2 !m-0 bg-black rounded-full animate-bounce'></div>
                                                        </div>
                                                    ) : <div></div>}
                                                </span>
                                            </div>
                                        </div>
                                    </section>
                                )
                            )
                        }
                    </div>)
                    : (
                        <div className='max-h-full relative flex flex-col'>
                            <div
                                className='relative mt-[50px] mb-[50px] flex flex-col justify-center items-center'>
                                <LogoGPT/>
                                <h2 className='font-semibold'>¿Cómo puedo ayudarte hoy?</h2>
                            </div>
                            <OptionsChatGPT optionSelected={optionSelected}/>
                        </div>
                    )
            }
            <div className='relative w-full flex flex-row '>
                <textarea
                    ref={textAreaRef ?? null}
                    className='z-20 max-h-[130px] placeholder:font-light placeholder:text-[#fff] placeholder:opacity-40  p-2 pr-10 focus:outline-0 flex flex-col justify-center resize-none border-[1px] focus:border-[#ACACAC] border-[#8D9094FF] rounded-[10px] bg-transparent w-full relative'
                    wrap='hard'
                    placeholder={'Mensaje a' +
                        ' ChatGPT'}
                    value={textArea}
                    onChange={(e) => setTextArea(e.target.value)}>
                </textarea>
                <div className=' flex flex-col h-full w-full justify-center absolute'>
                    {
                        isLoading
                            ? (
                                <span
                                    className='z-30 mr-3 self-end absolute rounded-full border-[1px] border-[#D9D9D9] w-[24px] h-[24px]'
                                    onClick={stop}>
                                    <span
                                        className='bg-[#D9D9D9] w-[10px] h-[10px] absolute top-[7px] right-[7.5px]'>
                                    </span>
                                </span>
                            )
                            : (<button
                                className={`${!textArea ? 'opacity-20' : 'opacity-100'} z-30 mr-3 self-end bg-[#fff] rounded-[5px] absolute`}
                                disabled={!textArea}
                                onClick={() => onClick()}
                            >
                                <svg width="24" height="24" viewBox="0 0 23 23" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.5 4.7915V18.2082" stroke="black" strokeWidth="2" strokeLinecap="round"
                                          strokeLinejoin="round"/>
                                    <path d="M15.3333 8.62484L11.5 4.7915" stroke="black" strokeWidth="2"
                                          strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M7.66675 8.62484L11.5001 4.7915" stroke="black" strokeWidth="2"
                                          strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>)
                    }
                </div>
            </div>
        </div>
    );
}


export default ChatGpt;