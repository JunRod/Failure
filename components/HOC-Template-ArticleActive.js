'use client'

import TemplateCreateArticle from "@components/TemplateCreateArticle.js";
import ContentArticleActive from "@components/contentArticleActive.js";
import {useSelector} from "react-redux";

function HocTemplateArticleActive() {

    const {articleActive, createArticle} = useSelector(state => state.diary)

    if (articleActive) return <ContentArticleActive/>

    if (createArticle) return <TemplateCreateArticle/>
}

export default HocTemplateArticleActive;