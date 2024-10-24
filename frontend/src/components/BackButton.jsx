/**
 * BackButton component
 *
 * component that navigates the user back to the home page.
 */
import { useNavigate } from "react-router-dom";

const BackButton = () => {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/');
    };

    return (
        <div className="pt-1">
        <button
            onClick={handleBackClick}
            className="flex items-center justify-center w-20 h-12 bg-sky-800 rounded-2xl text-yellow-400 cursor-pointer hover:bg-sky-900 shadow-md"
        >
            <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                />
            </svg>
            <span>Back</span>
        </button></div>
    );
};

export default BackButton;
