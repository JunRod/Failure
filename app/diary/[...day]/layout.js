import Diary from "@styles/diary.module.css";
import "@db"
import CreateArticle from "@components/createArticle.js";
import GetItem from "@components/getItem.js";
import {Suspense} from "react";

async function Layout({children, params}) {


    return (
        <>
            <div className={Diary.containerArticleAndCreate}>
                <CreateArticle/>
                <div className={Diary.containerArticles}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <GetItem params={params}/>
                    </Suspense>
                </div>
            </div>

            <div className={Diary.containerArticle}>
                {children}
            </div>
        </>);
}


export default Layout;