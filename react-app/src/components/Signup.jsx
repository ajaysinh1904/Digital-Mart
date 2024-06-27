import { Link } from "react-router-dom";
import Header from "./Header";
import { useState } from "react";
import axios from "axios";
import API_URL from "../constants";
import './SignUp.css'
import { useNavigate } from "react-router-dom";

function Signup() {
    const navigate=useNavigate();
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [email, setemail] = useState('');
    const [mobile, setmobile] = useState('');


    const handleApi = () => {
        const url = API_URL + '/signup';
        const data = { username, password, mobile, email };
        axios.post(url, data)
            .then((res) => {
                if (res.data.message) {
                    navigate('/login')
                    alert(res.data.message);
                    
                }
            })
            .catch((err) => {
                alert('SERVER ERR')
            })
    }
    return (
        <div>
            <Header />
            <div className="signup-container">
            <h3 className="signup-heading">Welcome to Signup Page</h3>
            <div className="signup-field">
                <label>USERNAME</label>
                <input className="form-control" type="text" value={username}
                    onChange={(e) => setusername(e.target.value)} />
            </div>
            <div className="signup-field">
                <label>MOBILE</label>
                <input className="form-control" type="text" value={mobile}
                    onChange={(e) => setmobile(e.target.value)} />
            </div>
            <div className="signup-field">
                <label>EMAIL</label>
                <input className="form-control" type="text" value={email}
                    onChange={(e) => setemail(e.target.value)} />
            </div>
            <div className="signup-field">
                <label>PASSWORD</label>
                <input className="form-control" type="password" value={password}
                    onChange={(e) => setpassword(e.target.value)} />
            </div>
            <button className="btn btn-primary signup-button" onClick={handleApi}>SIGNUP</button>
            <Link className="signup-link" to="/login">LOGIN</Link>
        </div>
       
        </div>
    )
}

export default Signup;