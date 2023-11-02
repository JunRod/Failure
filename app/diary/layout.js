import Diary from "@styles/diary.module.css"
import GeneratorDays from "@components/generatorDays.js";
/*import ConfigButton from "@components/configButton";*/
import GPTButton from "@components/GPTButton";
import MonthOnHover from "@components/MonthOnHover.js";
import IsDaysOrMonth from "@components/isDaysOrMonth.js";

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
            <MonthOnHover/>
            <div className={Diary.containerDays}>
                <IsDaysOrMonth/>
            </div>
        </section>

        <section className={Diary.containerBlockTwo}>
            {children}
        </section>
    </>);
}

export default Layout