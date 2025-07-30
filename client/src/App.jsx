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
function App()
{
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
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<div><Header/><Outlet/><Footer/></div>}>
                        <Route index element={<LandingPage/>}/>
                        <Route  path="register" element={<RegLogin/>}/>
                        <Route  path="about" element={<AboutPage/>}/>
                        <Route  path="services" element={<ServicesPage/>}/>
                        <Route  path="contact" element={<ContactPage/>}/>
                        <Route path="profile" element={<ProfilePage/>}/>
                        <Route path="booking" element={<SkyLuxFlightBooking/>}/>
                        <Route path="*" element={<RandomPage/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}
export default App;