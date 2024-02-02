import React, { useState } from 'react';

export default function ShowLogTable({ showModal, onClose, dataTable}) {

  if (!showModal) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white w-full lg:w-3/4 xl:w-4/5 px-4 py-6 shadow-lg rounded-lg">
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
              <th>Action Taken</th>
              <th>User Name</th>
              <th>User Role</th>
              <th>Location</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {dataTable.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'odd:bg-green-100' : ''}>
                <td>{item.action_taken}</td>
                <td>{item.user_name}</td>
                <td>{item.user_role}</td>
                <td>{item.location}</td>
                <td>{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}