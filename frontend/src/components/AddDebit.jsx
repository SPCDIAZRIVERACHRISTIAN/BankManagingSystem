import { useState } from "react";
import api from '../api';

const AddDebit = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post('/api/debit-cards/', {
                card_number: cardNumber,
                expiry_date: expiryDate,
                cvv: cvv,
              });
              setMessage('Debit card added successfully!');
              setCardNumber('')
              setExpiryDate('');
              setCvv('');
        } catch (error) {
            setMessage('Failed to add debit card.');
            console.error('Failed to add debit card.', error);
        }
    };

    return (
        <div className="add-debit-card">
            <h2>Add Debit Card</h2>
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
        <button type="submit">Add Debit Card</button>
      </form>
      {message && <p>{message}</p>}
    </div>
    );
};

export default AddDebit;
