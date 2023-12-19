'use client'

import {memo, useEffect, useState} from "react";
import {realmApp} from "@realm-web/realmApp";
import {setDataUserActive} from "@redux/diarySlice";
import {useAppDispatch, useAppSelector} from "@redux/hooks";

const Logout = memo(function Logout({email}: { email: string }) {

    const dispatch = useAppDispatch()
    const {dataUserActive} = useAppSelector(state => state.diary)
    const [appSessionRealm, setAppSessionRealm] = useState<Realm.User | null>(null)

    /*Cuando hacemos logout, */
    async function controllerSaveDataUserActiveInMongoDB() {
        if (!appSessionRealm) return null

        await appSessionRealm.functions.replaceDataUser(dataUserActive)
    }

    async function getAppSessionRealm() {
        if (dataUserActive) return null
        if (appSessionRealm) return null
        const app = await realmApp()
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

    //TODO arreglar: tenemos muchas sesiones inciadas en mongo realm en ls

    useEffect(() => {
        function getLocalStorage() {
            const resultLocalStorage = JSON.parse(localStorage.getItem(email) ?? 'null')

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


    /*className={Diary.auth0Link}*/
    return (
        <a
            onClick={controllerSaveDataUserActiveInMongoDB}
            href={"/api/auth/logout"}
            className='text-lg'
        >Salir</a>
    );
})

export default Logout;

