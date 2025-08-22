import { useEffect, useState } from "react"
import axios from "axios";
export default function SearchFlight()
{
    const [searchFlightData, setSearchFlightData] = useState({
        departureCity: '',
        destinationCity: '',
        departureDate: ''
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchFlightData({ ...searchFlightData, [name]: value });
    }
    const [searchResults, setSearchResults] = useState([]);
    const [displayResults, setDisplayResults] = useState(false);
    async function handleSubmit(e) {
        e.preventDefault();
        // Perform search operation
        try
        {
            setDisplayResults(true);
            const response = await axios.post("http://localhost:5000/api/flights/searchFlight", searchFlightData);
            console.log(`this is response`);
            console.log(response);
            if (response.data.success)
            {
                const flights = response.data.data
                console.log(`this is flights`)
                console.log(flights);
                setSearchResults(flights);
            }
        }
        catch(err)
        {
            console.log(`Error: ${err}`);
        }
    }

    return (
        <>
            <form
                className="flex flex-row justify-between bg-white p-4 rounded shadow"
                onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    name="departureCity"
                    placeholder="Departure City"
                    value={searchFlightData.departureCity}
                    onChange={handleChange}
                    className="border rounded px-3 py-2 mr-2 flex-1"
                />
                <input
                    type="text"
                    name="destinationCity"
                    placeholder="Destination City"
                    value={searchFlightData.destinationCity}
                    onChange={handleChange}
                    className="border rounded px-3 py-2 mr-2 flex-1"
                />
                <input
                    type="date"
                    name="departureDate"
                    placeholder="Departure Date"
                    value={searchFlightData.departureDate}
                    onChange={handleChange}
                    className="border rounded px-3 py-2 mr-2 flex-1"
                />
                <input
                    type="submit"
                    value="Search"
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded cursor-pointer transition-colors"
                />
            </form>
            {
                displayResults === true &&
                (

                    searchResults.length === 0 ? 
                    (
                        <p>No Flight Found </p>
                    )
                    : 
                    (
                        <table className="overflow-x-auto bg-white p-1 w-full rounded-md">
                            <thead className="overflow-x-auto">
                                <tr>
                                    <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">FLIGHT ID</td>
                                    <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">FLIGHT NAME</td>
                                    <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ROUTE</td>
                                    <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DEPARTURE DATE</td>
                                    <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ARRIVAL DATE</td>
                                    <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DURATION</td>
                                    <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TOTAL SEATS</td>
                                </tr>
                            </thead>
                            <tbody className=" divide-y divide-gray-200 overflow-x-auto">
                                {searchResults.map((flightItem)=>{
                                    return (
                                        <tr key={flightItem._id}>
                                            <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{flightItem._id.slice(0,8)}</td> 
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-900">{flightItem.flightName}</td> 
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-900">{flightItem.departureCity} → {flightItem.destinationCity}</td> 
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-900">{new Date(flightItem.departureTime).toLocaleDateString()} at {new Date(flightItem.departureTime).toLocaleTimeString()}</td> 
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-900">{new Date(flightItem.arrivalTime).toLocaleDateString()} at {new Date(flightItem.arrivalTime).toLocaleTimeString()}</td> 
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-900">{flightItem.flightDuration}</td> 
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-900">{flightItem.totalSeats}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    )
                )
                
            }
        </>
    )
}
/**
 * Departure Country , Departure City
 * Destination Country, Destination City
 * Departure Date, 
 * ​
__v: 0
​​
_id: "6885a24508961f359d2845d9"
​​
arrivalTime: "2025-07-31T12:30:00.000Z"
​​
createdAt: "2025-07-27T03:51:33.362Z"
​​
departureCity: "New York"
​​
departureCountry: "America"
​​
departureTime: "2025-07-31T02:45:00.000Z"
​​
destinationCity: "Shanghai"
​​
destinationCountry: "China"
​​
flightAmenities: Array(3) [ "Wifi", "Breakfast", "Entertainment" ]
​​
flightClass: Array(4) [ "Economy", "Premium Economy", "Business", … ]
​​
flightDuration: "10h 30m"
​​
flightName: "SkyLux Prime"
​​
flightRating: 7.9
​​
price: 880000
​​
seatClass: Array []
​​
totalSeats: 100
​​
updatedAt: "2025-07-30T10:33:46.266Z"
 */