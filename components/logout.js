'use client'

import {memo, useEffect, useState} from "react";
import {useApp} from "@realm-web/useApp.js";
import {useDispatch, useSelector} from "react-redux";
import {setDataUserActive} from "@store/diarySlice.js";
import Diary from "@styles/diary.module.css";

const Logout = memo(function Logout({email}) {

    const dispatch = useDispatch()
    const {dataUserActive} = useSelector(state => state.diary)
    const [appSessionRealm, setAppSessionRealm] = useState(null)

    /*Cuando hacemos logout, */
    async function controllerSaveDataUserActiveInMongoDB() {
        const result = await appSessionRealm.functions.replaceDataUser(dataUserActive)
        console.log(result)
    }

    async function getAppSessionRealm() {
        if (dataUserActive) return null
        if (appSessionRealm) return null
        const app = await useApp()
        setAppSessionRealm(app)
    }

    /*Tenemos el dataUserActive en el localSotrage por cada cambio que se le haga por una razon:
    * si el usuario cierra la pagina sin hacer logout, no se pierda los ultimos cambios del dataUserActive.
    * */
    useEffect(() => {
        function updateDataUserActive() {
            if (!dataUserActive) return null
            const {user} = dataUserActive
            localStorage.setItem(user, JSON.stringify(dataUserActive))
        }

        updateDataUserActive()
    }, [dataUserActive]);

    useEffect(() => {
        function getLocalStorage() {
            const resultLocalStorage = JSON.parse(localStorage.getItem(email)) || null

            /*Si existe en localSotrage ya no hay necesidad de ejecutar realm para traernos los datos de mongo*/
            if (resultLocalStorage) dispatch(setDataUserActive(resultLocalStorage))

            /*Tenemos que ejecutar el realm ya que usaremos appSesionRealm al hacer logout, mandaremos todo
            *  dataUserActive a mongodb, de tal manera que si el usuario borra el localSotrage, podamos recuperar
            * los datos de mongodb.
            * */
            getAppSessionRealm()
        }

        getLocalStorage()
    }, [email]);


    useEffect(() => {
        async function getOrCreateUserInRealm() {
            /*Si dataUserActive, ya no traemos nada de mongodb*/
            if (dataUserActive) return null
            if (!appSessionRealm) return null

            const result = await appSessionRealm.functions.getOrCreateUser(email)
            const resultFormatter = JSON.parse(JSON.stringify(result))

            /*Si no hay nada en dataUserActive entonces lo guardamos*/
            dispatch(setDataUserActive(resultFormatter))
        }

        getOrCreateUserInRealm()
    }, [appSessionRealm]);


    return (
        <a
            className={Diary.auth0Link}
            onClick={controllerSaveDataUserActiveInMongoDB}
            href={"/api/auth/logout"}
        >Logout</a>
    );
})

export default Logout;

