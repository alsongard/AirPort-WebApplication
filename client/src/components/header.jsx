import { FaMoon } from "react-icons/fa";
import {NavLink} from 'react-router-dom';


function Header(){
    return (
        <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gradient-to-r from-slate-800 to-[rgba(69,85,108,0.4)]  shadow">
            <div className="text-2xl font-bold text-blue-600">
                {/* Logo */}
                Logo
            </div>
            <nav>
                <ul className="flex space-x-6 text-gray-700 font-medium">
                    <li>
                        <NavLink to="/" className={({isActive})=>{return isActive ? "text-black" : "text-gray-600 hover:text-blue-500 transition"}}>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/register" className={({isActive})=>{return isActive ? "text-black" : "text-gray-600 hover:text-blue-600 transition"}}>Register/Login</NavLink>
                    </li>
                    <li>
                        <NavLink to="about" className={({isActive})=>{return isActive ? "text-black" : "text-gray-600 hover:text-blue-600 transition"}}>About</NavLink>
                    </li>
                    <li>
                        <NavLink to="/services" className={({isActive})=>{return isActive ? "text-black" : "text-gray-600 hover:text-blue-600 transition"}}>Services</NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact"className={({isActive})=>{return isActive ? "text-black" : "text-gray-600 hover:text-blue-600 transition"}}>Contact</NavLink>
                    </li>
                    <li>
                        <button className="ml-6 text-gray-600 hover:text-blue-600 transition" aria-label="Toggle dark mode">
                            <FaMoon size={20} />
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;