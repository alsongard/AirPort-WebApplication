import axios from "axios";
import {useState, useEffect} from 'react';
import {View, Trash2} from 'lucide-react';
import clsx from 'clsx';
function GetAllBookings()
{   
    const [allBookings, setAllBookings] = useState([]);
    useEffect(()=>{
        async function getAllBookings()
        {
            try {
                const response = await axios.get("https://airportwebapp-api.vercel.app/api/booking/getBookings");
                if (response.data.success) // checks if true
                {
                    const bookings = response.data.data;
                    setAllBookings(bookings);
                    console.log(bookings);
                }
            } catch (err) {
                console.log(`Error: ${err}`);
                alert('Error encountered when fetching booking data');
            }
        }
        getAllBookings();
    },[])

    return (
        <section>
            {
                allBookings.length === 0 ?
                (
                    <div className='text-[21px]'> Loading <span className='dots-loader'>...</span></div>
                )
                :
                (
                    <div className="bg-white rounded-lg  p-1 shadow-md">
                        <table  className="w-full" >
                            <thead className="">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Flight ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seat Class</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className=" divide-y divide-gray-200">
                                {
                                    allBookings.map((booking) => (
                                        <tr key={booking._id}>
                                            <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{booking._id.slice(0,8)}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-900">{booking.userId.slice(0,8)}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-900">{booking.flightId.slice(0,8)}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-900">{new Date(booking.updatedAt).toLocaleDateString()}</td>
                                            <td className="px-6 py-4 whitespace-nowrap"><span className={clsx(booking.bookingStatus === "pending" ? "bg-yellow-100 text-yellow-500" : "bg-green-100 text-green-500", 'px-1 py-1 rounded-full text-xs font-medium')}>{booking.bookingStatus}</span></td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-900">{booking.seatClass}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                                                <button title='View More Information' className="text-blue-600 hover:text-blue-900"><View /></button>
                                                <button title='Delete booking' className="text-red-600 hover:text-red-900 ml-4"><Trash2 /></button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                )
            }
        </section>
    )
}

export default GetAllBookings;