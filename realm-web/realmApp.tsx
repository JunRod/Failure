import * as Realm from "realm-web";

export async function realmApp() {

    const PUBLIC_REALM_APP_ID = process.env.NEXT_PUBLIC_APP_ID;

    if (!PUBLIC_REALM_APP_ID) return null;

    const app = Realm.getApp(PUBLIC_REALM_APP_ID);
    const anonymousUser = Realm.Credentials.anonymous();
    return await app.logIn(anonymousUser);
}

