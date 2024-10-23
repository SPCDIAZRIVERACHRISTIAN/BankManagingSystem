import { useEffect, useState } from 'react';
import api from '../api'; // Adjust the import path as needed
import { useNavigate } from 'react-router-dom';

const LoanList = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  const handlePay = (id) => {
    navigate(`/pay-loan/${id}`);
  };

  const handleDelete = (type, id) => {
    setLoans(loans.filter((loan) => loan.id !== id));
  };

  return (
    <div className="container mx-auto my-8">
        <h1 className="text-xl font-bold text-center mb-6">Loans</h1>
        <div className="shadow-lg rounded-lg p-6 m-4 w-80 mx-auto bg-white">
            <ul className="space-y-4">
                {loans.map((loan) => (
                    <li key={loan.id}>
                        <p className="font-semibold">
                            Amount: <span className="font-normal">${loan.amount}</span>
                        </p>
                        <div className="flex space-x-4 mt-2">
                            <button
                                onClick={() => handlePay(loan.id)}
                                className="text-blue-500 hover:text-blue-700"
                            >
                                Pay
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    </div>
);
};

export default LoanList;
