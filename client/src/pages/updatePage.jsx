import {useParams} from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

function UpdatePage()
{
    const {id} = useParams();
    const [flightData, setFlightData] = useState({});

    const GetFlightData = async()=>{
        const data = await axios.get(`https://airportwebapp-api.vercel.app/singleFlight/${id}`);
        console.log(data);
        setFlightData(data)
    } 
    useEffect(()=>{
        GetFlightData();
    })
    return (
        <section>
            <div>
                <p>This is {id}</p>

                {
                    Object.keys(flightData).length === 0 ?
                    (

                        <p>Loading...</p>
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
                                </tr>
                            </thead>
                            <tbody>

                            {flightData.map((flightItem)=>{
                                return (
                                    <tr key={flightItem._id}>
                                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{flightItem._id.slice(0,8)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-900">{flightItem.departureCountry} → {flightItem.destinationCountry}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-900">{new Date(flightItem.departureTime).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-900">{flightItem.totalSeats}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-900">{flightItem.flightDuration}</td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    )
                }
            </div>
        </section>
    )
}

export default UpdatePage;