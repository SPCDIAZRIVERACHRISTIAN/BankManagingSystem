import { useEffect } from 'react';
import CreditCardList from '../components/CreditCardList'
import DebitCardList from '../components/DebitCardList'
import LoanList from '../components/LoanList'
import NavBar from '../components/NavBar';
import api from '../api';

function Home() {
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const response = await api.get('/api/userdata/', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = response.data;
                localStorage.setItem('username', data.username);
                localStorage.setItem('first_name', data.first_name);
                localStorage.setItem('last_name', data.last_name);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData();
    }, []);
    return (
        <div>
            <div><NavBar /></div>
            <div><DebitCardList /></div>
            <div><CreditCardList /></div>
            <div><LoanList /></div>
        </div>
    );
}
export default Home;
