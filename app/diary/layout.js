import Diary from "@styles/diary.module.css"
import ContainerDays from "@components/containerDays";
import ConfigButton from "@components/configButton";
import GPTButton from "@components/GPTButton";

// Al final de hacer el front a la ligera, meterle tailwind y sass.
function Layout({children}) {

    return (<>
        {/*Container the days*/}
        <section className={Diary.containerBlockOne}>
            <div className={Diary.GPT}>
                <GPTButton/>
                {/*<div className={Diary.config}>
                    <ConfigButton/>
                </div>*/}
            </div>
            <div className={Diary.containerDays}>
                <ContainerDays/>
            </div>
        </section>

        <section className={Diary.containerBlockTwo}>
            {children}
        </section>
    </>);
}

export default Layout