import React, {useState, useEffect} from 'react';
import axiosClient from '../../../../axios';
import ReactModal from 'react-modal';
import SelectedStudentsPopUp from './SelectedStudentsPopUp';

export default function ClassPopUp({ showModal, onClose, subject }) {
  
  const [isSelectedStudentPopUpOpen, setIsSelectedStudentPopUpOpen]= useState(false);
  const [details, setDetails] = useState({
    selectedStudent: '',
    class_id: subject.class_id,
  });

  const handleOpenPopUp = (selectedStudent) => {
    setIsSelectedStudentPopUpOpen(true);
    setDetails({
      ...details,  // Keep existing details
      selectedStudent: selectedStudent
    });
  }

  const [data, setData] = useState([]);

      useEffect(() => {
        fetchClasses();
    }, []);
    
    const fetchClasses = async () => {
        try {
            // Fetch data from the Laravel API endpoint
    axiosClient.get('/showstudentclasses') // take from student_profiles???
    .then((response) => {
      setData(response.data);
    })

  } catch (error) {
      console.error(error);
  }
    };
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full lg:w-1/2 px-4 py-6 shadow-lg rounded-lg">
        <div className="w-full px-4 mx-auto mt-6">
        <div className='flex justify-center font-bold text-4xl text-[#525252] mt-5 text-center'>
            Class: {subject.class_code + ' - ' + subject.course_title}
        </div>

        <div className='mt-[5%]'>
            <div className='flex '>
                <div>
                    <b>Instructor:</b> {subject.instructor_name}
                </div>
            </div>
            <table className="table w-full table-striped text-gray-700">
                <thead className='flex items-baseline justify-between'>
                  <tr>
                      <th className='font-bold text-center'>
                          Students:
                      </th>
                      <th className='text-right'>
                          <b>Section: </b> {subject.class_year + ' - ' + subject.class_section}
                      </th>
                  </tr>
                </thead>
            <tbody> 
                {data.map((itemn, index) => (
                  <tr 
                    key={index}
                    className={index % 2 === 0 ? "bg-[#D9D9D9]" : "bg-white"}
                  >
                    <td className="text-left p-2" onClick={() => handleOpenPopUp(itemn)}>{itemn.name}</td>
                  </tr>
                ))}
            </tbody>
                <div className='text-xs font-bold text-right'>
                    Total Students: {data.length}
                </div>
            </table>
        </div>


          <div className="flex items-center justify-center my-7 space-x-4">
            <button onClick={onClose} className="bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded-full">
                Ok Got It
            </button>
            <button onClick={onClose} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
                Close
            </button>
            </div>
        </div>
      </div>

      <ReactModal
    isOpen={isSelectedStudentPopUpOpen}
    onRequestClose={() => setIsSelectedStudentPopUpOpen(false)}
    >
      <SelectedStudentsPopUp
          onClose={() => setIsSelectedStudentPopUpOpen(false)}
          student={details.selectedStudent} // Use details.selectedStudent instead
          class_id={details.class_id} // Assuming you meant to use the `subject.class_id` here
      />
    </ReactModal>
    </div>
  );
}