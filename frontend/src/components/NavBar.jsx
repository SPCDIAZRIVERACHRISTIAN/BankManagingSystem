import Hamburger from "./Hamburger";
import Sidebar from "./SideBar";
import { useState, useEffect } from "react";
import HeaderLogo from "./HeaderLogo";

export default function NavBar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {

        const name = localStorage.getItem('username');
        if (name) {
            setUsername(name);
        }
    }, []);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            <nav className="flex w-screen border-b-2 border-gray-300 ">
                <div className="bg-sky-800 w-full flex flex-wrap items-center justify-between mx-auto">
                    <HeaderLogo />
                    <div className="flex items-center space-x-4 mr-5">
                        {username ? (
                            <p className="font-semibold text-yellow-500 hidden md:block mr-4">Logged in as {username}</p>
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
