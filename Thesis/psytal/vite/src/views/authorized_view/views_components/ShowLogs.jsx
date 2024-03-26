import React, { useState } from 'react';

export default function ShowLogTable({ showModal, onClose, dataTable}) {

  if (!showModal) {
    return null;
  }

  //-----

  // Function to convert data table to text format
  const convertToText = () => {
    let textData = '';
    
    dataTable.forEach(item => {
      const row = [
        item.created_at,
        ' Action Taken: ', item.action_taken,
        ' Item: ', item.item_name,
        ' User name: ',item.user_name,
        ' User role: ', item.user_type,
        ' Location: ', item.item_origin
      ];
      textData += row.join('\t') + '\n';
    });

    return textData;
  };

  // Function to handle download logs as text file
  const handleDownloadLogs = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    const day = ('0' + currentDate.getDate()).slice(-2);
    const hours = ('0' + currentDate.getHours()).slice(-2);
    const minutes = ('0' + currentDate.getMinutes()).slice(-2);
    const seconds = ('0' + currentDate.getSeconds()).slice(-2);

    const formattedDateTime = `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
    const filename = `psytal_backup_${formattedDateTime}.sql`;

    const textContent = convertToText();
    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  //-----

  return (
    <div className="p-3 pb-3 fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 overflow-auto">
      <div className="relative bg-white w-full lg:w-4/5 xl:w-5/6 px-4 py-6 shadow-lg rounded-lg max-h-full overflow-y-auto">
        {/* Exit (Close) Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-full hover:bg-red-700 cursor-pointer"
        >
          X
        </button>
        <table className="min-w-full">
          <thead>
            <tr>
              <th>Date</th>
              <th>Action Taken</th>
              <th>Item</th>
              <th>User Name</th>
              <th>User Type</th>
              <th>Location Table/Source</th>
            </tr>
          </thead>
          <tbody>
            {dataTable.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'odd:bg-green-100' : ''}>
                <td className='text-center px-2'>{item.created_at}</td>
                <td className='text-center px-2'>{item.action_taken}</td>
                <td className='text-center px-2'>{item.item_name}</td>
                <td className='text-center px-2'>{item.user_name}</td>
                <td className='text-center px-2'>{item.user_type}</td>
                <td className='text-center px-2'>{item.item_origin}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pt-5 flex justify-end space-x-3">
          <button onClick={handleDownloadLogs} className="bg-lime-600 hover:bg-lime-700 text-white px-3 py-1 rounded-full cursor-pointer">
              Download Logs
          </button>
      </div>
      </div>
    </div>
  );
}