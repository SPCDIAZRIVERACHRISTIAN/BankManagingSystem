import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import LoadingIndicator from "./LoadingIndicator";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Form({ route, method, showRegisterLink = false }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] =useState("");
    const [loading, setLoading] = useState(false);
    const [link, setLink] = useState(false);
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";

    if (name === 'login') {
        setLink(true)
    }

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const data = { username, password };
            if (method === "register") {
                data.username = username;
                data.password = password;
                data.first_name = firstName;
                data.last_name = lastName;
                data.email = email;
            }
            const res = await api.post(route, data)
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/")
            } else {
                navigate("/login")
            }
        } catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
                <h1 className="text-2xl font-bold text-center">{name}</h1>
                <input
                    className="form-input w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                />
                <input
                    className="form-input w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                {showRegisterLink && (
                        <p className="mt-4">
                            Don't have an account?{' '}
                            <Link to="/register" className="text-blue-500 hover:text-blue-700">
                                Register here
                            </Link>
                        </p>
                    )}
                {method === "register" && (
                    <>
                        <input
                            className="form-input w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="First Name"
                        />
                        <input
                            className="form-input w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Last Name"
                        />
                        <input
                            className="form-input w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                        />
                    </>
                )}
                {loading && <LoadingIndicator />}
                <button className="form-button w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500" type="submit">
                    {name}
                </button>
            </form>
        </div>
        </div>
    );
}

Form.propTypes = {
    route: PropTypes.string.isRequired,
    method: PropTypes.oneOf(["login", "register"]).isRequired,
};

export default Form
