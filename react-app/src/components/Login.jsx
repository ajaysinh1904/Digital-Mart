import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import { useState } from "react";
import axios from "axios";
import API_URL from "../constants";
import './Login.css';

function Login() {
    const navigate = useNavigate()

    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');

    const handleApi = () => {
        const url = API_URL + '/login';
        const data = { username, password };
        axios.post(url, data)
            .then((res) => {
                if (res.data.message) {
                    if (res.data.token) {
                        localStorage.setItem('token', res.data.token);
                        localStorage.setItem('userId', res.data.userId);
                        navigate('/');
                    }
                }
            })
            .catch((err) => {
                alert('SERVER ERR')
            })
    }

    return (
        <div>
            <Header />
            <div className="login-container">
    <div className="login-box">
        <h3>Welcome to Login Page!!</h3>
        <div className="form-group">
            <label htmlFor="username">Username</label>
            <input id="username" className="form-control" type="text" value={username}
                onChange={(e) => {
                    setusername(e.target.value);
                }} />
        </div>
        <div className="form-group">
            <label htmlFor="password">Password</label>
            <input id="password" className="form-control" type="password" value={password}
                onChange={(e) => {
                    setpassword(e.target.value);
                }} />
        </div>
        <div className="button-group">
            <button className="btn btn-primary" onClick={handleApi}>LOGIN</button>
            <Link className="btn btn-secondary" to="/signup">SIGNUP</Link>
        </div>
    </div>
</div>

        </div>
    )
}

export default Login;