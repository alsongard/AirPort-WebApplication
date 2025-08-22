import React, { useState, useEffect } from 'react';
import { 
  User, Edit3, Camera, Plane, Star, Clock, MapPin, 
  CreditCard, Bell, Shield, Settings, Calendar, 
  Award, Crown, Gift, Briefcase, Heart, Coffee,
  CheckCircle, X, Save, Phone, Mail, Globe,
  TrendingUp, Target, Users, Badge
} from 'lucide-react';
import clsx from "clsx";
import axios from "axios";
import ProfileComponent from '../components/profileComponent';
import AirportForms from '../components/UserDetailRegForms';
import SkyLuxSpinner from '../components/spinnerComponent';
export default function ProfilePage() 
{

  const apiURL = import.meta.env.VITE_API_URL;
  // get items from localStorage:
  // const token = localStorage.getItem("token");
  // const user_email = localStorage.getItem("user_email");
  const user_id = localStorage.getItem("User_id");

  const [isloading, setIsLoading] = useState(true);

  const [displayRegForm, setDisplayRegForm] = useState(true);

  const getUserDetails = async ()=>{
    try
    {
      const res = await axios.get(`${apiURL}/getUserDetail/${user_id}`);
      // console.log(`This is response: ${res.status}`);
      // console.log(res);
  
      if (res.data.success)
      {
        // console.log(res.data.data); // success,otherproperties
        setDisplayRegForm(false);
        setTimeout(()=>{
          setIsLoading(false);
        },10000)
      }

    }
    catch(err)
    {
      setTimeout(()=>{
        setIsLoading(false);
        },10000)
      setDisplayRegForm(true);
      console.log(`Error: ${err}`);
    }
  }

  useEffect(()=>{
    getUserDetails();
  },[])

  return (  
    <div>
      {
        isloading ? 
        (
          <SkyLuxSpinner/>
        ):
        displayRegForm ? 
        (
          <AirportForms/>
        )
        : 
        (
          <ProfileComponent />
        )
      }
    </div>
  )
}