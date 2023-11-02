import {getArticles} from "@db/index.js";
import Diary from "@styles/diary.module.css";
import GenerateArticles from "@components/generateArticles.js";
import "@db"
import CreateArticle from "@components/createArticle.js";

async function Layout({children, params}) {

    /*Este layout encierra el bloque dos, los artriculos y el artive article.*/

    const {day} = params;
    const articles = await getArticles(day[0], Number(day[1]))
    /*await setData()*/

    /*Me puse a pensar otra manera de obtener el articulo cada vez que hago click en cualquier de ellos.
    * La funcionalidad de ahora: usamos un link donde nos lleva a otra segmento que es el id del articulo
    * elegido.
    * Hubiera querido guardar el articulo en el estado y luego mostrarlo en el componente, pero no se puede
    * porque este componente dejaria de ser un componente de servidor y pasaria a ser un componente de cliente.
    * */

    return (<>
        {articles?.length === 0 ? (<div className={Diary.notFound}>
            <h1>Oh! No se encontraron artículos.</h1>
        </div>) : (
            <div className={Diary.containerArticleAndCreate}>
                <CreateArticle/>
                <div className={Diary.containerArticles}>
                    <GenerateArticles articles={articles}/>
                </div>
            </div>

        )}
        <div className={Diary.containerArticle}>
            {children}
        </div>
    </>);
}


export default Layout;