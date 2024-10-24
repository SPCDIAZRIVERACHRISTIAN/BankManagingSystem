/**
 * Credit Card List component
 *
 * makes a list of credit cards belonging to the user associated with the credit cards.
 * uses delete component to delete a card.
 */
import { useEffect, useState } from 'react';
import api from '../api';
import { FaPencilAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import DeleteButton from './DeleteButton';

const CreditCardList = () => {
  const [creditCards, setCreditCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
      const fetchCreditCards = async () => {
          try {
              const token = localStorage.getItem('ACCESS_TOKEN');
              const response = await api.get('/api/credit-cards/', {
                  headers: {
                      'Authorization': `Bearer ${token}`
                  }
              });
              console.log(response.data);
              setCreditCards(response.data);
          } catch (err) {
              setError(err);
          } finally {
              setLoading(false);
          }
      };

      fetchCreditCards();
  }, []);

  const handleEdit = (id) => {
      navigate(`/edit-credit/${id}`);
  };

  const handleDelete = (type, id) => {
    setCreditCards(creditCards.filter((card) => card.id !== id));
  };
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto my-8">
        <h1 className="text-xl font-bold text-center mb-6">Credit Cards</h1>
        <div className="shadow-lg rounded-lg p-6 m-4 w-80 mx-auto bg-white">
            <ul className="space-y-4">
                {creditCards.map((card) => (
                    <li key={card.id}>
                        <p className="font-semibold">
                            Card Number: <span className="font-normal">{card.card_number}</span>
                        </p>
                        <p className="font-semibold">
                            Expiry Date: <span className="font-normal">{card.expiry_date}</span>
                        </p>
                        <div className="flex space-x-4 mt-2">
                            <button
                                onClick={() => handleEdit(card.id)}
                                className="text-blue-500 hover:text-blue-700"
                            >
                                <FaPencilAlt className="mr-1" /> Edit
                            </button>
                            <DeleteButton type="credit-card" id={card.id} onDelete={handleDelete} />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    </div>
);
};

export default CreditCardList;
