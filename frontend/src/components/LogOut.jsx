import { useNavigate } from 'react-router-dom';
import '../styles/LogOut.css'

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('ACCESS_TOKEN');
        localStorage.removeItem('REFRESH_TOKEN');

        navigate('/login');
    };

    return (
        <button onClick={handleLogout} className="logout-button">
        Log Out
      </button>
    );
};

export default LogoutButton;
