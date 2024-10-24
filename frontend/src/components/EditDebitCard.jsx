/**
 * edit debit card compoenent
 *
 * this component gives the user the ability to update the card information
 * stored on the database.
 *
 * uses navbar for displaying a navbar on top of the page.
 */
import { useState, useEffect } from 'react';
import api from '../api';
import { useParams, useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN } from '../constants';
import NavBar from './NavBar';

const EditDebitCard = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [card, setCard] = useState({ card_number: '', expiry_date: '', cvv: '' });
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchCardDetails = async () => {
            try {
                const token = localStorage.getItem(ACCESS_TOKEN);
                const response = await api.get(`/api/debit-cards/${id}/`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setCard(response.data);
            } catch (error) {
                console.error('Error fetching card details:', error);
            }
        };
        fetchCardDetails();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem(ACCESS_TOKEN);
            const response = await api.put(
                `/api/debit-cards/${id}/`,
                {
                    card_number: card.card_number,
                    expiry_date: card.expiry_date,
                    cvv: card.cvv,
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );
            if (response.status === 200) {
                setMessage('Card updated successfully!');
                navigate('/');
            } else {
                setMessage('Failed to update card.');
            }
        } catch (error) {
            setMessage('Failed to update card.');
            console.error('Error:', error.response?.data || error.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCard((prevCard) => ({
            ...prevCard,
            [name]: value,
        }));
    };

    return (
        <div>
            <NavBar />
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Edit Card</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Card Number:</label>
                    <input
                        type="text"
                        name="card_number"
                        value={card.card_number}
                        readOnly
                        className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-indigo-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Expiry Date:</label>
                    <input
                        type="date"
                        name="expiry_date"
                        value={card.expiry_date || ''}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-indigo-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">CVV:</label>
                    <input
                        type="text"
                        name="cvv"
                        value={card.cvv || ''}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-indigo-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-sky-700 text-yellow-400 py-2 px-4 rounded-lg hover:bg-sky-800 focus:outline-none focus:ring-yellow-500"
                >
                    Update Card
                </button>
            </form>
            {message && <p className="mt-4 text-center text-red-500">{message}</p>}
        </div>
        </div>
    );
};

export default EditDebitCard;
