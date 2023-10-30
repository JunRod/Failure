import ContentArticleActive from "@components/contentArticleActive.js";
import {getArticlesByDay} from "@db/index.js";
import {OpenAIChat} from "@ia/index.js";
import {collectionsToString} from "@lib/utils.js";
import PatternsArticle from "@components/PatternsArticle.js";

async function Page({params, searchParams}) {

    /*No estoy seguro de esto pero, si un usuario pone http://localhost:3000/diary/26?run=true
    * se ejecuta el gpt automaticamente sin tener un rango y ni la key, no estoy seguro pero podria
    * usar un middleware antes de que llegue a esa url para que verifique esas condiciones, aunque no creo
    * que se ejecute el gpt si no tiene la key, pero si se ejecuta el gpt sin tener un rango, entonces si
    * tendria que hacer un middleware para que verifique si tiene un rango, si no tiene un rango, entonces
    * si podria ejecutar el gpt.
    * */

    if (!searchParams?.today) return (<ContentArticleActive/>)


    const numericObject = Object.fromEntries(
        Object.entries(searchParams).map(([key, value]) => [key, parseInt(value, 10)])
    );

    const articles = await getArticlesByDay(numericObject)

    const ia = new OpenAIChat("dP78Zavrx8kpmFZt2Z1Iz5p4BeFXe4zrAH_ytbNsB0w")

    /*Agarramos los collection.content de las colecciones y convertirmos a un solo string*/
    const contentsString = collectionsToString(articles)

    const result = await ia.main(contentsString);
    const chunks = [];

    for await (const chunk of result) {
        chunks.push(chunk);
    }

    return <PatternsArticle chunks={chunks}/>

}

export default Page;