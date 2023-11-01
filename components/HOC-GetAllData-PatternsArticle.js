import PatternsArticle from "@components/PatternsArticle.js";
import {getArticlesByDay} from "@db/index.js";
import {OpenAIChat} from "@ia/index.js";
import {collectionsToString} from "@lib/utils.js";

async function HocGetAllDataPatternsArticle({searchParams}) {

    /*Convierte los value de los parametros en numeros.*/
    const numericObject = Object.fromEntries(
        Object.entries(searchParams).map(([key, value]) => [key, parseInt(value, 10)])
    );

    const articles = await getArticlesByDay(numericObject)

    /*Agarramos los collection.content de las colecciones y convertirmos a un solo string*/
    const contentsString = collectionsToString(articles)

    const ia = new OpenAIChat("dP78Zavrx8kpmFZt2Z1Iz5p4BeFXe4zrAH_ytbNsB0w")

    const result = await ia.main(contentsString);
    const chunks = [];

    for await (const chunk of result) {
        chunks.push(chunk);
    }

    return <PatternsArticle chunks={chunks}/>
}

export default HocGetAllDataPatternsArticle;