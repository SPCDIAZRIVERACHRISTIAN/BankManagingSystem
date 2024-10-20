import { useState } from 'react';
import api from '../api'; // Adjust the import path as needed
import '../styles/AddLoan.css'; // Import the CSS file

const AddLoan = () => {
  const [amount, setAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [term, setTerm] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/loans/', {
        amount: parseFloat(amount),
        interest_rate: parseFloat(interestRate),
        term: parseInt(term, 10),
      });
      setMessage('Loan added successfully!');
      setAmount('');
      setInterestRate('');
      setTerm('');
    } catch (error) {
      setMessage('Failed to add loan.');
      console.error(error);
    }
  };

  return (
    <div className="add-loan">
      <h2>Add Loan</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="interestRate">Interest Rate:</label>
          <input
            type="number"
            step="0.01"
            id="interestRate"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="term">Term (months):</label>
          <input
            type="number"
            id="term"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Loan</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddLoan;
