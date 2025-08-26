import { FaMoon } from "react-icons/fa";
import {NavLink, useNavigate} from 'react-router-dom';
import { connect } from "react-redux";
import { Menu } from 'lucide-react';
import { useState } from "react";
import clsx from 'clsx';

function Header(props){
    const navigate = useNavigate();
    const handleLogoutOut = ()=>{
        props.onLoggingOut();
        localStorage.clear();
        navigate("/");
    }
    const [openMenu, setOpenMenu ] = useState(false);
    const handleMenu = ()=>{
        setOpenMenu((prevValue)=>!prevValue);
    }
    return (
        <header className="flex flex-row items-center justify-between px-6 py-4  bg-gradient-to-r from-slate-800 to-[rgba(69,85,108,0.4)]  shadow">
            <div className="text-2xl font-bold text-blue-600">
                {/* Logo */}
                SkyLux Travel
            </div>
            <nav className="flex-row flex space-x-[20px] items-center max-[790px]:hidden">
                <ul className="flex flex-row space-x-6 text-gray-700  font-medium">
                    <li>
                        <NavLink to="/" className={({isActive})=>{return isActive ? "text-black" : "text-gray-600 hover:text-blue-500 transition"}}>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/about" className={({isActive})=>{return isActive ? "text-black" : "text-gray-600 hover:text-blue-600 transition"}}>About</NavLink>
                    </li>
                    <li>
                        <NavLink to="/services" className={({isActive})=>{return isActive ? "text-black" : "text-gray-600 hover:text-blue-600 transition"}}>Services</NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact"className={({isActive})=>{return isActive ? "text-black" : "text-gray-600 hover:text-blue-600 transition"}}>Contact</NavLink>
                    </li>
                </ul>
                {
                    // display this if false:isLoggedIn
                    !props.checkLoggedIn &&
                    (
                        <ul className=" text-gray-700  font-medium">
                            <li>
                                <NavLink to="/register" className={({isActive})=>{return isActive ? "text-black" : "text-gray-600 hover:text-blue-600 transition"}}>Register/Login</NavLink>
                            </li>
                        </ul>

                    ) 
                }
                {
                    // display this if true:isLoggedIn
                    props.checkLoggedIn && 
                    (
                        <ul className="flex space-x-6 items-center text-gray-700 font-medium">
                            <li>
                                <NavLink to="/profile"className={({isActive})=>{return isActive ? "text-black" : "text-gray-600 hover:text-blue-600 transition"}}>Profile</NavLink>
                            </li>
                            <li>
                                <NavLink to="/booking"className={({isActive})=>{return isActive ? "text-black" : "text-gray-600 hover:text-blue-600 transition"}}>Booking</NavLink>
                            </li>
                            <li>
                                <button
                                    className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 shadow"
                                    onClick={handleLogoutOut}
                                >
                                    Logout
                                </button>
                            </li>
                        </ul>
                    )
                }

            </nav>

            <div className={clsx(openMenu ? "block" : "hidden", "absolute top-[66px] py-[20px]  min-[790px]:hidden  z-20 left-0 bg-gradient-to-br from-slate-900  to-indigo-900 w-full")}>
                <ul className="flex flex-col items-center space-y-[20px] text-gray-700  font-medium">
                    <li className="w-full border-b-1 border-white text-center">
                        <NavLink to="/" className={({isActive})=>{return isActive ? "text-black" : "text-gray-600 hover:text-blue-500 transition"}}>Home</NavLink>
                    </li>
                    <li className="w-full border-b-1 border-white text-center">
                        <NavLink to="/about" className={({isActive})=>{return isActive ? "text-black" : "text-gray-600 hover:text-blue-600 transition"}}>About</NavLink>
                    </li>
                    <li className="w-full border-b-1 border-white text-center">
                        <NavLink to="/services" className={({isActive})=>{return isActive ? "text-black" : "text-gray-600 hover:text-blue-600 transition"}}>Services</NavLink>
                    </li>
                    <li className="w-full border-b-1 border-white text-center">
                        <NavLink to="/contact"className={({isActive})=>{return isActive ? "text-black" : "text-gray-600 hover:text-blue-600 transition"}}>Contact</NavLink>
                    </li>
                    
                    
                    {
                        !props.checkLoggedIn &&
                        (
                            
                                <li className="w-full border-b-1 border-white text-center">
                                    <NavLink to="/register" className={({isActive})=>{return isActive ? "text-black" : "text-gray-600 hover:text-blue-600 transition"}}>Register/Login</NavLink>
                                </li>
                            
                        )
                    }
                    {
                        props.checkLoggedIn &&
                        (
                            <>
                                <li className="w-full border-b-1 border-white text-center">
                                    <NavLink to="/profile"className={({isActive})=>{return isActive ? "text-black" : "text-gray-600 hover:text-blue-600 transition"}}>Profile</NavLink>
                                </li>
                                <li className="w-full border-b-1 border-white text-center">
                                    <NavLink to="/booking"className={({isActive})=>{return isActive ? "text-black" : "text-gray-600 hover:text-blue-600 transition"}}>Booking</NavLink>
                                </li>
                                <li>
                                    <button
                                        className="px-[35px] py-[3.5px] rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 shadow"
                                        onClick={handleLogoutOut}
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        )
                    }
                </ul>
            </div>
            <div className=' max-[790px]:block hidden'>
                <Menu onClick={handleMenu}/>

            </div>
        </header>
    );
};
const mapInitializeStateToProps = (state)=>{
    return {
        checkLoggedIn: state.isLoggedIn
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        onLoggingOut: ()=>dispatch({type:"ON_LOGGED_OUT"})
    }
}
export default connect(mapInitializeStateToProps,mapDispatchToProps)(Header);