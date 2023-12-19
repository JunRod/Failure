'use client'

import 'regenerator-runtime/runtime'
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition'
import Image from "next/image";
import {useEffect, useRef, useState} from "react";
import {useAppDispatch, useAppSelector} from "@redux/hooks";
import {setArticleActive} from "@redux/diarySlice";

export default function Microphone() {
    const [showOptionsMicrophone, setShowOptionsMicrophone] = useState(false)
    const [recordingState, setRecordingState] = useState(false)
    const isFirstRender = useRef(true);
    const {
        browserSupportsSpeechRecognition,
        transcript,
        resetTranscript,
    } = useSpeechRecognition();
    const dispatch = useAppDispatch()
    const {articleActive} = useAppSelector(state => state.diary)
    const [prevArticleActiveContent, setPrevArticleActiveContent] = useState<string | undefined>('')

    useEffect(() => {
        if (recordingState) dispatch(setArticleActive({
            ...articleActive,
            content: prevArticleActiveContent + transcript
        }))

    }, [transcript]);

    function onClick() {
        setRecordingState(!recordingState)
        setShowOptionsMicrophone(!showOptionsMicrophone)
    }

    async function isRecording() {
        if (isFirstRender.current) {
            // No ejecutar lógica en el primer renderizado
            isFirstRender.current = false;
            return;
        }
        if (recordingState) {
            await SpeechRecognition.startListening({continuous: true, language: 'es-ES'})
            setPrevArticleActiveContent(articleActive?.content)
        } else {
            await SpeechRecognition.stopListening()
            resetTranscript()
        }
    }

    /*Grabar o detener audio*/
    useEffect(() => {
        isRecording()
    }, [recordingState]);

    if (!browserSupportsSpeechRecognition) {
        return <span>El navegador no admite el reconocimiento de voz.</span>;
    }

    return (
        <Image
            className={`border-[1px] border-[#646D76] rounded-full p-[0.5px] ${recordingState && 'bg-[#646D76]'} cursor-pointer`}
            onClick={onClick}
            src={recordingState ? '/micro-off.svg' : '/micro.svg'}
            width={30} height={30}
            alt={'robot'}
        />

    );
}
