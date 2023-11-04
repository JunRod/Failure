import {Suspense} from "react";
import HocTemplateArticleActive from "@components/HOC-Template-ArticleActive.js";
import GetDataForIA from "@components/getDataForIA.js";

async function Page({params, searchParams}) {

    /*No estoy seguro de esto pero, si un usuario pone http://localhost:3000/diary/26?run=true
    * se ejecuta el gpt automaticamente sin tener un rango y ni la key, no estoy seguro pero podria
    * usar un middleware antes de que llegue a esa url para que verifique esas condiciones, aunque no creo
    * que se ejecute el gpt si no tiene la key, pero si se ejecuta el gpt sin tener un rango, entonces si
    * tendria que hacer un middleware para que verifique si tiene un rango, si no tiene un rango, entonces
    * si podria ejecutar el gpt.
    * */

    if (!searchParams?.today) return <HocTemplateArticleActive/>

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <GetDataForIA searchParams={searchParams}/>
        </Suspense>
    )

}

export default Page;