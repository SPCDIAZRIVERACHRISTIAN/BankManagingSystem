import { useState, useEffect } from 'react';
import api from '../api';
import NavBar from './NavBar';
import BackButton from './BackButton';
import { useParams } from 'react-router-dom';
import { ACCESS_TOKEN } from '../constants';

const PayLoan = () => {
  const { id } = useParams(); // Get the loan ID from the URL parameters
  const [currentAmount, setCurrentAmount] = useState(0);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [message, setMessage] = useState('');
  const [interstRate, setInterestRate] = useState(0);
  const [term, setTerm] = useState(0);

  useEffect(() => {
    const fetchLoanDetails = async () => {
      try {
        const token = localStorage.getItem(ACCESS_TOKEN);
        const response = await api.get(`/api/loans/${id}/`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setCurrentAmount(response.data.amount);
        setInterestRate(response.data.interest_rate);
        setTerm(response.data.term);
      } catch (error) {
        console.error('Error fetching loan details:', error);
      }
    };
    fetchLoanDetails();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newAmount = currentAmount - parseFloat(paymentAmount);
      const token = localStorage.getItem(ACCESS_TOKEN);
      await api.put(`/api/loans/${id}/`, {
        amount: newAmount,
        interest_rate: interstRate,
        term: term,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setMessage('Payment successful!');
      setPaymentAmount('');
      setCurrentAmount(newAmount); // Update the current amount in the state
    } catch (error) {
      setMessage('Failed to process payment.');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar at the top */}
      <NavBar />

      {/* Back button directly under the navbar */}
      <div className="mt-4 px-4">
        <BackButton />
      </div>

      {/* Center the card horizontally and vertically */}
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Pay Loan</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="paymentAmount"
                className="block text-sm font-medium text-gray-700"
              >
                Payment Amount:
              </label>
              <input
                type="number"
                id="paymentAmount"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit Payment
            </button>
          </form>
          {message && (
            <p className="mt-4 text-center text-sm text-green-600">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PayLoan;
