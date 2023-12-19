import ButtonMonth from "@components/buttonMonth";
import IsDaysOrMonth from "@components/isDaysOrMonth";
import GenerateArticles from "@components/generateArticles";
import ButtonCreateArticle from "@components/buttonCreateArticle";
import GPTButton from "@components/GPTButton";

function Page() {

    /*Esta es plantilla de articulos activos y donde se imprimre la repsuesta de GPT.*/
    return (
        <>
            <section
                className={'h-[50px] flex flex-row justify-start gap-3 overflow-hidden' +
                    'relative'}>
                <GPTButton/>
                <ButtonMonth/>
                <div className={'gap-3 flex flex-row relative overflow-x-scroll h-full'}>
                    <IsDaysOrMonth/>
                </div>
            </section>
            <section className='flex flex-col w-full'>
                <ButtonCreateArticle/>
                <div
                    className='flex flex-col w-full gap-3 h-[250px] overflow-hidden overflow-y-auto relative'>
                    <GenerateArticles/>
                </div>
            </section>
        </>
    )
}

export default Page;