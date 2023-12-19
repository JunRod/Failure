import Logout from "@components/logout";
import Login from "@components/login";
import "@styles/profileClient.css"
import {getSession} from "@auth0/nextjs-auth0";

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
                <img className='border-[1px] border-white' src={user.picture} alt={user.name}/>
                <span className='text-lg'>{user.given_name}</span>
            </section>
            <Logout email={email}/>
        </>
    )
}

export default ProfileClient;

