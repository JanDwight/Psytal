import React, { useState, useEffect } from 'react'
import axiosClient from '../../../../axios';
import Feedback from '../../../feedback/Feedback';

export default function ImportPrompt({closeModal}) {
    const [successMessage, setSuccessMessage] = useState('');
    const [successStatus, setSuccessStatus] = useState('');

    const handleRestore = (event) => {

        event.preventDefault(); // Prevent the default form submission behavior

        // Get the file input element by id
        const fileInput = document.getElementById('fileInput');
        const file = fileInput.files[0]; // Get the selected file

        //const file = event.target.files[0]; // Get the selected file

        // Create a FormData object to store the file data
        const formData = new FormData();
        formData.append('backup_file', file);
        // Send the file to the backend using Axios
        axiosClient.post('/restoreDB', formData, {
            headers: {
                'Content-Type': 'multipart/form-data' // Set content type header for FormData
            }
        })
        .then(response => {
            setSuccessMessage(response.data.message);
            setSuccessStatus(response.data.success);
        });
    };
  
    const handleProceed = () => {
        document.getElementById("importFile").hidden = false;
        document.getElementById("decision").hidden = true;
    }

    return (
    <div className="p-3 pb-3 fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 ">
        <Feedback isOpen={successMessage !== ''} onClose={() => setSuccessMessage('')} successMessage={successMessage} status={successStatus} refresh={false}/>
        <div className="relative bg-white px-4 py-6 shadow-lg rounded-lg max-h-[90vh] overflow-auto min-w-[10vw] max-w-[65vw] min-h-[20vh]">
            <div className="mb-6 text-center"> 
            <strong>Warning</strong>
                <p>
                    Important Notice: 
                    Proceeding with the backup restore will replace the contents of your existing database. 
                    Any modifications made after the backup file was created will be permanently lost. 
                    Are you sure you want to continue?
                </p>
            </div>
            <div id="decision" hidden={false} className='text-center space-x-3'>
                <button onClick={handleProceed} className="bg-[#397439] hover:bg-[#0FE810] rounded-2xl  px-7 py-2 text-white font-size">
                    I understand
                </button>
                <button onClick={closeModal} className="bg-red-600 hover:bg-red-700 rounded-2xl  px-7 py-2 text-white font-size">
                    Leave
                </button>
            </div>
            <div id="importFile" hidden={true} className='text-center space-x-3'>
                <form onSubmit={handleRestore}>
                    <input type="file" required id="fileInput" accept=".sql"/>
                    <button type="submit" className="bg-[#397439] hover:bg-[#0FE810] rounded-2xl  px-7 py-2 text-white font-size ml-3">
                        Restore
                    </button>
                    <button onClick={closeModal} className="bg-red-600 hover:bg-red-700 rounded-2xl  px-7 py-2 text-white font-size ml-2">
                        Cancel
                    </button>
                </form>
            </div>
                <button onClick={closeModal} className="mr-2 absolute top-2 right-0 bg-red-600 text-white px-3 py-1 rounded-full hover:bg-red-700 cursor-pointer">
                        X
                </button>
        </div>
    </div>
    );
}