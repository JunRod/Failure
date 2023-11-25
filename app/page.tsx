import Diary from "@styles/diary.module.css";
import GPTButton from "@components/GPTButton";
import MonthOnHover from "@components/MonthOnHover";
import IsDaysOrMonth from "@components/isDaysOrMonth";
import GenerateArticles from "@components/generateArticles";
import CreateArticle from "@components/createArticle";

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