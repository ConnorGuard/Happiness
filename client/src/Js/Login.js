import '../css/login.css';

function Login(props) {
    const handleSubmit = (e) => {
        e.preventDefault();
        props.login();
    }
    //Returns login form
    return (
        <div class="login-form" onSubmit={handleSubmit}>
            <form id="login-form">
                <h1>Login</h1>
                <input type="email" name="email" placeholder="email" required value={props.email} onChange={(e) => {props.setEmail(e.target.value)}} />
                <input type="password" name="password" placeholder="password" required value={props.password} onChange={(e) => {props.setPassword(e.target.value)}} />
                <input class="button" id="submit" type="submit" value="Let's Go!" />
            </form>
        </div>
    );
}

export default Login;
