'use client'

import TemplateArticle from "@components/templateArticle";
import {useAppSelector} from "@redux/hooks";
import ChatGPT from "@components/ChatGPT";

function HocChatGptTemplateActive() {

    const {showChatGPT} = useAppSelector(state => state.diary)

    return showChatGPT ? <ChatGPT/> : <TemplateArticle/>
}

export default HocChatGptTemplateActive;