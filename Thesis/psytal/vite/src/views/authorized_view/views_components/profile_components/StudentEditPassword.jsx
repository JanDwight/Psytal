import React, {useState} from 'react'

export const StudentEditPassword = ({ onCloseStudentEditPassword, data, onStudentPasswordChange }) => {
    //calling the sample data
    

    //changing password
    const handleStudentPasswordChange = (event) => {
      setStudentPassword(event.target.value);
    };
    //Submiting the changed data
    const handleSubmit = () => {
      onStudentPasswordChange(data);
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
                    <label className="text-lg font-franklin">Password:</label>
                        <input className="appearance-none block bg-gray-300 rounded-md w-full py-1.5 text-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                            type={isVisible ? "text" : "password"}
                            name="password"
                            value={data.password}
                            //onChange={handlePasswordChange}
                            disabled readOnly
                            placeholder="old password"
                            style={{
                                border: "none",
                                outline: "none",
                                fontSize: 16,
                                }}
                        ></input>
                        
                    <label className="mt-3 text-lg font-franklin">New Password</label>
                        <input className="appearance-none block bg-gray-300 rounded-md w-full py-1.5 text-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                            type={isVisible ? "text" : "password"}
                            name="newpassword"
                            value={data.newpassword}
                            onChange={handleStudentPasswordChange}
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
                        className="bg-[#0FE810] hover:bg-lime-700 text-white font-bold py-2 px-4 rounded-xl">
                        Confirm
                    </button>
                    <button onClick={onCloseStudentEditPassword} className="bg-[#f34450] hover:bg-red-700 text-white font-bold py-2 px-4 ml-3 rounded-xl">
                        Cancel
                    </button>                    
                </div>

      </div>
    </div>
  )
}
