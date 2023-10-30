import {getArticles} from "@db/index.js";
import Diary from "@styles/diary.module.css";
import Articles from "@components/articles.js";
import "@db"

async function Layout({children, params}) {

    const {day} = params;
    const articles = await getArticles(Number(day))

    /*Me puse a pensar otra manera de obtener el articulo cada vez que hago click en cualquier de ellos.
    * La funcionalidad de ahora: usamos un link donde nos lleva a otra segmento que es el id del articulo
    * elegido.
    * Hubiera querido guardar el articulo en el estado y luego mostrarlo en el componente, pero no se puede
    * porque este componente dejaria de ser un componente de servidor y pasaria a ser un componente de cliente.
    * */

    return (
        <>
            {articles?.length === 0 ? (
                <div className={Diary.notFound}>
                    <h1>Oh! No se encontraron artículos.</h1>
                </div>
            ) : (
                <div className={Diary.containerArticles}>
                    <Articles articles={articles}/>
                </div>
            )}
            <div className={Diary.containerArticle}>{children}</div>
        </>
    );
}


export default Layout;