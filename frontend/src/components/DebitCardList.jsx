import { useEffect, useState } from 'react';
import api from '../api';
import { FaPencilAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const DebitCardList = () => {
    const [debitCards, setDebitCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDebitCards = async () => {
            try {
                const response = await api.get('/api/debit-cards/');
                setDebitCards(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchDebitCards();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

  const handleEdit = (id) => {
      navigate(`/edit-debit/${id}`);
  };

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-xl font-bold text-center mb-6">Debit Cards</h1>
      <ul className="flex flex-wrap justify-center">
        {debitCards.map((card) => (
          <li key={card.id} className=" shadow-lg rounded-lg p-6 m-4 w-80">
            <p className="font-semibold">Card Number: <span className="font-normal">{card.card_number}</span></p>
            <p className="font-semibold">Expiry Date: <span className="font-normal">{card.expiry_date}</span></p>
            <button
              onClick={() => handleEdit(card.id)}
              className="mt-4 flex items-center text-blue-500 hover:text-blue-700">
              <FaPencilAlt className="mr-2" />
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DebitCardList;
