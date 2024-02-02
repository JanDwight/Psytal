import React, {useState} from 'react'
import axiosClient from '../../../../axios';

export const EditEmail = ({onCloseEditEmail, data}) => {
    //calling the sample data
    const [email, setEmail] = useState(data);

    //Bahalakana dito hahahha
    const handleSubmit = () => {
            axiosClient.post('/userprofileemailupdate', {email: email})
            .then((res) => {
            });

        onClose();
      };

      console.log(email)
  return (
    <div className="popup">
      <div className="popup-content">
                <div className="flex flex-wrap flex-col mx-2 mb-2">
                    <label className="text-lg font-franklin">Email:</label>
                        <input className="appearance-none block bg-gray-300 rounded-md w-full py-1.5 text-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                            type="email"
                            name="oldemail"
                            value={email.email}
                            readOnly
                            placeholder="Old Email"
                            style={{
                                border: "none",
                                outline: "none",
                                fontSize: 16,
                                }}
                        ></input>
                        
                    <label className="mt-3 text-lg font-franklin">New Email</label>
                        <input className="appearance-none block bg-gray-300 rounded-md w-full py-1.5 text-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                            type="email"
                            name="newemail"
                            value={email}
                            onChange={ev => setEmail(event.target.value)}
                            placeholder="New Email"
                            style={{
                                border: "none",
                                outline: "none",
                                fontSize: 16,
                                }}
                        ></input> 
                </div>

                <div className='mt-5 flex felx-row-2 justify-center'>
                    <button onClick={handleSubmit} 
                        className="bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded-xl">
                        Confirm
                    </button>
                    <button onClick={onCloseEditEmail} className="bg-[#E2202C] hover:bg-[#E2202C] text-white font-bold py-2 px-4 rounded-xl">
                        Cancel
                    </button>                    
                </div>

      </div>
    </div>
  )
}
