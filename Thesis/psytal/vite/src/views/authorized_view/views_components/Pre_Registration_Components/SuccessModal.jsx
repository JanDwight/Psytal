import { React, useEffect, useState } from 'react'
import ReactModal from 'react-modal';

export default function SuccessModal({ isOpen, onClose, successMessage, status }) {
    const [modalClosedManually, setModalClosedManually] = useState(false);

    useEffect(() => {
        let timeoutId;
        if (status === true && isOpen || modalClosedManually) {
            // Set timeout to reload the page after 5 seconds only if status is success and modal is still open
            timeoutId = setTimeout(() => {
                window.location.reload();
            }, 2000);
        }

        // Cleanup function to clear timeout when component unmounts or modal is closed manually
        return () => {
            clearTimeout(timeoutId);
        };
    }, [isOpen, status, modalClosedManually]);

    // Determine background color based on status
    const modalBgColor = status === true ? 'bg-green-400' : 'bg-red-400'; // Green for success, Red for failure
 
    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={() => {
                setModalClosedManually(true);
                onClose();
            }}
            className={`w-full md:w-[30%] h-fit rounded-3xl ring-1 ring-black shadow-2xl mt-[20%] mx-auto p-5 ${modalBgColor}`}
        >
            <div>{successMessage}</div>
        </ReactModal>
    );
}
