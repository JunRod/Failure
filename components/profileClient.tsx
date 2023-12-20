import Logout from "@components/logout";
import Login from "@components/login";
import {getSession} from "@auth0/nextjs-auth0";
import Image from "@node_modules/next/image";

async function ProfileClient() {
    const session = await getSession();

    if (!session) return (
        <Login/>
    );

    const {user} = session;
    const {email} = user;

    return user && (
        <>
            <section className='flex flex-row gap-3 items-center'>
                <Image
                    quality={100}
                    width={13}
                    height={13}
                    className={`h-[40px] w-[40px] relative border-[1px] border-white flex rounded-full bg-white`}
                    src={user?.picture ?? ''} alt="image"
                />
                <span className='text-lg'>{user.given_name}</span>
            </section>
            <Logout email={email}/>
        </>
    )
}

export default ProfileClient;

