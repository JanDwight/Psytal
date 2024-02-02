import React, {useState} from 'react'
import avatar from "@assets/icons8avatar.png";
import edit from "@assets/icons8createpost.png";
import ReactModal from 'react-modal';
import { InstructorEditDisplayName } from './InstructorEditDisplayName';
import { InstructorEditEmail } from './InstructorEditEmail';
import { InstructorEditPassword } from './InstructorEditPassword';
import { InstructorUserInformation } from './InstructorUserInformation';

export const InstructorProfile = ({closeModal}) => {
    //Sample Data's
    const [displayData, setDisplayData] = useState({
        displayname: "John Doe",
        newdisplayname: "John Doe - Instructor",
        email: "john.doe@example.com",
        newemail: "john.deo123@example.com",  
        password: "password123",
        newpassword: "abcde123",
        position: "Instructor" ,
        department: "Department of Psychology"    
      });

    //calling the sample data
    const [instructorprofile, setInstructorProfile] = useState(displayData);
    //CALLING EditStaffDisplayName
    const [isEditInstructorDisplayName, setIsEditInstructorDisplayName] = useState(false);
    //CALLING EditStaffPassword
    const [isEditInstructorPasswordOpen, setIsEditInstructorPasswordOpen] = useState(false);
    //CALLING EditStaffEmail
    const [isEditInstructorEmailOpen, setIsEditInstructorEmailOpen] = useState(false);
    //CALLING StaffUserInformation
    const [isInstructorUserInformationOpen, setIsInstructorUserInformationOpen] = useState(false);
  return (
    <div className='relative flex flex-col min-w-0 break-words w-full'>
        <form>
            {/**-----------------------------------COL1-------------------------------------- */}
            <div className='flex flex-row-3 w-full'>
                {/* Attach Photo / File */}
                <div>
                    <label htmlFor="upload" className="flex flex-row items-center gap-2 cursor-pointer">
                    <img src={avatar} className="h-20 w-20 rounded-full cursor-pointer mt-5" alt="Avatar" />
                    </label>
                    <input id="upload" type="file" className="hidden"/>
                </div>
                {/**Displayname - User Info btn */}
                <div className="flex flex-row justify-between mx-2 mb-2">
                    <input
                        className="block w-full rounded-md py-1.5 text-gray-700 bg-transparent placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6" 
                        type="text"
                        name="displayname"
                        value={instructorprofile.displayname}
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
                    <div className='mt-10 p-2 bg-gray-200' onClick={()=>setIsEditInstructorDisplayName(true)}>
                        <img onClick={()=>setIsEditInstructorDisplayName(true)}
                            src={edit} 
                            alt='edit'
                            className='h-5 w-5 cursor-pointer' 
                        /> 
                    </div>
                </div>
                {/**Btn for User Info */}
                <div className='md:mx-10'>
                    <label onClick={()=>setIsInstructorUserInformationOpen(true)}
                        className='cursor-pointer p-2 bg-green-600 rounded-md'>User Information 
                    </label>
                </div>   
            </div>
            {/**-----------------------------------COL2-------------------------------------- */}
            <div className="flex flex-wrap flex-col px-3 mx-16 mt-5 mb-2">
                <div className="w-full px-3 md:mb-0 mt-2">
                    <label className=" text-gray-700 text-lg font-bold mb-2  p-2 rounded-md bg-green-600">Account Informations: </label> 
                </div>
                
                <div className='md:mx-1 mt-2'>
                    <label className=" text-gray-700 text-md font-bold px-2 mb-2">Email: </label>
                </div>
                <div className='flex flex-row md:mx-16 mt-2'>
                    <input
                        className="appearance-none block bg-gray-300 rounded-md w-full py-1.5 text-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                        type="email"
                        name="email"
                        value={instructorprofile.email}
                        readOnly
                        placeholder="Email"
                        style={{
                        border: 1,
                        outline: "none",
                        fontSize: 16,
                        }}
                    />
                    <div className='p-2 bg-gray-200 rounded-md mx-2' onClick={()=>setIsEditInstructorEmailOpen(true)}>
                        <img onClick={()=>setIsEditInstructorEmailOpen(true)}
                            src={edit} 
                            alt='edit'
                            className='h-6 w-6 cursor-pointer' 
                        />
                    </div>
                </div>

                <div className='md:mx-1 mt-2'>
                    <label className=" text-gray-700 text-md font-bold px-2 mb-2">Pasword: </label>
                </div>
                <div className='flex flex-row md:mx-16 mt-2'>
                    <input
                        className="appearance-none block bg-gray-300 rounded-md w-full py-1.5 text-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                        type="password"
                        name="password"
                        value={instructorprofile.password}
                        readOnly
                        placeholder="Password"
                        style={{
                        border: 1,
                        outline: "none",
                        fontSize: 16,
                        }}
                    />
                    <div className='p-2 bg-gray-200 rounded-md mx-2' onClick={()=>setIsEditInstructorPasswordOpen(true)}>
                        <img onClick={()=>setIsEditInstructorPasswordOpen(true)}
                            src={edit}
                            alt='edit'
                            className='h-6 w-6 cursor-pointer'
                        />
                    </div>
                </div>
            </div>
            {/**-----------------------------------COL3-------------------------------------- */}
            <div className='mt-5 grid grid-row-2 justify-center'>
                <button onClick={closeModal} className="bg-[#E2202C] rounded-2xl mt-3 px-5 text-white font-size">
                    <span>Close </span>
                </button>
            </div>
        </form>
        
        {/**Setting up the Edit Displayname */}
        <ReactModal
            isOpen={isEditInstructorDisplayName}
            onRequestClose={()=> setIsEditInstructorDisplayName (false)}
            className="w-full lg:w-[30%] h-fit bg-white rounded-3xl ring-1 ring-black shadow-2xl mt-[10%] mx-auto p-5">
            <div>
                <InstructorEditDisplayName displayData={displayData} onCloseEditInstructorDisplayName={()=>setIsEditInstructorDisplayName(false)}/>
            </div>
        </ReactModal>

        {/**Setting up the Edit Email */}
        <ReactModal
            isOpen={isEditInstructorEmailOpen}
            onRequestClose={()=>setIsEditInstructorEmailOpen(false)}
            className="w-full lg:w-[30%] h-fit bg-white rounded-3xl ring-1 ring-black shadow-2xl mt-[10%] mx-auto p-5">
            <div>
                <InstructorEditEmail displayData={displayData} onCloseInstructorEditEmail={()=>setIsEditInstructorEmailOpen(false)}/>
            </div>
        </ReactModal>

        {/**Setting up the Edit Password */}
        <ReactModal
            isOpen={isEditInstructorPasswordOpen}
            onRequestClose={()=>setIsEditInstructorPasswordOpen(false)}
            className="w-full lg:w-[30%] h-fit bg-white rounded-3xl ring-1 ring-black shadow-2xl mt-[10%] mx-auto p-5">
            <div>
                <InstructorEditPassword displayData={displayData} onCloseInstructorEditPassword={()=>setIsEditInstructorPasswordOpen(false)}/>
            </div>
        </ReactModal>

        {/**Setting up the User Information */}
        <ReactModal
            isOpen={isInstructorUserInformationOpen}
            onRequestClose={()=>setIsInstructorUserInformationOpen(false)}
            className="w-full lg:w-[30%] h-fit bg-white rounded-3xl ring-1 ring-black shadow-2xl mt-[10%] mx-auto p-5">
            <div>
                <InstructorUserInformation displayData={displayData} onCloseInstructorUserInformation={()=>setIsInstructorUserInformationOpen(false)}/>
            </div>
        </ReactModal>
    </div>
  )
}
