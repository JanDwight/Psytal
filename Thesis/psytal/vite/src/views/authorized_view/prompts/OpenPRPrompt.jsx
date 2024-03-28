import React from 'react';

export default function OpenPRPrompt({ 
  closeModal, handleSave, startOfPreReg, endOfPreReg, startOfSchoolYear, endOfSchoolYear, semester
}) {

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  const handleYes = () => {
    handleSave();
    closeModal()
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full lg:w-1/2 px-4 py-6 shadow-lg rounded-lg">
            <div className="mb-6 text-center"> 
            <strong className='text-lg'>Confirm pre-registration period</strong>
            <p className='mt-2'>
              For schoolyear {startOfSchoolYear}-{endOfSchoolYear}, {semester}.
              Pre-registration will be open from <b>{formatDate(startOfPreReg)} - {formatDate(endOfPreReg)}</b>.
              <br></br>
              Do you wish to Proceed?
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