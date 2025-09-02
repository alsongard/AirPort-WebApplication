// this file will be used to hold components for file operations
import { useEffect, useState } from "react";
import axios from "axios";
import {Edit, Trash2, View} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";

export default function GetAllFlights()
{
    const navigate = useNavigate();
    const [flightArray, setFlightArray]  = useState([]);
    const {id} = useParams();
    
    useEffect(()=> // the useEffect expects or uses a sychronous function and not an asychronous function
    {
        async function perfromGetAllFlight() 
        {
            try
            {
                const response = await axios.get("https://airportwebapp-api.vercel.app/api/flights/getFlights");
                console.log(`this is response`);
                console.log(response);
                if (response.data.success)
                {
                    const flights = response.data.data
                    console.log(`this is flights`)
                    console.log(flights);
                    setFlightArray(flights);
                }
            }
            catch(err)
            {
            console.log(`Error: ${err}`);
            }
        }
        perfromGetAllFlight();
    }, [])

    const handleUpdate = (id)=>{
        navigate(`/update/${id}`);
    }
    return (
        <div>
            {
                flightArray.length === 0 ? 
                (
                    <div className='text-[21px]'> Loading <span className='dots-loader'>...</span></div>
                ) 
                :
                (

                    <table className='w-full bg-gray-50 overflow-x-auto rounded-md'>
                        <thead>
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">FLIGHT ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ROUTE</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DATE & TIME</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PASSENGERS</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">FLIGHT DURATION</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>

                        {flightArray.map((flightItem)=>{
                            return (
                                <tr key={flightItem._id}>
                                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{flightItem._id.slice(0,8)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">{flightItem.departureCountry} → {flightItem.destinationCountry}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">{new Date(flightItem.departureTime).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">{flightItem.totalSeats}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">{flightItem.flightDuration}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium ">
                                        <div className="flex flex-row justify-center space-x-2">
                                            <button title="Edit Flight" className="text-green-600 hover:text-green-900">
                                                <Edit onClick={()=>{handleUpdate(flightItem._id)}} className="h-4 w-4" />
                                            </button>
                                            <button title="Delete Flight" className="text-red-600 hover:text-red-900">
                                                <Trash2  className="h-4 w-4" />
                                            </button>
                                            <button title="View Flight Details" className="text-blue-600 hover:text-blue-900">
                                                <View className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                )
            }
        </div>
    )
}



