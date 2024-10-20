import { useEffect, useState } from 'react';
import api from '../api'; // Adjust the import path as needed

const LoanList = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await api.get('/api/loans/');
        setLoans(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Loans</h1>
      <ul>
        {loans.map((loan) => (
          <li key={loan.id}>
            <p>Amount: {loan.amount}</p>
            <p>Interest Rate: {loan.interest_rate}</p>
            <p>Term: {loan.term} months</p>
            <p>Created At: {loan.created_at}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LoanList;
