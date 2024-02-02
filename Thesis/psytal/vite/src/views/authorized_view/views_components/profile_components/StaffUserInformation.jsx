import React, {useState} from 'react'

export const StaffUserInformation = ({onCloseStaffUserInformation, displayData, onStaffUserInformationChange}) => {
    const [staff_userinformation, setStaffUserInformation] = useState (displayData);

    const handleStaffUserInformationChange = (event) => {
        setStaffUserInformation(event.target.value);
    }

    const handleSubmit = () => {
        onStaffUserInformationChange(staff_userinformation);
        onclose();
    }

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full rounded-t-lg px-4 py-5 bg-white border-0 mt-3">
        <div className='text-lg font-serif'>
            <i>User Informatiom -<strong> Staff</strong></i>
        </div> <hr className="mt-2" />

        <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap flex-col mx-2 my-5">
                <table>
                    <tbody className='inline-table'>
                        <tr className='bg-gray-200'>
                            <th>Name</th>
                            <td className='w-[50%]'>
                                <input  className="bg-transparent"                               
                                type="text"
                                name="name"
                                value={staff_userinformation.displayname}
                                onChange={handleStaffUserInformationChange}
                                placeholder="Full name"
                                style={{
                                    fontSize: 16,
                                }}/>
                            </td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td className='w-[50%]'>
                                <input                                
                                type="email"
                                name="email"
                                value={staff_userinformation.email}
                                onChange={handleStaffUserInformationChange}
                                placeholder="Email"
                                style={{
                                    fontSize: 16,
                                }}/>
                            </td>
                        </tr>
                        <tr className='bg-gray-200'>
                            <th>Position</th>
                            <td className='w-[50%]'>
                                <input className="bg-transparent" 
                                type="text"
                                name="position"
                                value={staff_userinformation.position}
                                onChange={handleStaffUserInformationChange}
                                placeholder="Position"
                                style={{
                                    fontSize: 16,
                                }}/>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className='mt-5 flex felx-row-2 justify-center'>
                <button onClick={handleSubmit} 
                    className="bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded-xl">
                    Confirm
                </button>
                <button onClick={onCloseStaffUserInformation} className="bg-[#E2202C] hover:bg-[#E2202C] text-white font-bold py-2 ml-2 px-4 rounded-xl">
                    Cancel
                </button>
            </div>
        </form>
    </div>
  )
}
