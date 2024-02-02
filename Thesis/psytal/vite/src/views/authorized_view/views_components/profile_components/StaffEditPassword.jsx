import React, {useState} from 'react'

export const StaffEditPassword = ({onCloseStaffEditPassword, displayData, onStaffPasswordChange}) => {
    const [staff_password, setStaffPassword]=useState(displayData);

    const handleStaffPasswordChange = (event) => {
        setStaffPassword(event.target.value);
    }

    const handleSubmit =()=> {
        onStaffPasswordChange(staff_password);
        onclose();
    }
    //Password can be seen/not
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
      setIsVisible(!isVisible);
    };

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full rounded-t-lg px-4 py-5 bg-white border-0 mt-3">
        <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap flex-col mx-2 mb-2">
                <label className="text-lg font-franklin">Password:</label>
                <input className="appearance-none block bg-gray-300 rounded-md w-full py-1.5 text-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                    type={isVisible ? "text" : "password"}
                    name="password"
                    value={staff_password.password}
                    readOnly
                    placeholder="old password"
                    style={{
                        border: "none",
                        outline: "none",
                        fontSize: 16,
                        }}
                />                        
                <label className="mt-3 text-lg font-franklin">New Password</label>
                <input className="appearance-none block bg-gray-300 rounded-md w-full py-1.5 text-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                    type={isVisible ? "text" : "password"}
                    name="newpassword"
                    value={staff_password.newpassword}
                    onChange={handleStaffPasswordChange}
                    placeholder="New Password"
                    style={{
                        border: "none",
                        outline: "none",
                        fontSize: 16,
                        }}
                />
            </div>

            <label onClick={toggleVisibility} className=' text-blue-400 cursor-pointer'>
                {isVisible ? "Hide Password" : "Show Password"}
            </label>

            <div className='mt-5 flex felx-row-2 justify-center'>
                <button onClick={handleSubmit}
                    className="bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded-xl">
                        Confirm
                </button>
                <button onClick={onCloseStaffEditPassword}
                    className="bg-[#E2202C] hover:bg-[#E2202C] text-white font-bold py-2 px-4 rounded-xl">
                        Cancel
                </button>
            </div>
        </form>
    </div>
  )
}
