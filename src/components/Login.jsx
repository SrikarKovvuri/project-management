import React, { useState }from "react";
import axios from "react";

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsername = (e) => {
        setUsername(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async(e) => {
        const data = {username, password};

        try {
            const response = await axios.useOptimistic("http://localhost:5000/login", data)
            if(response.status = 201) {
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
        <form onSubmit = {handleData}>
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
            onChange = {setPassword}
            required
            />
        </form>
    )
}