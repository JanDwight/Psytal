import React, {useState} from 'react'
import axiosClient from '../../../../axios';

export const EditPassword = ({ onCloseEditPassword, data }) => {
    //calling the sample data
    const [password, setPassword] = useState(data);

    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };
  
    const handleSubmit = () => {
      axiosClient.post('/userprofilepasswordupdate', {password: password})
            .then((res) => {
            });

      onClose();
    };
    //Password can be seen/not
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
      setIsVisible(!isVisible);
    };

  return (
    <div className="popup">
      <div className="popup-content">
                <div className="flex flex-wrap flex-col mx-2 mb-2">
                        
                    <label className="mt-3 text-lg font-franklin">New Password</label>
                        <input className="appearance-none block bg-gray-300 rounded-md w-full py-1.5 text-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                            type={isVisible ? "text" : "password"}
                            name="newpassword"
                            value={password.newpassword}
                            onChange={handlePasswordChange}
                            placeholder="New Password"
                            style={{
                                border: "none",
                                outline: "none",
                                fontSize: 16,
                                }}
                        ></input> 
                </div>

                <button onClick={toggleVisibility} className=' text-blue-400'>
                    {isVisible ? "Hide Password" : "Show Password"}
                </button>

                <div className='mt-5 flex felx-row-2 justify-center'>
                    <button onClick={handleSubmit} 
                        className="bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded-xl">
                        Confirm
                    </button>
                    <button onClick={onCloseEditPassword} className="bg-[#E2202C] hover:bg-[#E2202C] text-white font-bold py-2 px-4 rounded-xl">
                        Cancel
                    </button>                    
                </div>

      </div>
    </div>
  )
}
