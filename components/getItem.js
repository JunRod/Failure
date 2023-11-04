import GenerateArticles from "@components/generateArticles.js";
import {getArticles} from "@db/index.js";
import {cache} from "react";

export const preload = ({day}) => {
    void getArticles(day[0], Number(day[1]))
}

const GetItem = cache(
    async ({params}) => {

        preload(params)

        const {day} = params;
        const result = await getArticles(day[0], Number(day[1]))
        const simplifiesResult = JSON.parse(JSON.stringify(result))

        return simplifiesResult.length === 0 ? (
            <h1>Oh! No se encontraron artículos.</h1>
        ) : (
            <GenerateArticles result={simplifiesResult}/>
        )
    }
)
export default GetItem;