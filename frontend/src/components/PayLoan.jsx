import { useState } from 'react';
import PropTypes from 'prop-types';
import api from '../api';
import NavBar from '../components/NavBar'
import BackButton from './BackButton';

const PayLoan = ({ loanId, currentAmount }) => {
  const [paymentAmount, setPaymentAmount] = useState('');
  const [message, setMessage] = useState('');
  const username = localStorage.getItem('username');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newAmount = currentAmount - parseFloat(paymentAmount);
      await api.put(`/api/loans/${loanId}/`, {
        amount: newAmount,
      });
      setMessage('Payment successful!');
      // Clear the form
      setPaymentAmount('');
    } catch (error) {
      setMessage('Failed to process payment.');
      console.error(error);
    }
  };

  return (
    <div className="pay-loan">
      <div><NavBar /></div>
      <h2>Pay Loan</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="paymentAmount">Payment Amount:</label>
          <input
            type="number"
            id="paymentAmount"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(e.target.value)}
            required
          />
        </div>
        <button type="submit">Pay</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

PayLoan.propTypes = {
  loanId: PropTypes.number.isRequired,
  currentAmount: PropTypes.number.isRequired,
};

export default PayLoan;
