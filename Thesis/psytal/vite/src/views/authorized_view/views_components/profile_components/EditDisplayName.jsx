import React, {useState} from 'react'

export const EditDisplayName = ({ displayData, onCloseDisplayname }) => {
    const [displayname, setDisplayname] = useState(displayData);
  
    const handleDisplayNameChange = (event) => {
      setDisplayname(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      // Update the profile data in the backend
      // ...  
      onClose();
    };



  return (
    <div className="">
        <div className="relative flex flex-col min-w-0 break-words w-full rounded-t-lg px-4 py-5 bg-white border-0 mt-3">
            <form onSubmit={handleSubmit}>
                <div className="flex flex-wrap flex-col mx-2 mb-2">
                    <label className="text-lg font-franklin">Display Name:</label>
                        <input className="appearance-none block bg-gray-300 rounded-md w-full py-1.5 text-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                            type="text"
                            name="displayname"
                            value={displayname.displayname}
                            readOnly
                            placeholder="Displayname"
                            style={{
                                border: 1,
                                outline: "none",
                                fontSize: 16,
                                }}
                        ></input>
                    <label className="text-lg font-franklin">New Display Name</label>
                        <input className="appearance-none block bg-gray-300 rounded-md w-full py-1.5 text-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                            type="text"
                            name="newdisplayname"
                            value={displayname.newdisplayname}
                            onChange={handleDisplayNameChange}
                            placeholder="New Displayname"
                            style={{
                                border: 1,
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
                    <button onClick={onCloseDisplayname} className="bg-[#E2202C] hover:bg-[#E2202C] text-white font-bold py-2 px-4 rounded-xl">
                        Cancel
                    </button>                    
                </div>
            </form>
        </div>
    </div>
  )
}
