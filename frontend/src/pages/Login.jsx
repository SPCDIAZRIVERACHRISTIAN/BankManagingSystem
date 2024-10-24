/**
 * login
 *
 * displays the form with login method.
 * this method ensures only the login form is displayed and not the register
 */
import Form from "../components/Form";

function Login() {
    return <Form route="/api/token/" method="login" showRegisterLink='true' />
}
export default Login;
