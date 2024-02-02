import React, { useState } from 'react';
import axiosClient from '../../../axios.js';

export default function ShowArchiveTable({ showModal, onClose, dataTable}) {
  const [selectedRows, setSelectedRows] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);


  if (!showModal) {
    return null;
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

  // Handle backup
  const handleBackup = async () => {
    // Get the data of the selected rows
    const selectedItems = selectedRows.map((index) => dataTable[index].id);
    console.log('Selected Items for backup:', selectedItems);

    if (selectedItems.length === 0) {
      // No items selected, show an error message
      setSuccessMessage({
        message: 'There is nothing to backup. Please select items to backup.',
      });
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
      return;
    }
    
    try {
      // Make a POST request to your backend endpoint with selectedItems as the request payload
      const response = await axiosClient.post('/backup_archives', { selectedItems });
      setSuccessMessage({
        message: 'Items backed up and deleted successfully!',
      });

      setTimeout(() => {
        setSuccessMessage(null);
        setSelectedRows([]);
        onClose();
        window.location.reload();
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
        message: 'There is nothing to restore. Please select items to restore.',
      });
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
      return;
    }

    try {
      // Make a POST request to your backend endpoint with selectedItems as the request payload
      const response = await axiosClient.post('/return_archives', { selectedItems });

      // Handle the response from the backend as needed
      console.log('Response from backend:', response.data);

      setSuccessMessage({
        message: 'This ITEM has been restored successfully!',
      });

      setTimeout(() => {
        setSuccessMessage(null);
        setSelectedRows([]);
        onClose();
        window.location.reload();
      }, 3000);
  
      // Reset selectedRows when handling restore
      
    } catch (error) {
      console.error('Error restoring items:', error);
      // Handle errors
    }
  };

  const handleCloseModal = () => {
    setSelectedRows([]);
    onClose();
    window.location.reload();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white w-full lg:w-3/4 xl:w-4/5 px-4 py-6 shadow-lg rounded-lg">
        {/* Exit (Close) Button */}
        <button
          onClick={handleCloseModal}
          className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-full hover:bg-red-700 cursor-pointer"
        >
          X
        </button>

        <div className="mb-6"> {/* Add margin to the bottom of the table */}
          <table className="min-w-full">
            <thead>
              <tr>
                <th>Select</th>
                <th>Item Type</th>
                <th>Item Name</th>
                <th>Origin Table</th>
                <th>Archiver Name</th>
                <th>Archiver Role</th>
                <th>Archived On</th>
              </tr>
            </thead>
            <tbody>
              {dataTable.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? 'odd:bg-green-100' : ''}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(index)}
                      onChange={() => toggleRowSelection(index)}
                    />
                  </td>
                  <td>{item.item_type}</td>
                  <td>{item.item_name}</td>
                  <td>{item.origin_table}</td>
                  <td>{item.archiver_name}</td>
                  <td>{item.archiver_role}</td>
                  <td>{item.archived_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="absolute bottom-2 right-2 flex space-x-3">
          <button onClick={handleRestore} className="bg-lime-600 hover:bg-lime-700 text-white px-3 py-1 rounded-full cursor-pointer">
            Restore
          </button>
          <button onClick={handleBackup} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full cursor-pointer">
            Backup
          </button>
        </div>
      </div>
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