import React, {useState} from 'react'
import avatar from "@assets/icons8avatar.png";
import edit from "@assets/icons8createpost.png";
import ReactModal from 'react-modal';
import { StudentEditEmail } from './StudentEditEmail';
import { StudentEditPassword } from './StudentEditPassword';
import { StudentUserInformationPopup } from './StudentUserInformationPopup';

export default function StudentProfile({closeModal}) {
    //Sample Data's
    const [displayData, setDisplayData] = useState({
        name: "John Doe",
        student_id: "190000001",
        yearsection: "4B",
        sem_enrolled: "1st Semester, SY:2023-2024",
        email: "john.doe@example.com",
        contact_num:"09123456789",
        date_of_birth: "2000-09-22",
        address: "123, St., ABC",
        emergency_contact_name: "Muhamad",
        emergency_contact_num: "09123456789",
        emergency_contact_address:"Block 123, Street 1, City",
        newemail: "john.deo123@example.com",  
        password: "password123",
        newpassword: "abcde123",
        position: "Chairperson"     
      });

    //calling the sample data
    const [profile, setProfile] = useState(displayData);
    //CALLING EditPassword
    const [isStudentEditPasswordOpen, setIsStudentEditPasswordOpen] = useState(false);
    //CALLING EditPEmail
    const [isStudentEditEmailOpen, setIsStudentEditEmailOpen] = useState(false);
    //CALLING UserInformation
    const [isStudentUserInformationOpen, setIsStudentUserInformationOpen] = useState(false);
  return (
    <>
    <div>
      <form action="">
        <div className='flex flex-row-3 w-full'>
            <img className="object-cover w-20 h-20 mx-2 rounded-full" src={avatar} alt="avatar"/>
            <div className="flex flex-row justify-between mx-2 mb-2">
                <input
                    className="block w-full rounded-md py-1.5 text-gray-700 bg-transparent placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6" 
                    type="text"
                    name="displayname"
                    value={profile.name}
                    //onChange={handleProfile}
                    readOnly
                    placeholder="displayname"
                    style={{
                        border: "none",
                        fontWeight: "bold",
                        margin: 4,
                        fontSize: 40,
                        color: '#1f2937'
                    }}
                />                    
                
            </div> 
            
            <div className="flex flex-col justify-between mx-2 mb-2">
                <label onClick={()=> setIsStudentUserInformationOpen (true)}
                    className='cursor-pointer mx-3 px-2 py-1 bg-green-600 rounded-md'>User Information 
                </label>
                <label 
                    className='cursor-pointer mt-1 mx-3 px-2 py-1 bg-green-600 rounded-md'>Curriculum Checklist
                </label>
            </div>                        
        </div>

        <div className="flex flex-wrap flex-col px-3 mx-16 mt-5 mb-2">
            <div className="w-full px-3 md:mb-0 mt-2">
                <label className=" text-gray-700 text-lg font-bold mb-2  p-2 rounded-md bg-green-600">Account Informations: </label> 
            </div>
            
            <div className='mx-10 mt-2'>
                <label className=" text-gray-700 text-md font-bold px-2 mb-2">Email: </label>
            </div>
            <div className='flex flex-row mx-16 mt-2'>
                <input
                    className="appearance-none block bg-gray-300 rounded-md w-full py-1.5 text-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                    type="email"
                    name="email"
                    value={profile.email}
                    readOnly
                    //onChange={handleProfile}
                    placeholder="Email"
                    style={{
                    border: 1,
                    outline: "none",
                    fontSize: 16,
                    }}
                />
                <div className='p-2 bg-gray-200 rounded-md mx-2'>
                    <img onClick={()=> setIsStudentEditEmailOpen(true)}
                        src={edit} // Replace 'editImage' with the path to your edit image
                        alt='edit'
                        className='h-6 w-6 cursor-pointer' // Add 'cursor-pointer' to make it look clickable
                    />
                </div>
            </div>

            <div className='mx-10 mt-2'>
                <label className=" text-gray-700 text-md font-bold px-2 mb-2">Password: </label>
            </div>
            <div className='flex flex-row mx-16 mt-2'>
                <input
                    className="appearance-none block bg-gray-300 rounded-md w-full py-1.5 text-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                    type="password"
                    name="password"
                    value={profile.password}
                    readOnly
                    //onChange={handleProfile}
                    placeholder="Password"
                    style={{
                    border: 1,
                    outline: "none",
                    fontSize: 16,
                    }}
                />
                <div className='p-2 bg-gray-200 rounded-md mx-2'>
                    <img onClick={()=> setIsStudentEditPasswordOpen(true)}
                        src={edit} // Replace 'editImage' with the path to your edit image
                        alt='edit'
                        className='h-6 w-6 cursor-pointer' // Add 'cursor-pointer' to make it look clickable
                    />
                </div>
            </div>
        </div>       

        <div className='mt-5 grid grid-row-2 justify-center'>
            <button onClick={closeModal} className="bg-[#E2202C] rounded-2xl mt-3 px-5 text-white font-size">
                Close
            </button>
        </div>
      </form>
    </div>

    

    {/**Setting the Edit Email*/}
    <ReactModal
    isOpen={isStudentEditEmailOpen}
    onRequestClose={() => setIsStudentEditEmailOpen(false)}
    className="w-full lg:w-[30%] h-fit bg-white rounded-3xl ring-1 ring-black shadow-2xl mt-[10%] mx-auto p-5"
    >
        <div><StudentEditEmail displayData={displayData} onCloseStudentEditEmail={()=> setIsStudentEditEmailOpen (false)}/></div>
    </ReactModal>

    {/**Setting the Edit Password*/}   
    <ReactModal
    isOpen={isStudentEditPasswordOpen}
    onRequestClose={() => setIsStudentEditPasswordOpen(false)}
    className="w-full lg:w-[30%] h-fit bg-white rounded-3xl ring-1 ring-black shadow-2xl mt-[10%] mx-auto p-5"
    >
        <div><StudentEditPassword displayData={displayData} onCloseStudentEditPassword={()=> setIsStudentEditPasswordOpen (false)}/></div>
    </ReactModal>

    {/**Setting the User Information*/} 
    <ReactModal
    isOpen={isStudentUserInformationOpen}
    onRequestClose={()=> setIsStudentUserInformationOpen(false)}
    className="w-full lg:w-[30%] h-fit bg-white rounded-3xl ring-1 ring-black shadow-2xl mt-[10%] mx-auto p-5"
    >
        <div><StudentUserInformationPopup displayData={displayData} onCloseStudentUserInfo={()=> setIsStudentUserInformationOpen (false)}/></div>
    </ReactModal>

    </>
  )
}
