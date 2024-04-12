import { React, useEffect, useState } from 'react'
import ReactModal from 'react-modal';

export default function Feedback({ isOpen, onClose, successMessage, status, refresh }) {
    const [modalClosedManually, setModalClosedManually] = useState(false);

    useEffect(() => {
        let timeoutId;

        if (modalClosedManually === true && refresh === true) {
            return
        }

        else if (modalClosedManually === true && status === true) {
            // Set timeout to reload the page after 5 seconds only if status is success and modal is still open
            timeoutId = setTimeout(() => {
                window.location.reload();
            }, 10);
        }

        // Cleanup function to clear timeout when component unmounts or modal is closed manually
        return () => {
            clearTimeout(timeoutId);
        };
    }, [isOpen, status, modalClosedManually, refresh]); // Include 'refresh' in the dependency array

    // Determine background color based on status
    let modalBgColor;
    if (status === true) {
        modalBgColor = 'bg-green-400'; // Green for success
    } else if (status === false) {
        modalBgColor = 'bg-red-400'; // Red for failure
    } else {
        modalBgColor = 'bg-blue-400'; // Blue for loading
    }

    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={status === true || status === false ? () => {
                setModalClosedManually(true);
                onClose();
            } : null}
            className={`text-center w-full md:w-[30%] h-fit rounded-3xl ring-1 ring-black shadow-2xl mt-[20%] mx-auto p-5 ${modalBgColor}`}
        >
            <div className="flex items-center justify-center">
                {status === 'Loading' && (
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                )}
                <div>{successMessage}</div>
            </div>
        </ReactModal>
    );
}
