import React, {useState} from 'react'
import avatar from "@assets/icons8avatar.png";
import edit from "@assets/icons8createpost.png";
import ReactModal from 'react-modal';
import { EditDisplayName } from './EditDisplayName';
import { EditPassword } from './EditPassword';
import { EditEmail } from './EditEmail';
import { UserInformationPopup } from './UserInformationPopup';

export default function ProfilePopupSample({closeModal}) {
    //Sample Data's
    const [displayData, setDisplayData] = useState({
        displayname: "John Doe",
        newdisplayname: "John Doe - ADMIN",
        email: "john.doe@example.com",
        newemail: "john.deo123@example.com",  
        password: "password123",
        newpassword: "abcde123",
        position: "Chairperson"     
      });

    //calling the sample data
    const [profile, setProfile] = useState(displayData);

    //changing the email
    const handleProfile = (event) => {
        setProfile(event.target.value);
      };

    //CALLING EditDisplayName
    const [isEditDisplayName, setIsDisplayName] = useState(false);
    //CALLING EditPassword
    const [isEditPasswordOpen, setIsEditPasswordOpen] = useState(false);
    //CALLING EditPEmail
    const [isEditEmailOpen, setIsEditEmailOpen] = useState(false);
    //CALLING UserInformation
    const [isUserInformationOpen, setIsUserInformationOpen] = useState(false);

  return (
    <>
    <div className='relative flex flex-col min-w-0 break-words w-full'>
      <form action="">
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
                    value={profile.displayname}
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
                <div className='mt-10 p-2 bg-gray-200'>
                    <img onClick={()=> setIsDisplayName(true)}
                        src={edit} 
                        alt='edit'
                        className='h-5 w-5 cursor-pointer' 
                    /> 
                </div>
            </div> 
            
            <div className='md:mx-10'>
                <label onClick={()=> setIsUserInformationOpen (true)}
                    className='cursor-pointer p-2 bg-green-600 rounded-md'>User Information 
                </label>
            </div>                        
        </div>

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
                    value={profile.email}
                    readOnly
                    placeholder="Email"
                    style={{
                    border: 1,
                    outline: "none",
                    fontSize: 16,
                    }}
                />
                <div className='p-2 bg-gray-200 rounded-md mx-2' onClick={()=> setIsEditEmailOpen(true)}>
                    <img onClick={()=> setIsEditEmailOpen(true)}
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
                    value={profile.password}
                    readOnly
                    placeholder="Password"
                    style={{
                    border: 1,
                    outline: "none",
                    fontSize: 16,
                    }}
                />
                <div className='p-2 bg-gray-200 rounded-md mx-2' onClick={()=> setIsEditPasswordOpen(true)}>
                    <img onClick={()=> setIsEditPasswordOpen(true)}
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

    {/**Setting the Edit Display Name */}
    <ReactModal
    isOpen={isEditDisplayName}
    onRequestClose={()=> setIsDisplayName(false)}
    className="w-full lg:w-[30%] h-fit bg-white rounded-3xl ring-1 ring-black shadow-2xl mt-[10%] mx-auto p-5"
    >
        <div><EditDisplayName displayData={displayData} onCloseDisplayname={()=> setIsDisplayName(false)}/></div>
    </ReactModal>

    {/**Setting the Edit Email*/}
    <ReactModal
    isOpen={isEditEmailOpen}
    onRequestClose={() => setIsEditEmailOpen(false)}
    className="w-full lg:w-[30%] h-fit bg-white rounded-3xl ring-1 ring-black shadow-2xl mt-[10%] mx-auto p-5"
    >
        <div><EditEmail displayData={displayData} onCloseEditEmail={()=> setIsEditEmailOpen (false)}/></div>
    </ReactModal>

    {/**Setting the Edit Password*/}   
    <ReactModal
    isOpen={isEditPasswordOpen}
    onRequestClose={() => setIsEditPasswordOpen(false)}
    className="w-full lg:w-[30%] h-fit bg-white rounded-3xl ring-1 ring-black shadow-2xl mt-[10%] mx-auto p-5"
    >
        <div><EditPassword displayData={displayData} onCloseEditPassword={()=> setIsEditPasswordOpen (false)}/></div>
    </ReactModal>

    {/**Setting the User Information*/} 
    <ReactModal
    isOpen={isUserInformationOpen}
    onRequestClose={()=> setIsUserInformationOpen(false)}
    className="w-full lg:w-[30%] h-fit bg-white rounded-3xl ring-1 ring-black shadow-2xl mt-[10%] mx-auto p-5"
    >
        <div><UserInformationPopup displayData={displayData} onCloseUserInfo={()=> setIsUserInformationOpen (false)}/></div>
    </ReactModal>

    </>
  )
}
