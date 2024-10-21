import { useEffect, useState } from 'react';
import api from '../api';
import { FaPencilAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleEdit = (id) => {
      navigate(`/edit-credit/${id}`);
  };

  return (
      <div className="p-6 min-h-screen">
          <h1 className="text-xl font-bold mb-4 text-center">Credit Cards</h1>
          <ul className="space-y-4">
              {creditCards.map((card) => (
                  <li key={card.id} className="bg-white shadow-lg rounded-lg p-6 mx-auto max-w-md">
                      <p className="font-semibold">Card Number: <span className="font-normal">{card.card_number}</span></p>
                      <p className="font-semibold">Expiry Date: <span className="font-normal">{card.expiry_date}</span></p>
                      <button
                          onClick={() => handleEdit(card.id)}
                          className="mt-4 flex items-center text-blue-500 hover:text-blue-700"
                      >
                          <FaPencilAlt className="mr-2" />
                          Edit
                      </button>
                  </li>
              ))}
          </ul>
      </div>
  );
};

export default CreditCardList;
