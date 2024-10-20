import { useState } from "react";
import api from '../api';

const AddCredit = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post('/api/credit-cards/', {
                card_number: cardNumber,
                expiry_date: expiryDate,
                cvv: cvv,
              });
              setMessage('Credit card added successfully!');
              setCardNumber('')
              setExpiryDate('');
              setCvv('');
        } catch (error) {
            setMessage('Failed to add credit card.');
            console.error('Failed to add credit card.', error);
        }
    };

    return (
        <div className="add-credit-card">
            <h2>Add credit Card</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="cardNumber">Card Number:</label>
            <input
              type="text"
              id="cardNumber"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="expiryDate">Expiry Date:</label>
            <input
              type="date"
              id="expiryDate"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="cvv">CVV:</label>
            <input
              type="text"
              id="cvv"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              required
            />
           </div>
        <button type="submit">Add Credit Card</button>
      </form>
      {message && <p>{message}</p>}
    </div>
    );
};

export default AddCredit;
