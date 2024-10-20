import HeaderLogo from "./HeaderLogo";
import Hamburger from "./Hamburger";
import Sidebar from "./Sidebar";
import { useState } from "react";
import '../styles/Navigation.css';

export default function NavBar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const name = localStorage.getItem('username');
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            <nav className="flex w-screen border-b-2 border-gray-300">
                <div className="bg-white w-full flex flex-wrap items-center justify-between mx-auto">
                    <HeaderLogo />
                    <div className="flex items-center space-x-4 mr-5">
                        {name ? (
                            <p className="font-semibold text-sky-600 hidden md:block mr-4">Logged in as {name}</p>
                        ) : (
                            <p className="hidden md:block">Not showing</p>
                        )}
                            <Hamburger toggleSidebar={toggleSidebar} />
                    </div>
                </div>
            </nav>
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        </>
    );
}