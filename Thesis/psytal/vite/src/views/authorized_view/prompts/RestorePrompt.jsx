import React from 'react';

export default function ArchiveWarning({closeModal, handleSave, action, promptList }) {

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
                  The following items will be restored:
                </p>
                <table className="min-w-full border border-gray-300">
                  <thead>
                    <tr>
                      <th>Item Type</th>
                      <th>Item Name</th>
                    </tr>
                  </thead>
                  <tbody>
                  {promptList.map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'odd:bg-green-100' : ''}>
                      <td className='text-center'>{item.item_type}</td>
                      <td className='text-center'>{item.item_name}</td>
                    </tr>
                  ))}
                  </tbody>
                </table>
                <p className='pt-2'>
                  Do you wish to proceed?
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