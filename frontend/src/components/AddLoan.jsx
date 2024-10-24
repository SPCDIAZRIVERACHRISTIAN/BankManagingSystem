/**
 * Add loan
 *
 * Creates a loan in a page called add loan.
 * uses other components to give it more functionality like backbutton and api.
 */
import { useState } from 'react';
import api from '../api';
import BackButton from './BackButton';
import { ACCESS_TOKEN } from '../constants';

const AddLoan = () => {
  const [amount, setAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [term, setTerm] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem(ACCESS_TOKEN);
      if (!token) {
        setMessage('No access token found. Please log in.');
        return;
      }
      await api.post('/api/loans/', {
        amount: parseFloat(amount),
        interest_rate: parseFloat(interestRate),
        term: parseInt(term, 10),
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
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
    <div>
      <BackButton />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold mb-4">Add Loan</h2>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded w-full max-w-md">
          <div className="mb-4">
            <label htmlFor="amount" className="block font-bold text-gray-700">Amount:</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="interestRate" className="block font-bold text-gray-700">Interest Rate:</label>
            <input
              type="number"
              step="0.01"
              id="interestRate"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="term" className="block font-bold text-gray-700">Term (months):</label>
            <input
              type="number"
              id="term"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
        </div>
          <button type="submit" className="w-full bg-sky-700 text-yellow-400 py-2 px-4 rounded-md hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 font-bold">Add Loan</button>
        </form>
        {message && <p className="mt-4 text-center text-green-500">{message}</p>}
      </div>
      </div>
  );
};

export default AddLoan;
