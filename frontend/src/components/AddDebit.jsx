import React, { useState } from 'react';
import api from '../api';
import BackButton from './BackButton';
import { ACCESS_TOKEN } from '../constants';

const AddDebit = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem(ACCESS_TOKEN);
            if (!token) {
                setMessage('No access token found. Please log in.');
                console.log(token)
                return;
            }

            const formattedExpiryDate = new Date(expiryDate).toISOString().split('T')[0];

            const response = await api.post('/api/debit-cards/', {
                card_number: cardNumber,
                expiry_date: formattedExpiryDate,
                cvv: cvv,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status === 201) {
                setMessage('Debit card added successfully!');
                setCardNumber('');
                setExpiryDate('');
                setCvv('');
            } else {
                setMessage('Failed to add debit card.');
            }
        } catch (error) {
            setMessage('Failed to add debit card.');
            console.error('Error:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div>
            <BackButton />
            <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Add Debit Card</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card Number:</label>
                        <input
                            type="text"
                            id="cardNumber"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">Expiry Date:</label>
                        <input
                            type="date"
                            id="expiryDate"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV:</label>
                        <input
                            type="text"
                            id="cvv"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <button type="submit" className="w-full bg-sky-700 text-yellow-400 py-2 px-4 rounded-md hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 font-bold">
                        Add Debit Card
                    </button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default AddDebit;
