import { useHistory } from 'react-router-dom';
import '../styles/LogOut.css'

const LogoutButton = () => {
    const history = useHistory();

    const handleLogout = () => {
        localStorage.removeItem('ACCESS_TOKEN');
        localStorage.removeItem('REFRESH_TOKEN');

        history.push('/login');
    };

    return (
        <button onClick={handleLogout} className="logout-button">
        Log Out
      </button>
    );
};

export default LogoutButton;
