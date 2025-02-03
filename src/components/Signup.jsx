import React, { useState }from "react";
import axios from "axios";

export default function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsername = (e) => {
        setUsername(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const data = {username, password};

        try {
            const response = await axios.post("http://localhost:5000/auth/signup", data)
            if(response.status == 201) {
                const { token } = response.data;
                localStorage.setItem("token", token);
                alert("Successful Log in");
                window.location.href = "/"
            }
        }
        catch(error) {
            console.error(error.response?.data || error.message);
            alert(error.response?.data?.error || "Error during login. Please try again.");
        }

    }   
    return (
        <form onSubmit = {handleSubmit}>
            <label>Username</label>
            <input
                id = "username"
                type = "text"
                value = {username}
                onChange = {handleUsername}
                required
            />
            <label>Password</label>
            <input
            id = "password"
            type = "password"
            value = {password}
            onChange = {handlePassword}
            required
            />
            <button type = "submit">
                Sign up
            </button>
        </form>
    )
}