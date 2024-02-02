import React, { useState } from 'react';
import axiosClient from '../../../../axios';

export default function ArchivePost({ showArchivepost, onClose, postId, onArchiveSuccess }) {
  const [isArchiving, setIsArchiving] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  const confirmArchive = async () => {
    try {
      const response = await axiosClient.put(`/posts/archive/${postId}`);
      if (response.status === 204) {
        // Post archived successfully, inform the parent component
        onArchiveSuccess();

      } else {
        throw new Error('Error Network response');
      }
    } catch (error) {
      console.error('Error archiving the post: ', error);
    } finally {
      onClose();
    }
  };

  const handleArchive = async () => {
            setSuccessMessage({
          message: 'Deleting this post was successful!',
        });

        setTimeout(() => {
          setSuccessMessage(null);
          setIsArchiving(true);
          confirmArchive();
        }, 2000);
    

  };

  if (!showArchivepost) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-200 w-full lg:w-3/12 px-4 py-6 shadow-lg rounded-3xl">
        <div className="w-full px-4 mx-auto">
          <h1 className="font-bold text-3xl text-[#525252] text-center pb-5">Delete Post?</h1>
          {/* BUTTONS */}
          <div className="text-center flex justify-end my-2">
            {/* YES */}
            <button
              type="button"
              onClick={handleArchive}
              className={`${
                isArchiving ? 'opacity-50 cursor-not-allowed' : ''
              } bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 mr-6 w-full rounded-full`}
              disabled={isArchiving}
            >
              {isArchiving ? 'Deleting...' : 'Yes'}
            </button>
            {/* NO */}
            <button
              onClick={onClose}
              type="button"
              className="bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-4 w-full rounded-full"
            >
              No
            </button>
          </div>
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
