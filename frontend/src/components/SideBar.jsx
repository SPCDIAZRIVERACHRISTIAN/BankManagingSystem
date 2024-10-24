/**
 * Side BAr component
 *
 * the sidebar component holds links for pages that add loans credits
 * and debit as well as the logout button and profile setting page
 */
import PropTypes from "prop-types";
import Hamburger from "./Hamburger";
import LogoutButton from "./LogOut";

export default function Sidebar({ isOpen, toggleSidebar}) {
    return (
        <div className={`fixed inset-y-0 right-0 w-96 bg-white text-black border border-gray-300 transform ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          } transition-transform duration-300 ease-in-out`}>
            <div className="flex align-center justify-end mr-2 mt-1">
                <Hamburger toggleSidebar={toggleSidebar} />
            </div>
            <div className="flex align-center justify-center mr-4 ml-4">
                <h2 className="text-3xl text-yellow-500">Menu</h2>
            </div>
            <nav className="mt-10">
                <a href="/add-loan" className="block text-center text-xl py-2.5 px-4 my-5 rounded transition duration-200 hover:bg-yellow-400 hover:text-white">
                    New Loan
                </a>
                <a href="/add-debit" className="block text-center text-xl py-2.5 px-4 my-5 rounded transition duration-200 hover:bg-yellow-400 hover:text-white">
                    New Debit Card
                </a>
                <a href="/add-credit" className="block text-center text-xl py-2.5 px-4 my-5 rounded transition duration-200 hover:bg-yellow-400 hover:text-white">
                    New Credit Card
                </a>
                <a href="/profile" className="block text-center text-xl py-2.5 px-4 my-5 rounded transition duration-200 hover:bg-yellow-400 hover:text-white">
                    Profile
                </a>
            </nav>
            <div className="absolute bottom-0 w-full flex align-center justify-center mb-24">
                <LogoutButton />
            </div>
        </div>
    );
}

Sidebar.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggleSidebar: PropTypes.func.isRequired,
};
