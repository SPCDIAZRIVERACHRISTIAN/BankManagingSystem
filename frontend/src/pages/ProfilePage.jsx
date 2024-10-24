/**
 * profile page
 *
 * displays a form to edit profile settings
 */
import Profile from "../components/ProfileSettings";
import NavBar from "../components/NavBar";
import BackButton from "../components/BackButton";

export default function ProfilePage() {
    return (
        <div>
        <NavBar />
        <BackButton />
        <Profile />
        </div>
    );
}

