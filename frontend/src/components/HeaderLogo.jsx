/**
 * header logo component
 *
 * displays the bank manager logo and double as a link to bring the user back to the home
 * page if necesary.
 */
import { Link } from "react-router-dom";
import logo from "../images/logo.png"

export default function HeaderLogo() {
    return (
        <Link to="/" className="flex items-center space-x-3">
            <img src={logo} alt="logo" className="h-16 w-16 ml-4 rounded-full" />
        </Link>
    );
}
