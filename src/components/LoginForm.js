import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';

const LoginForm = () => {
    const [user, setUser] = useState();
    const dispatch = useDispatch();
    const history = useHistory();

    const handleInput = (e) => {
        const name = e.target.name;

        setUser({ ...user, [name]: e.target.value });
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('https://mjoycer-dormie-backend.herokuapp.com/users/login', user).then(res => {
            dispatch({ type: 'LOGIN', payload: res.data.auth });
            history.push('/home');
        });
    }

    return (
        <>
            <div className="landingPage d-flex flex-column align-items-center justify-content-center flex-wrap center">
                <div className="brand mb-5">
                    <h1>DORMIE</h1>
                    <p>roommate app</p>
                </div>

                <form className="d-grid gap-3" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={(e) => handleInput(e)}
                        required />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={(e) => handleInput(e)}
                        required />
                    <Button type="submit"> Login </Button>
                </form>

                <Link to="/register">Register</Link>
            </div>
        </>
    );
}

export default LoginForm;