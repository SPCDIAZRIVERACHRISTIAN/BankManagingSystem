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
    <div className="p-4 flex flex-col items-center">
        <h1 className="text-xl font-bold mb-4 text-center">Loans</h1>
        <ul className="grid gap-4 grid-cols-1">
            {loans.map((loan) => (
                <li
                    key={loan.id}
                    className="bg-white shadow-md rounded-lg p-6 w-full max-w-md"
                >
                    <p className="text-base font-medium">
                        Amount: <span className="font-normal">${loan.amount}</span>
                    </p>
                </li>
            ))}
        </ul>
    </div>
  );
};

export default LoanList;
