import React from 'react';

export default function DeclinePrompt({closeModal, handleSave, action, promptMessage }) {

  const handleYes = () => {
    handleSave();
    closeModal()
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full lg:w-2/5 px-4 py-6 shadow-lg rounded-lg">
            <div className="mb-6 text-center"> 
            <strong className="text-2xl">{action}</strong>
                <p className='pt-2'>
                  {promptMessage}
                </p>
            </div>
            <div id="decision" className='text-center space-x-3'>
                <button onClick={handleYes} className="bg-[#397439] hover:bg-[#0FE810] rounded-2xl  px-7 py-2 text-white font-size">
                    Yes
                </button>
                <button onClick={closeModal} className="bg-red-600 hover:bg-red-700 rounded-2xl  px-7 py-2 text-white font-size">
                    No
                </button>
            </div>
      </div>
    </div>
  );
}