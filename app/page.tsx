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
                className={'h-[50px] flex flex-row justify-start gap-3 overflow-hidden relative lg:flex-col' +
                    ' lg:h-full lg:min-w-[50px]'}>
                <GPTButton/>
                <ButtonMonth/>
                <div
                    className={'gap-3 flex flex-row relative overflow-x-scroll h-full lg:flex-col' +
                        ' lg:overflow-x-hidden lg:scrollbar-none lg:scrollbar'}>
                    <IsDaysOrMonth/>
                </div>
            </section>
            <section className='flex flex-col w-full lg:max-w-[45%] gap-3'>
                <ButtonCreateArticle/>
                <div
                    className='lg:scrollbar-none flex flex-col w-full gap-3 h-[250px] overflow-hidden overflow-y-auto relative lg:h-full'>
                    <GenerateArticles/>
                </div>
            </section>
        </>
    )
}

export default Page;