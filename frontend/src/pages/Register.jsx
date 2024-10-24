/**
 * Register page
 *
 * displays the form in components with the register configuration
 * this is specified by method ensuring only the register
 * form is shown.
 */
import Form from "../components/Form"

function Register() {
    return <Form route="/api/user/register/" method="register" />
}
export default Register;
