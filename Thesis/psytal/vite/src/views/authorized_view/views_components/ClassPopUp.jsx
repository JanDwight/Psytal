import React, { useState, useEffect } from 'react';
import axiosClient from '../../../axios.js';

export default function ClassPopUp({ showModal, onClose, subject }) {

  const [data, setData] = useState([]);
  const id = subject.class_id;

  useEffect(() => {
    fetchClasses();
      }, []);

      const fetchClasses = async () => {
          try {
              // Fetch data from the Laravel API endpoint
      axiosClient.put(`/showclassmembers/${subject.class_id}`) // take from student_profiles???
      .then((response) => {
        setData(response.data);
      })

  } catch (error) {
    console.error(error);
  }
  };

  if (!showModal) {
    return null;
  }



  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full lg:w-1/2 px-4 py-6 shadow-lg rounded-lg">
        <div className="w-full px-4 mx-auto mt-6">
        <div className='flex justify-center font-bold text-4xl text-[#525252] mt-5 text-center'>
            Class: {subject.class_code + ' - ' + subject.course_title}
        </div>

        <div className='mt-[5%]'>
            <div className='flex items-baseline justify-between'>
                <div>
                    <b>Instructor:</b> {subject.instructor_name}
                </div>
                <div className='text-right'>
                    <b>Section: </b> {subject.class_year + ' - ' + subject.class_section}
                </div>
            </div>
            <div>
                <div className='flex items-baseline justify-between'>
                    <div className='font-bold text-center'>
                        Students:
                    </div>
                    <div className='text-right'>
                        <b>Schedule: </b> {subject.class_schedule}
                    </div>
                </div>
             
                {data.map((itemn, index) => (
                  <div className={index % 2 === 0 ? "bg-[#D9D9D9]" : "bg-white"}>
                    {itemn.name}
                  </div>
                ))}
                <div className='text-xs font-bold text-right'>
                    Total Students: {data.length}
                </div>
            </div>
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
    </div>
  );
}