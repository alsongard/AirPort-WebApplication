import { useState } from 'react';
import { Shield, Eye, EyeOff, Plane } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
function SkyLuxAdminLogin(props) 
{
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        adminUser: '',
        password: ''
    });
    
    const [showPassword, setShowPassword] = useState(false);
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setLoginData((prevData) => ({
        ...prevData,
        [name]: value
        }));
    };
    
    async function handleSubmit(event)
    {
        event.preventDefault();
        console.log('Login Data:', loginData);
        // Handle admin login logic here
        try
        {
            const response = await axios.post('http://localhost:5000/api/users/adminLogin', loginData);
            console.log('Admin login successful:', response.data);
            if (response.data.success)
            {
                const {token} = response.data;
                console.log(`token : ${token}`);
                localStorage.setItem('token', token);
                console.log(`admin login success`);
                props.onLoggedInFunc();
                // Redirect or perform any other actions after successful login
                navigate('/admindash');
            }
        }
        catch(err)
        {
            console.error('Error during admin login:', err);
            alert('Login failed. Please check your credentials and try again.');
        }
    };
    
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    
    return (

        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
            {/* Login Card */}
            <div className="bg-white rounded-2xl shadow-2xl py-[15px] px-[20px]">
            {/* Logo and Title */}
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <div className="relative">
                    <Plane className="h-8 w-8 text-blue-600" />
                    <Shield className="h-4 w-4 text-blue-800 absolute -top-1 -right-1" />
                </div>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Sky<span className="text-blue-600">Lux</span>
                </h1>
                <p className="text-gray-600 text-lg">Administrator Login</p>
            </div>

            {/* Login Form */}
            <form className="space-y-6">
                {/* Email Input */}
                <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                </label>
                <input
                    type="email"
                    id="email"
                    name="adminUser"
                    value={loginData.adminUser}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors placeholder-gray-400"
                    placeholder="Enter your admin email"
                />
                </div>

                {/* Password Input */}
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                        Password
                    </label>
                    <div className="relative">
                        <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        value={loginData.password}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors placeholder-gray-400"
                        placeholder="Enter your password"
                        />
                        <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                        >
                        {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                        ) : (
                            <Eye className="h-5 w-5" />
                        )}
                        </button>
                    </div>
                </div>

                {/* Submit Button */}
                <div>
                    <input
                        type="submit"
                        value="Sign In to Admin Panel"
                        onClick={handleSubmit}
                        className="w-full px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer transition-colors transform hover:scale-[1.02] active:scale-[0.98]"
                    />
                </div>
            </form>

            {/* Additional Info */}
            <div className="mt-8 text-center">
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                <Shield className="h-4 w-4" />
                <span>Secure Admin Access</span>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                Authorized personnel only
                </p>
            </div>
            </div>
        </div>

        {/* Background Decorative Elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-400 rounded-full opacity-10 blur-xl"></div>
        <div className="absolute bottom-32 right-24 w-40 h-40 bg-indigo-400 rounded-full opacity-10 blur-xl"></div>
        <div className="absolute top-1/3 right-16 w-24 h-24 bg-blue-300 rounded-full opacity-15 blur-lg"></div>
        </div>
  );
}
const mapDispatchToProps = (dispatch)=>{
    return {
        onLoggedInFunc: ()=>dispatch({type:'ON_LOGGED_IN'}) 
    }
}
export default connect(null, mapDispatchToProps)(SkyLuxAdminLogin);