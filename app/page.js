import Diary from "@styles/diary.module.css";
import GPTButton from "@components/GPTButton.js";
import MonthOnHover from "@components/MonthOnHover.js";
import IsDaysOrMonth from "@components/isDaysOrMonth.js";
import GenerateArticles from "@components/generateArticles.js";
import CreateArticle from "@components/createArticle.js";

function Page() {

    /*Esta es plantilla de articulos activos y donde se imprimre la repsuesta de GPT.*/
    return (
        <>
            <section className={Diary.containerBlockOne}>
                <div className={Diary.GPT}>
                    <GPTButton/>
                </div>
                <MonthOnHover/>
                <div className={Diary.containerDays}>
                    <IsDaysOrMonth/>
                </div>
            </section>
            <section className={Diary.containerBlockDos}>
                <CreateArticle/>
                <div className={Diary.containerGenerateArticles}>
                    <GenerateArticles/>
                </div>
            </section>
        </>
    )
}

export default Page;