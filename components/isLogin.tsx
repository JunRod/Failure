'use client'

import {useUser} from "@auth0/nextjs-auth0/client";

function IsLogin() {
    const {user} = useUser();

    return !!user;
}

export default IsLogin;