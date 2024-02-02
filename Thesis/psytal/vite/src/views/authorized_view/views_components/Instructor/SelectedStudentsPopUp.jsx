import React, {useEffect, useState} from 'react'
import axiosClient from '../../../../axios'

export default function SelectedStudentsPopUp({onClose, student, class_id}) {
    const [grade, setGrade] = useState('');
    const selecetedStudent = student.name;

    const handleSave = async(e) => {
        e.preventDefault(); // Prevent the default form submission behavior
    
        try {
          const response = await axiosClient.put(`/editGrade/${selecetedStudent}`, {class_id, grade});
      
          console.log(response);
          // Handle success, e.g., show a success message
          setSuccessMessage({
            message: 'Account Updated successfully!',
          });
    
          setTimeout(() => {
            setSuccessMessage(null);
            // Close the modal
            onClose();
            window.location.reload(); // Consider if you really need to reload the page
          }, 2000);
    
        } catch (error) {
          // Handle errors here, e.g., display an error message
          console.error('Error Updating Account:', error);
        }
      };
      console.log(selecetedStudent)
  return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white w-full lg:w-1/2 px-4 py-6 shadow-lg rounded-lg">
                <div>
                    {student.name}
                </div>

                <div>
                    <label htmlFor="grade" className="block text-sm text-gray-700">
                      Grade:
                    </label>
                    <input
                      id="grade"
                      name="grade"
                      type="text"
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                      className="block w-full rounded-md border border-gray-300 bg-gray-100 py-1.5 px-3 text-gray-700 shadow-sm focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                    />
                </div>

                <div className="flex items-center justify-center my-7 space-x-4">
                    <button onClick={handleSave} className="bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded-full">
                        Confirm
                    </button>

                    <button onClick={onClose} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
                        Close
                    </button>
                </div>
            </div>
        </div>
  )
}
