"use client"

import Diary from "@styles/diary.module.css";
/*import {setKeyComplete, setKeyActive} from "@store/diarySlice";*/
import {useDispatch, useSelector} from "react-redux";

function ConfigButton() {

    const dispatch = useDispatch();
    const {/*keyActive, keyComplete*/rangue} = useSelector(state => state.diary);
    /*const [key, setKey] = useState("")
    const [error, setError] = useState(false)*/

    /*function saveButton() {
        if (key.length < 1) {
            dispatch(setKeyComplete(false))
            setError(true)
            return
        }
        setError(false)
        dispatch(setKeyComplete(true))
        dispatch(setKeyActive(false))
    }*/

    return (
        <>
            <svg
                /*onClick={() => dispatch(setKeyActive(!keyActive))}*/
                className={Diary.configSvg}
                x="0px" y="0px" width="122.88px" height="121.203px" viewBox="0 0 122.88 121.203">
                <path fillRule="evenodd"
                      style={{transition: "fill 0.2s ease-in-out"}}
                      fill={`${rangue ? "#14cc9f" : "#FFF"}`}
                      d="M82.299,60.756l40.581,41.111v19.336h-19.2v-14.535H87.771v-15.91H72.546 L68.145,76.42c-7.01,4.674-15.514,7.412-24.678,7.412C19.466,83.832,0,65.063,0,41.916S19.466,0,43.467,0 c24.002,0,43.465,18.77,43.465,41.916C86.932,48.692,85.261,55.091,82.299,60.756L82.299,60.756z M37.22,28.487 c4.283,0,7.76,3.474,7.76,7.76c0,4.286-3.477,7.76-7.76,7.76c-4.286,0-7.76-3.474-7.76-7.76 C29.459,31.961,32.934,28.487,37.22,28.487L37.22,28.487z"/>
            </svg>

            {/*<div className={`${Diary.containerInput}  ${keyActive ? Diary.containerInputActive : ""}`}>
                <input placeholder={"Ingresa tu key"} type="text"
                       onChange={(e) => setKey(e.target.value)}
                       className={`${Diary.input} ${keyActive ? Diary.inputActive : Diary.error}  ${error ? Diary.errorActive : Diary.error}`}/>
                <button
                    onClick={() => saveButton()}
                    className={`${keyActive ? Diary.buttonActive : Diary.button}`}>Guardar
                </button>
            </div>*/}
        </>);
}

export default ConfigButton;