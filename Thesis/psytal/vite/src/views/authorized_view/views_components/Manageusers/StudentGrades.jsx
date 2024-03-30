import React, { useEffect, useState } from 'react';
import axiosClient from '../../../../axios';

export default function StudentGrades({ showModal, onClose, selectedStudent }) {
  const [studentClasses, setStudentClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allowEdit, setAllowEdit] = useState(true);

  const fetchStudentClasses = async () => {
    try {
      const response = await axiosClient.get('getstudentclasses', {
        params: { student_profile_id: selectedStudent.student_profile_id }
      });
      setStudentClasses(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentClasses();
  }, [selectedStudent]);

  const handleGradeChange = (index, event) => {
    const updatedClasses = [...studentClasses];
    updatedClasses[index].grade = event.target.value;
    setStudentClasses(updatedClasses);
  };

  const handleSaveGrades = async () => {
    try {
      await axiosClient.put('updatestudentgrades', {studentClasses, student_id: selectedStudent.student_profile_id});
    } catch (error) {
      console.error('Error updating grades:', error);
    }
  };

  if (loading) return <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white w-full lg:w-1/2 px-4 py-6 shadow-lg rounded-lg">
                          <div>Loading...</div>
                        </div>
                      </div>;
  if (error) return <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                      <div className="bg-white w-full lg:w-1/2 px-4 py-6 shadow-lg rounded-lg">
                        <div>Error: {error.message}</div>
                      </div>
                    </div>;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full lg:w-1/2 px-4 py-4 shadow-lg rounded-lg">
        <div className='overflow-y-auto text-center'>
          <strong className='text-lg'>Student Grades</strong>
          <table className="table w-full table-striped text-gray-700 mb-3">
            <thead>
              <tr>
                <th className="text-left bg-gray-200 p-2">Class Code</th>
                <th className="text-left bg-gray-200 p-2">Course Title</th>
                <th className="text-left bg-gray-200 p-2">Section</th>
                <th className="text-left bg-gray-200 p-2">Grade</th>
              </tr>
            </thead>
            <tbody>
              {studentClasses.map((grade, index) => (
                <tr key={index} className={index % 2 === 0 ? 'odd:bg-green-100' : ''}>
                  <td className="text-left p-2">{grade.class_code}</td>
                  <td className="text-left p-2">{grade.course_title}</td>
                  <td className="text-left p-2">{grade.class_section}</td>
                  <td className="text-left p-2">
                    <input
                      type="text"
                      value={grade.grade}
                      disabled={allowEdit}
                      onChange={(event) => handleGradeChange(index, event)}
                      className="border rounded-md px-2 py-1"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className='flex justify-end'>
            <button hidden={!allowEdit}  onClick={() => setAllowEdit(false)} className="bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-4 mr-4 rounded-full">
              Edit Grades
            </button>
            <button hidden={!allowEdit}  onClick={onClose} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 mr-4 rounded-full">
              Close
            </button>
          </div>

          <div className='flex justify-end'>
            <button hidden={allowEdit} onClick={handleSaveGrades} className="bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-4 mr-4 rounded-full">
              Save Grades
            </button>
            <button hidden={allowEdit} onClick={() => {setAllowEdit(true); fetchStudentClasses();}} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 mr-4 rounded-full">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
