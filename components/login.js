import Diary from "@styles/diary.module.css";

function Login() {
    return (
        <a className={Diary.auth0Link} id={'login'} href={"/api/auth/login"}>Login</a>
    );
}

export default Login;