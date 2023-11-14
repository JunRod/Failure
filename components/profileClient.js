import Logout from "@components/logout.js";
import Login from "@components/login.js";
import "@styles/profileClient.css"
import {getSession} from "@auth0/nextjs-auth0";

export const runtime = 'edge';

async function ProfileClient() {
    const session = await getSession();

    if (!session) return (
        <Login/>
    );

    const {user} = session;
    const {email} = user;

    return user && (
        <>
            <section>
                <img src={user.picture} alt={user.name}/>
                <h2>{user.given_name}</h2>
            </section>
            <Logout email={email}/>
        </>
    )
}

export default ProfileClient;

