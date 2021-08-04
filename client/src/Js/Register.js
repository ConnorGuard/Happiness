import '../css/register.css';
import React, { useEffect, useState } from 'react';
const axios = require('axios');

function Register() {
    const url = "http://131.181.190.87:3000/user/register";
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    //On form submition, Create a new user...
    const handleSubmit = (e) => {
        e.preventDefault();
        const params = { "email": email, "password": password };
        if (password !== passwordConfirm) {
            alert("Passwords Do Not Match");
        } else {
            axios
                .post(url, params)
                .then((res) => {
                    console.log(res);
                    window.location.href = '/Login';
                }).catch((error) => {
                    alert(error.message)
                })
        }
        setPassword("")
        setEmail("")
        setPasswordConfirm("");
    }

    //Returns Register form
    return (
        <div className="register-form" onSubmit={handleSubmit}>
            <form id="register-form" method="post" action="">
                <h1>Register</h1>
                <input type="email" name="email" placeholder="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" name="password" placeholder="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type="password" name="confirmpassword" placeholder="confirm password" required value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
                <input class="button" id="submit" type="submit" value="Let's Go!" />
            </form>
        </div>
    );
}

export default Register;