import Form from "../components/Form";
import { Link } from "react-router-dom";

function Login() {
    return <Form route="/api/token/" method="login" showRegisterLink='true' />
}
export default Login;
