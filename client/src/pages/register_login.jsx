import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import axios from "axios";
import {useNavigate} from "react-router-dom"
import { connect } from 'react-redux';
import setAuthHeader from "../utils/setAuthHeader"
function RegLogin(props) {
  const navigate = useNavigate()
  const apiURL = import.meta.env.VITE_API_URL;

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setformData] = useState({
    useremail: "",
    password: "",
    confirmPassword: ""
  });

  function handleChange(e) {
    setformData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }



  const toggleMode = () => {
    setIsLogin(!isLogin);
    // Clear confirm password when switching to login
    if (!isLogin) {
      setformData({
        ...formData,
        confirmPassword: ""
      });
    }
  };
  
  const [isTouched, setIsTouched] = useState({});
  const handleBlur=(event)=>{
    const {name}  = event.target;
    setIsTouched((prevData)=>{
      return {...prevData, [name]:true}
    })
  }

  const password_match_result = isTouched.confirmPassword ? formData.confirmPassword === formData.password : "";

  // we need password_match_result to be false to set message as error
  const password_match_err_msg = !password_match_result && isTouched.confirmPassword ? "Passwords do not match" : "";



  const [regSuccess, setRegSuccess]  = useState("");
  const handleSubmit =  async (event) => {
    event.preventDefault();
    console.log('Form submitted:', formData);

    // Add your form submission logic here
    if (isLogin)// checks if its true
    {
      try
      {
        // functioning done
        console.log(`Login: ${isLogin}`)
        const res = await axios.post(`${apiURL}/api/users/login`, {
          UserEmail:formData.useremail,
          UserPassword:formData.password
        })
        console.log(`This is res`);
        console.log(res.data);
        if (res.data.success)
        {
          const {user_id} = res.data.data;
          const {user_email} = res.data.data;
          const {token} = res.data.data;
          console.log(`This is user_id and typeof : ${typeof(user_id)}`);
          console.log(user_id);
          console.log(`This is ${user_id} || ${user_email} || ${token}`);
          setAuthHeader(token);
          localStorage.setItem("token", token);
          localStorage.setItem("user_email", user_email);
          localStorage.setItem("User_id", user_id);
          props.onLoggedIn();
          navigate("/profile");
        }
      }
      catch(err)
      {
        console.log(`Error : ${err}`);
        alert(`Error ${err}`)
      }
    }
    if (!isLogin)
    {
      try
      {
        console.log(`Registration: ${isLogin}`)
        const res = await axios.post(`${apiURL}/api/users/register`, {
          UserEmail:formData.useremail,
          UserPassword:formData.password
        })
        console.log(res);
        console.log(res.data.success);
        if (res.data.success)
        {
          setRegSuccess("Registered Successfully! Now Login");
          setTimeout(() => {
            setRegSuccess("");
          }, 8000);
        }
      }
      catch(err)
      {
        console.log(`Error : ${err}`);
        // alert(`Error ${err}`)
      }
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Form Container */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="p-8 pb-0">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h1>
              <p className="text-blue-200">
                {isLogin ? 'Sign in to your account' : 'Join us and get started'}
              </p>
            </div>

            {/* Toggle Buttons */}
            <div className="flex bg-white/5 rounded-2xl p-1 mb-8">
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                  isLogin 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                  !isLogin 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                Register
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 pt-0 space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="useremail" className="block text-sm font-medium text-white/90">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-white/40" />
                </div>
                <input
                  type="email"
                  id="useremail"
                  name="useremail"
                  value={formData.useremail}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-white/90">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-white/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  onBlur={handleBlur}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/40 hover:text-white/70 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field - Only show for registration */}
            <div className={`space-y-2 transition-all duration-500 overflow-hidden ${isLogin ? 'max-h-0 opacity-0' : 'max-h-32 opacity-100'}`}>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-white/90">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-white/40" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                  placeholder="Confirm your password"
                  required={!isLogin}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/40 hover:text-white/70 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
            {
              regSuccess && (<p className="text-green-700">{regSuccess}</p>)
            }
            {
              password_match_err_msg && (<p className='text-red-500'>{password_match_err_msg}</p>)
            }
            {/* Submit Button */}
            <input
              type="submit"
              value={isLogin ? 'Sign In' : 'Create Account'}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl"
            />
              

            {/* Additional Links */}
            <div className="text-center space-y-3">
              {isLogin && (
                <a href="#" className="block text-sm text-blue-300 hover:text-blue-200 transition-colors">
                  Forgot your password?
                </a>
              )}
              
              <p className="text-sm text-white/70">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  type="button"
                  onClick={toggleMode}
                  className="text-blue-300 hover:text-blue-200 font-semibold transition-colors"
                >
                  {isLogin ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-white/60 text-sm">
          <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </div>
    </div>
  );
}
const mapDispatchToProps = (dispatch)=>{
  return {
    onLoggedIn:()=>dispatch( {type:"ON_LOGGED_IN"})
  }
}


export default connect(null, mapDispatchToProps)(RegLogin);