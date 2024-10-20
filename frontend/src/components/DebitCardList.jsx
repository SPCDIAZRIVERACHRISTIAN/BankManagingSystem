import { useEffect, useState } from 'react';
import api from '../api';

const DebitCardList = () => {
    const [debitCards, setDebitCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

  return (
    <div>
      <h1>Debit Cards</h1>
      <ul>
        {debitCards.map((card) => (
          <li key={card.id}>
            <p>Card Number: {card.card_number}</p>
            <p>Expiry Date: {card.expiry_date}</p>
            <p>CVV: {card.cvv}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DebitCardList;
