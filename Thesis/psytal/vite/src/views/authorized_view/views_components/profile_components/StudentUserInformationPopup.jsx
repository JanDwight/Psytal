import React, {useState} from 'react'

export const StudentUserInformationPopup = ({onCloseStudentUserInfo, data, onStudentUserInformationChange}) => {
    //calling the sample data
    

    //changing the email
    const handleStudentUserInformationChange = (event) => {
        setStudentUserInformation(event.target.value);
      };

    //Bahalakana dito hahahha
    const handleSubmit = () => {
        onStudentUserInformationChange(data);
        onClose();
      };
      
  return (
    <div className="flex-col mx-2 mb-2"> 
        <div className='text-lg font-serif'>
            <i>User Role : <strong> Student</strong></i>
        </div> <hr className="mt-2" />

        <form>
            <table className=" inline-table mt-5">
                <tbody>
                {/**Name */}
                <tr className='bg-gray-200'style={{border:1 }}>
                    <th className='px-5'>Name</th>
                    <td>
                        <input className="bg-transparent"
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={handleStudentUserInformationChange}
                            placeholder="Full name"
                            style={{
                                fontSize: 16,
                                }}
                        />
                    </td>
                </tr>
                {/**ID */}
                <tr>
                    <th className='px-5'>Student ID</th>
                    <td>
                        <input 
                            type="number"
                            name="student_id"
                            value={data.student_id}
                            onChange={handleStudentUserInformationChange}
                            placeholder="Student ID"
                            style={{
                                fontSize: 16,
                                }}
                        />
                    </td>
                </tr>
                {/**Year and Section */}
                <tr>
                    <th className='px-5'>Year and Section</th>
                    <td>
                        <input 
                            type="text"
                            name="yearsection"
                            value={data.yearsection}
                            onChange={handleStudentUserInformationChange}
                            placeholder="Year & Section"
                            style={{
                                fontSize: 16,
                                }}
                        />
                    </td>
                </tr>
                {/**Semester Enrolled */}
                <tr>
                    <th className='px-5'>Semester Enrolled</th>
                    <td>
                        <input 
                            type="text"
                            name="sem_enrolled"
                            value={data.sem_enrolled}
                            onChange={handleStudentUserInformationChange}
                            placeholder="Semester Enrolled"
                            style={{
                                fontSize: 16,
                                }}
                        />
                    </td>
                </tr>
                {/**Email */}
                <tr>
                    <th className='px-5'>Email</th>
                    <td>
                        <input 
                            type="email"
                            name="oldemail"
                            value={data.email}
                            onChange={handleStudentUserInformationChange}
                            placeholder="Email"
                            style={{
                                fontSize: 16,
                                }}
                        />
                    </td>
                </tr>
                {/**Conatct Number */}
                <tr>
                    <th className='px-5'>Contact Number</th>
                    <td>
                        <input 
                            type="number"
                            name="contact_num"
                            value={data.contact_num}
                            onChange={handleStudentUserInformationChange}
                            placeholder="Conatact Number"
                            maxLength={11}
                            style={{
                                fontSize: 16,
                                }}
                        />
                    </td>
                </tr>
                {/**Date of Birth */}
                <tr>
                    <th className='px-5'>Date of Birth</th>
                    <td>
                        <input 
                            type="date"
                            name="date_of_birth"
                            value={data.date_of_birth}
                            onChange={handleStudentUserInformationChange}
                            placeholder="Date of Birth"
                            style={{
                                fontSize: 16,
                                }}
                        />
                    </td>
                </tr>
                {/**Adress */}
                <tr>
                    <th className='px-5'>Address</th>
                    <td>
                        <input 
                            type="text"
                            name="adress"
                            value={data.address}
                            onChange={handleStudentUserInformationChange}
                            placeholder="Address"
                            style={{
                                fontSize: 16,
                                }}
                        />
                    </td>
                </tr>
                </tbody> 
            </table>

        <div className='text-md font-serif py-3'>
            <i> EMERGENCY CONTACTS :</i>
            <table className='mt-3'>
                <tbody>
                {/**Name of emergency Contact */}
                <tr>
                    <th className='px-5'>Name:</th>
                    <td>
                        <input 
                            type="text"
                            name="emergency_contact_name"
                            value={data.emergency_contact_name}
                            onChange={handleStudentUserInformationChange}
                            placeholder="Name"
                            style={{
                                fontSize: 16,
                                }}
                        />
                    </td>
                </tr>

                <tr>
                    <th className='px-5'>Contact Number:</th>
                    <td>
                        <input 
                            type="number"
                            name="emergency_contact)_num"
                            value={data.emergency_contact_num}
                            onChange={handleStudentUserInformationChange}
                            placeholder="Contact Number"
                            maxLength={11}
                            style={{
                                fontSize: 16,
                                }}
                        />
                    </td>
                </tr>

                <tr>
                    <th className='px-5'>Address:</th>
                    <td>
                        <input 
                            type="text"
                            name="emergency_contact_address"
                            value={data.emergency_contact_address}
                            onChange={handleStudentUserInformationChange}
                            placeholder="Address"
                            style={{
                                fontSize: 16,
                                }}
                        />
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        
    </form>
        <div className='mt-5 flex felx-row-2 justify-center'>
            <button 
                onClick={handleSubmit} 
                className="bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded-xl">
                Confirm
            </button>
            <button onClick={onCloseStudentUserInfo} className="bg-[#f34450] hover:bg-red-700 text-white font-bold py-2 px-4 ml-3 rounded-xl">
                Cancel
            </button>                    
        </div>

    </div>
  )
}
