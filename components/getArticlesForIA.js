import {getArticlesByDay} from "@db/index.js";
import {collectionsToString} from "@lib/utils.js";
import TemplateArticle from "@components/templateArticle.js";

async function GetDataForIA({searchParams}) {

    /*Convierte los value de los parametros en numeros.*/
    const numericObject = Object.fromEntries(
        Object.entries(searchParams).map(([key, value]) => [key, parseInt(value, 10)])
    );

    const articles = await getArticlesByDay(numericObject)

    /*Agarramos los collection.content de las colecciones y convertirmos a un solo string*/
    const contentsString = collectionsToString(articles)

    return <TemplateArticle contentsString={contentsString}/>
}

export default GetDataForIA;