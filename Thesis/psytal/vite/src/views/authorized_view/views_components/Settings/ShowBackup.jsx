import React, { useState, useEffect } from 'react'
import axiosClient from '../../../../axios';
import Feedback from '../../../feedback/Feedback';

export default function ShowBackup({closeModal}) {
    const [selectedRows, setSelectedRows] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [successStatus, setSuccessStatus] = useState('');
    const [selectAll, setSelectAll] = useState(false);
    const [backupFiles, setBackupFiles] = useState([]);
  
    //For backup file list
    useEffect(() => {
        axiosClient
        .get('/listBackupFiles')
        .then((res) => {
            setBackupFiles(res.data.backup_files);  // Assuming res.data is an array
        })
        .catch((error) => {
            console.error('Error fetching backup files:', error);
        });
    }, []);
  
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
        setSelectedRows(backupFiles.map((_, index) => index));
      }
      setSelectAll(!selectAll);
    };

    const handleExport = async () => {
        const selectedItems = selectedRows.map((index) => backupFiles[index].file_name);
    
        if (selectedItems.length === 0) {
            console.log('No Selected Items.');
            // Change with success/error message later
        } else {
            try {
                for (const fileName of selectedItems) {
                    const response = await axiosClient.get(`/download_backup/${fileName}`);
    
                    const blob = new Blob([response.data], { type: response.headers['content-type'] });
    
                    // Create a link element
                    const link = document.createElement('a');
                    link.href = window.URL.createObjectURL(blob);
                    link.download = fileName;
    
                    // Append the link to the document body and programmatically click it
                    document.body.appendChild(link);
                    link.click();
    
                    // Clean up
                    document.body.removeChild(link);
                }
                setTimeout(() => {
                  closeModal();
              }, 3000);
            } catch (error) {
                console.error('Error exporting items:', error);
            }
        }
    };

    const handleDelete = () => {
        const selectedItems = selectedRows.map((index) => backupFiles[index].file_name);
        if (selectedItems.length === 0) {
            console.log('No Selected Items.')
            //change with succes/error message later
        } else {
           axiosClient.post('/delete_backup', { selectedItems })
                      .then(response=> {
                        setSuccessMessage(response.data.message);
                        setSuccessStatus(response.data.success);
                      })
                      setTimeout(() => {
                        closeModal();
                    }, 3000);
        }
    }
  
    return (
    <div className="p-3 pb-3 fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 ">
        <Feedback isOpen={successMessage !== ''} onClose={() => setSuccessMessage('')} successMessage={successMessage} status={successStatus} refresh={false}/>
        <div className="relative bg-white px-4 py-6 shadow-lg rounded-lg max-h-[90vh] overflow-auto min-w-[40vw] min-h-[20vh]">
          <div className="mb-6"> 
            <table className="min-w-full">
              <thead>
                <tr>
                  <th>Select</th>
                  <th>Backup File</th>
                  <th>Date Created</th>
                </tr>
              </thead>
              <tbody>
                {backupFiles.map((fileName, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'odd:bg-green-100' : ''} onClick={() => toggleRowSelection(index)}>
                    <td className='text-center border border-gray-300'>
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(index)}
                        onChange={() => toggleRowSelection(index)}
                      />
                    </td>
                    <td className='text-center border border-gray-300'>{fileName.file_name}</td>
                    <td className='text-center border border-gray-300'>{fileName.date_created}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
                <input id='allselect' type="checkbox" className="ml-5" checked={selectAll} onChange={toggleSelectAll}/>
                <label for='allselect' className="ml-2">Select All</label>
                <button onClick={closeModal} className="mr-2 absolute top-2 right-0 bg-red-600 text-white px-3 py-1 rounded-full hover:bg-red-700 cursor-pointer">
                        X
                </button>
            <div className="justify-end flex space-x-3">
                <button onClick={handleExport} className="bg-lime-600 hover:bg-lime-700 text-white px-3 py-1 rounded-full cursor-pointer">
                    Download
                </button>
                <button onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full cursor-pointer">
                    Delete
                </button>
            </div>
        </div>
    </div>
    );
  }