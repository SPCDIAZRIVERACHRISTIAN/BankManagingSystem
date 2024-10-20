import { useEffect, useState } from 'react';
import api from '../api';

const CreditCardList = () => {
    const [CreditCards, setCreditCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCreditCards = async () => {
            try {
                const response = await api.get('/api/credit-cards/');
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

  return (
    <div>
      <h1>Credit Cards</h1>
      <ul>
        {CreditCards.map((card) => (
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

export default CreditCardList;
