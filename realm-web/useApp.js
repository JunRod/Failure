import * as Realm from "realm-web";

export async function useApp() {

    const app = await Realm.getApp(process.env.NEXT_PUBLIC_APP_ID);
    const anonymousUser = Realm.Credentials.anonymous();
    return await app.logIn(anonymousUser);
}

