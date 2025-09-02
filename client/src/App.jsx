import { useState, useEffect } from "react";
import LandingPage from "./pages/landingPage";
import { BrowserRouter, Routes, Route, Outlet} from "react-router-dom";
import Header from "./components/header.jsx";
import RegLogin from  "./pages/register_login";
import AboutPage from "./pages/aboutPage";
import ServicesPage from "./pages/servicesPage"
import ContactPage from "./pages/contactPage";
import Footer from "./components/footer";
import ProfilePage from "./pages/profilePage";
import RandomPage from "./pages/lostRandomPage.jsx";
import SkyLuxFlightBooking from "./pages/bookFlight.jsx";
import {configureStore} from "@reduxjs/toolkit";
import reducerer from "./store/reducer.jsx";
import requireAuth from "./requireAuth.jsx";
import {Provider} from "react-redux";
import SkyLuxAdminDashboard from "./pages/adminPage.jsx";
import SetAuthHeader from "./utils/setAuthHeader.jsx";
import SkyLuxAdminLogin from "./pages/adminLoginPage.jsx";
import UpdatePage from "./pages/updatePage.jsx";

function App()
{
    const store = configureStore({reducer:reducerer});
    const token = localStorage.getItem("token");

    SetAuthHeader(token);
    if (token)
    {
        store.dispatch({type:"ON_LOGGED_IN"});
    }
    const ProtectedProfilePage = requireAuth(ProfilePage);
    const ProtectedBookingPage  = requireAuth(SkyLuxFlightBooking);
    const ProtectedAdminDashBoard = requireAuth(SkyLuxAdminDashboard);
    
    const [darkTheme, setDarkTheme] = useState(false);
    let bg;
    useEffect(()=>{
        bg = window.matchMedia('(prefers-color-scheme:dark)').matches;
        console.log(`bg : ${bg}`);
        setDarkTheme(bg);
    },[])

    const dark = darkTheme ? "dark": "";
    console.log(`dark: ${dark}`);


    return (
        
        <div className={`${dark}`}>
            <Provider store={store}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<div><Header/><Outlet/><Footer/></div>}>
                            <Route index element={<LandingPage/>}/>
                            <Route path="register" element={<RegLogin/>}/>
                            <Route path="admin" element={<SkyLuxAdminLogin/>}/> 
                            <Route path="about" element={<AboutPage/>}/>
                            <Route path="services" element={<ServicesPage/>}/>
                            <Route path="contact" element={<ContactPage/>}/>
                            <Route path="profile" element={<ProtectedProfilePage/>}/>
                            <Route path="booking" element={<ProtectedBookingPage/>}/>
                            <Route path='admindash' element={<ProtectedAdminDashBoard/>}/>
                            <Route path='update/:id' element={<UpdatePage/>}/>
                            <Route path="*" element={<RandomPage/>}/>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </Provider>
        </div>
    )
}
export default App;