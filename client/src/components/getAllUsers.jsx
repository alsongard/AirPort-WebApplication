// this file will be used to fetch userdata and perform delete operation
import { useEffect, useState } from "react";
import { Eye , Trash2} from "lucide-react";
import axios from "axios";


export default function GetAllUsers()
{
    const [usersArray, setUsersArray] = useState([]);
    useEffect(()=>{
        async function getAllUsers()
        {  
            try
            {
                // http://localhost:5000/api/users/allUser
                const response = await axios.get("https://airportwebapp-api.vercel.app/api/admin/users");
                console.log(`this is response: `);
                console.log(response)
                if (response.data.success){
                    // checks if its true
                    console.log(`success is true`);
                    const userdata = response.data.data
                    // console.log(`this is userdata`);
                    // console.log(userdata)
                    setUsersArray(userdata);
                    // console.log(usersArray);
                    /**
                     * id: "688a90d70e17f88d40ff8546"
                         createdAt: "2025-07-30T21:38:31.009Z"
                        email: "troy@gmail.com" from my view it seems that we will add buttons to get the data from various Collections using the user_id
                    */
                }
            }
            catch(err)
            {
                console.log(`Error: ${err}`);
                alert('Error encountered when fetching user data');
            }
        }
        getAllUsers();
    }, []);

    const [deleteSuccessMsg, setDeleteSuccessMsg] = useState("");
    async function deleteUser(id)
    {
        const result = confirm('Your are about to delete the user information from the entire database');
        try
        {
            if (result) // true
            {
                const response = await axios.delete(`https://airportwebapp-api.vercel.app/api/admin/deleteUser/${id}`);
                if (response.data.success)
                {
                    setDeleteSuccessMsg(true);
                    setTimeout(()=>{
                    setDeleteSuccessMsg(false);
                    }, 5000)
                }
            }
        
        }
        catch(err)
        {
            console.log(`Error: ${err}`);
        }
    }
    return (
        <div>
            {
                usersArray.length === 0 ?
                (
                    <div className='text-[21px]'> Loading <span className='dots-loader'>...</span></div>
                )
                : 
                (

                    <div className='bg-white rounded-lg shadow-md '>
                        <table className="w-full ">
                            <thead className="">
                                <tr>
                                    <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">USER ID</td>
                                    <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">EMAIL</td>
                                    <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">JOIN DATE</td>
                                    <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">USER DETAILS</td>
                                    <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ACTIONS</td>
                                </tr>
                            </thead>
                            <tbody className=" divide-y divide-gray-200">
                                {
                                    usersArray.map((userItem)=>{
                                        let userdate = new Date(userItem.createdAt);
                                        return (   
                                            <tr key={userItem._id}>
                                                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{userItem._id.slice(0,10)}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-gray-900">{userItem.email}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-gray-900">{userdate.toLocaleDateString('sv-SE')}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                                                    <button className='bg-green-800 hover:bg-green-400 px-[10px] py-[4] rounded-md'>view</button>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex space-x-2">
                                                    <button className="text-blue-600 hover:text-blue-900">
                                                    <Eye className="h-4 w-4" />
                                                    </button>
                                                    <button className="text-red-600 hover:text-red-900">
                                                    <Trash2 onClick={()=>{deleteUser(userItem._id)}} className="h-4 w-4" />
                                                    </button>
                                                </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        {deleteSuccessMsg && (<p className='successMessage'>User Successfully Deleted</p>)}
                    </div>
                )
            }
        </div>
    )
}