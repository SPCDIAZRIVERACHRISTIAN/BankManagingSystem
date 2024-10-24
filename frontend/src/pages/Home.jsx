/**
 * home
 *
 * displays the home page for the user.
 */
import React, { useState, useEffect } from 'react';
import LoanList from '../components/LoanList';
import CreditCardList from "../components/CreditCardList";
import DebitCardList from '../components/DebitCardList';
import NavBar from '../components/NavBar';
import api from '../api';
import ChatWindow from '../components/ChatWindow';

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
    });

    return (
        <div className="min-h-screen bg-gray-50">
            <NavBar />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
    <div className="flex flex-col items-center w-full">
        <DebitCardList />
    </div>
    <div className="flex flex-col items-center w-full">
        <CreditCardList />
    </div>
    <div className="flex flex-col items-center w-full">
        <LoanList />
    </div>
    <div><ChatWindow /></div>
</div>
        </div>
    );
}

export default Home;
