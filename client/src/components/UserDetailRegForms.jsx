import { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import countryList from 'react-select-country-list';

export default function AirportForms() {
  const user_id = localStorage.getItem("User_id");
  const apiURL = import.meta.env.VITE_API_URL;

  // const options = useMemo(() => countryList().getData(), []);
  const options = useMemo(() => countryList().getData(), []);
  
  
  // Passenger Information Form State
  const [passengerData, setPassengerData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    age: '',
    nationality: '',
    passportNumber: '',
    phone: '',
    dateBirth: '',
    emergencyContact: '',
    emergencyContactName: '',
    userId: user_id
  });

  // Preferences Form State
  const [preferencesData, setPreferencesData] = useState({
    seatPreference: '',
    mealPreference: '',
    classPreference: '',
    notifications: false,
    newsletter: false,
    userId: user_id,
  });

  // Modified handleChange function to account for checkboxes
  const handlePassengerChange = (event) => {
    const { name, value, type, checked } = event.target;
    setPassengerData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  const handleSelected = (selected)=>{
    const {value, label} = selected;
    // console.log(`value: ${value} and label: ${label}`);
    setPassengerData((prevData)=>{
      return {
        ...prevData,
        nationality: selected
      }
    })
  }
  const handlePreferencesChange = (event) => {
    const { name, value, type, checked } = event.target;
    setPreferencesData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const [passengerSuccess, setPassengerSuccess] = useState("");
  const handlePassengerSubmit =  async (event) => {
    event.preventDefault();
    console.log('Passenger Data:', passengerData); //testng:working successfully

    // console.log(user_id); testing:working successfully

    try
    {
      const res = await axios.post(`${apiURL}/api/userdetails/registerUserDetail`, {
        firstName: passengerData.firstName,
        middleName: passengerData.middleName,
        lastName: passengerData.lastName,
        age: passengerData.age,
        passportNumber: passengerData.passportNumber,
        nationality: passengerData.nationality,
        userId: passengerData.userId,
        phone: passengerData.phone,
        dateBirth:passengerData.dateBirth ,
        emergencyContact:passengerData.emergencyContact ,
        emergencyContactName: passengerData.emergencyContactName
      });
      // console.log(`this is response`); // testing:working
      // console.log(res); // testing:working
      // console.log(`this is response.data`); // testing:working
      // console.log(res.data); // testing:working
      if (res.data.success)
      {
        setPassengerSuccess("User Details have been added successfully");
        // setTimeout(()=>{
        //   setPassengerSuccess("")
        // },)
      }
    }
    catch(err)
    {
      console.log(`error: ${err}`);
      // alert(`Error: ${err}`);
    }
    // Handle passenger form submission logic here
  };

  const [preferencesSuccessMsg, setPreferencesSuccessMsg] = useState("");
  
  const handlePreferencesSubmit = async (event) => {
    event.preventDefault();
    console.log('Preferences Data:', preferencesData);
    // Handle preferences form submission logic here
    try
    {
      const res = await axios.post(`${apiURL}/api/preference/setUser`, preferencesData);
      // console.log(`this is response`); //testing:working
      // console.log(res); //testing:working
      // console.log(`this is response.data`); //testing:working
      // console.log(res.data); //testing:working
      if (res.data.success)
      {
        setPreferencesSuccessMsg("User Preferences saved! ")
        // navigate("/profile"); 
        setTimeout(()=>{
          window.location.reload()
        }, 8000)

      }
      const response = await axios.post(`${apiURL}/api/travelstats/setTravellingStat/${user_id}`, {
        userId: user_id,
        trips: 0,
        distance: 0,
      });
    }
    catch(err)
    {
      console.log(`Error: ${err}`);
    }
  };
  // useEffect(()=>{
  //   console.log(passengerData);

  // }, [passengerData])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Passenger Information Form */}
        <div className="bg-gradient-to-br from-slate-500 via-blue-500 to-indigo-900 text-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Passenger Information</h2>
          <form onSubmit={handlePassengerSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-900 mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={passengerData.firstName}
                  onChange={handlePassengerChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter first name"
                />
              </div>

              <div>
                <label htmlFor="middleName" className="block text-sm font-medium text-gray-900 mb-1">
                  Middle Name
                </label>
                <input
                  type="text"
                  id="middleName"
                  name="middleName"
                  value={passengerData.middleName}
                  onChange={handlePassengerChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter middle name"
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-900 mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={passengerData.lastName}
                  onChange={handlePassengerChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter last name"
                />
              </div>

              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-900 mb-1">
                  Age *
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={passengerData.age}
                  onChange={handlePassengerChange}
                  required
                  min="1"
                  max="120"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter age"
                />
              </div>
              <div>
                <label htmlFor="nationality" className="block text-sm font-medium text-gray-900 mb-1">
                  Nationality *
                </label>
                <Select 
                options={options}
                value={passengerData.nationality}
                name="nationality" 
                onChange={handleSelected}
                styles={{
                  control: (base) => ({
                    ...base,
                    background: 'linear-gradient(to right, #64748b 0%, #3b82f6 50%, #312e81 100%)',
                    color: 'white',
                    borderColor: '#1e293b', // Tailwind slate-800
                  }),
                  menu: (base) => ({
                    ...base,
                    backgroundColor: 'black',
                    color: 'white',
                  }),
                  singleValue: (base) => ({
                    ...base,
                    color: 'white',
                  }),
                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isFocused ? '#1e293b' : 'black',
                    color: 'white',
                  }),
                }}
                />
                
              </div>

              <div>
                <label htmlFor="passportNumber" className="block text-sm font-medium text-gray-900 mb-1">
                  Passport Number *
                </label>
                <input
                  type="text"
                  id="passportNumber"
                  name="passportNumber"
                  value={passengerData.passportNumber}
                  onChange={handlePassengerChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter passport number"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-900 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={passengerData.phone}
                  onChange={handlePassengerChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter phone number"
                />
              </div>

              <div>
                <label htmlFor="dateBirth" className="block text-sm font-medium text-gray-900 mb-1">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  id="dateBirth"
                  name="dateBirth"
                  value={passengerData.dateBirth}
                  onChange={handlePassengerChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="emergencyContactName" className="block text-sm font-medium text-gray-900 mb-1">
                  Emergency Contact Name *
                </label>
                <input
                  type="tel"
                  id="emergencyContactName"
                  name="emergencyContactName"
                  value={passengerData.emergencyContactName}
                  onChange={handlePassengerChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter emergency contact"
                />
              </div>

              <div>
                <label htmlFor="emergencyContact" className="block text-sm font-medium text-gray-900 mb-1">
                  Emergency Contact *
                </label>
                <input
                  type="tel"
                  id="emergencyContact"
                  name="emergencyContact"
                  value={passengerData.emergencyContact}
                  onChange={handlePassengerChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter emergency contact"
                />
              </div>
            </div>

            <div className="pt-4">
              <input
                type="submit"
                value="Save Passenger Information"
                onClick={handlePassengerSubmit}
                className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer transition-colors"
              />
            </div>
          </form>
          {
            passengerSuccess && (<p className="py-[8px] mt-[20px] bg-green-800 inline-block px-[15px] rounded-md text-center">{passengerSuccess}</p>)
            
          }
        </div>

        {/* Travel Preferences Form */}
        <div className="bg-gradient-to-br from-slate-500 via-blue-500 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Travel Preferences</h2>
          <form onSubmit={handlePreferencesSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="seatPreference" className="block text-sm font-medium text-gray-900 mb-1">
                  Seat Preference
                </label>
                <select
                  id="seatPreference"
                  name="seatPreference"
                  value={preferencesData.seatPreference}
                  onChange={handlePreferencesChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select seat preference</option>
                  <option value="Window">Window</option>
                  <option value="Aisle">Aisle</option>
                  <option value="Middle">Middle</option>
                </select>
              </div>

              <div>
                <label htmlFor="mealPreference" className="block text-sm font-medium text-gray-900 mb-1">
                  Meal Preference
                </label>
                <select
                  id="mealPreference"
                  name="mealPreference"
                  value={preferencesData.mealPreference}
                  onChange={handlePreferencesChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select meal preference</option>
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Non-Vegetarian">Non-Vegetarian</option>
                  <option value="Vegan">Vegan</option>
                  <option value="Kosher">Kosher</option>
                  <option value="Halal">Halal</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="classPreference" className="block text-sm font-medium text-gray-900 mb-1">
                  Class Preference
                </label>
                <select
                  id="classPreference"
                  name="classPreference"
                  value={preferencesData.classPreference}
                  onChange={handlePreferencesChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select class preference</option>
                  <option value="Economy">Economy</option>
                  <option value="Premium Economy">Premium Economy</option>
                  <option value="Business">Business</option>
                  <option value="First">First</option>
                </select>
              </div>
            </div>

            <div className="space-y-3 pt-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="notifications"
                  name="notifications"
                  checked={preferencesData.notifications}
                  onChange={handlePreferencesChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="notifications" className="ml-2 block text-sm text-gray-900">
                  Receive flight notifications and updates
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="newsletter"
                  name="newsletter"
                  checked={preferencesData.newsletter}
                  onChange={handlePreferencesChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="newsletter" className="ml-2 block text-sm text-gray-900">
                  Subscribe to newsletter for deals and promotions
                </label>
              </div>
            </div>

            <div className="pt-4">
              <input
                type="submit"
                value="Save Travel Preferences"
                onClick={handlePreferencesSubmit}
                className="w-full md:w-auto px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 cursor-pointer transition-colors"
              />
            </div>
            {
              preferencesSuccessMsg && 
              (
                <div className='flex flex-row items-center space-x-6'>
                  <p className="py-[7px] mt-[20px] bg-green-800 inline-block px-[15px] rounded-md text-center">User preferences saved!</p>
                  <button
                    className="py-[7px] mt-[20px] bg-green-800 inline-block px-[15px] rounded-md text-center"
                    onClick = {()=>{setTimeout(()=>window.location.reload(), 5000)}}
                    // className="mt-4 px-[15px] py-[7px] bg-blue-700 text-white rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-colors"
                  >
                    Click to Move to Profile
                  </button>
                </div>
              )
            }
          </form>
        </div>
      </div>
    </div>
  );
}

// preferencesSuccessMsg