import React, { useState } from 'react';
import axiosClient from '../../../axios.js';
import ReactModal from 'react-modal';
import RestorePrompt from '../prompts/RestorePrompt.jsx'

export default function ShowArchiveTable({ showModal, onClose, dataTable}) {
  const [selectedRows, setSelectedRows] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);
  const [selectAll, setSelectAll] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [promptList, setPromptList] = useState([]);
  const action = "Confirm Restore Files";

  if (!showModal) {
    return null;
  }

  //<><><><><>
  const editprompt = (ev) => {
    ev.preventDefault();
    
    if (selectedRows.length === 0) {
      // No items selected, show an error message
      setSuccessMessage({
        message: 'Please select items to restore.',
      });
      setTimeout(() => {
        setSuccessMessage(null);
      }, 2000);
      return;
    }

    const selectedItems = selectedRows.map((index) => ({
      item_name: dataTable[index].item_name,
      item_type: dataTable[index].item_type,
    }));

    console.log('Selected:', selectedItems);
    
    setPromptList(selectedItems);
    setShowPrompt(true);
  }

  // Function to toggle the selection of a row
  const toggleRowSelection = (index) => {
    const isSelected = selectedRows.includes(index);
    if (isSelected) {
      setSelectedRows(selectedRows.filter((i) => i !== index));
    } else {
      setSelectedRows([...selectedRows, index]);
    }
  };
  // Function to toggle the selection of all rows
  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(dataTable.map((_, index) => index));
    }
    setSelectAll(!selectAll);
  };

  // Handle backup
  const handleBackup = async () => {
    // Get the data of the selected rows
    const selectedItems = selectedRows.map((index) => dataTable[index].id);
    
    try {
      // Make a POST request to your backend endpoint with selectedItems as the request payload
      const response = await axiosClient.post('/backup_archives', { selectedItems });
      //add function to download as txt file
          //
              // Create a Blob object from the response data
              const blob = new Blob([response.data], { type: 'text/plain' });

              // Create a link element
              const downloadLink = document.createElement('a');

              // Set the link's href attribute to the URL of the Blob
              downloadLink.href = window.URL.createObjectURL(blob);

              // Get the current date and time
              const currentDate = new Date();
              const dateString = currentDate.toISOString().slice(0,10).replace(/-/g,"");
              const timeString = currentDate.toTimeString().slice(0,8).replace(/:/g,"");

              // Set the filename for the downloaded file including current date and time
              downloadLink.download = `psytal_backup_${dateString}_${timeString}.txt`;

              // Append the link to the body
              document.body.appendChild(downloadLink);

              // Click the link to trigger the download
              downloadLink.click();

              // Remove the link from the body
              document.body.removeChild(downloadLink);
          //

      setSuccessMessage({
        message: 'Items backed up and deleted successfully!',
      });

      setTimeout(() => {
        setSuccessMessage(null);
        setSelectedRows([]);
        onClose();
        //window.location.reload();
      }, 3000);
      // Handle the response from the backend as needed
      console.log('Response from backend:', response.data);
      
    } catch (error) {
      console.error('Error restoring items:', error);
      // Handle errors
    }

    //send selectedItems as array to the controller
  };

  const handleRestore = async () => {
    // Get the data of the selected rows
    const selectedItems = selectedRows.map((index) => dataTable[index].id);
    console.log('Selected:', selectedItems);

    if (selectedItems.length === 0) {
      // No items selected, show an error message
      setSuccessMessage({
        message: 'Please select items to restore.',
      });
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
      return;
    }

    try {
      // Make a POST request to your backend endpoint with selectedItems as the request payload
      const response = await axiosClient.post('/return_archives', { selectedItems });


      setSuccessMessage({
        message: 'Item/s restored successfully!',
      });

      setTimeout(() => {
        setSuccessMessage(null);
        setSelectedRows([]);
        onClose();
      }, 3000);
  
      // Reset selectedRows when handling restore
      
    } catch (error) {
      console.error('Error restoring items:', error);
      // Handle errors
    }
  };

  const handleCloseModal = () => {
    setSelectAll(false);
    setSelectedRows([]);
    onClose();
  };

  return (
    <div className="p-3 fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white h-4/5 w-4/5 px-4 pt-11 pb-12 shadow-lg rounded-lg">
        <button
          onClick={handleCloseModal}
          className="mr-2 absolute top-2 right-0 bg-red-600 text-white px-3 py-1 rounded-full hover:bg-red-700 cursor-pointer"
        >
          X
        </button>
        <div className="mb-3 max-h-full border overflow-auto border-gray-300"> {/* Add margin to the bottom of the table */}
          <table className="min-w-full">
            <thead className="sticky top-0 bg-white">
              <tr>
                <th>Select</th>
                <th>Archived On</th>
                <th>Item Name</th>
                <th>Item Type</th>
                <th>Origin Table</th>
                <th>Archiver Name</th>
                <th>Archiver Role</th>
              </tr>
            </thead>
            <tbody>
              {dataTable.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? 'odd:bg-green-100' : ''} onClick={() => toggleRowSelection(index)}>
                  <td className='text-center px-2'>
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(index)}
                      onChange={() => toggleRowSelection(index)}
                    />
                  </td>
                  <td className='text-center px-2'>{item.archived_at}</td>
                  <td className='text-center px-2'>{item.item_name}</td>
                  <td className='text-center px-2'>{item.item_type}</td>
                  <td className='text-center px-2'>{item.origin_table}</td>
                  <td className='text-center px-2'>{item.archiver_name}</td>
                  <td className='text-center px-2'>{item.archiver_role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <input
              type="checkbox"
              checked={selectAll}
              onChange={toggleSelectAll}
              className="ml-4"
            />
        <label className="ml-2">Select All</label>
  
        <div className="absolute bottom-2 right-2 flex space-x-3">
          <button onClick={editprompt} className="bg-lime-600 hover:bg-lime-700 text-white px-3 py-1 rounded-full cursor-pointer">
            Restore
          </button>
          <button hidden={true} onClick={handleBackup} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full cursor-pointer">
            Backup
          </button>

        </div>
      </div>
      <ReactModal
            isOpen={showPrompt}
            onRequestClose={() => setShowPrompt(false)}
            className="md:w-[1%]"
          >
            <div>
                <RestorePrompt
                    closeModal={() => setShowPrompt(false)}
                    handleSave={handleRestore}
                    action={action}
                    promptList={promptList}
                />
            </div>
      </ReactModal>
      {successMessage && (
        <div className="fixed top-0 left-0 w-full h-full overflow-y-auto bg-black bg-opacity-50">
          <div className="lg:w-1/2 px-4 py-1 shadow-lg w-[20%] h-fit bg-[#FFFFFF] rounded-xl mt-[10%] mx-auto p-5">
            <div className="w-full px-4 mx-auto mt-6">
              <div className="text-center text-xl text-green-600 font-semibold my-3">
                {successMessage.message}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    
  );
}