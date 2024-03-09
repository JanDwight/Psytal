import React, { useEffect, useState } from 'react';
import axiosClient from '../../../../axios';

export default function StudentGrades({ selectedStudent }) {
  const [studentClasses, setStudentClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Student Grades</h2>
      <table className="table w-full table-striped text-gray-700">
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
                  onChange={(event) => handleGradeChange(index, event)}
                  className="border rounded-md px-2 py-1"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className='flex justify-end mt-3'>
      <button onClick={handleSaveGrades} className="bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-4 mr-6 rounded-full">
        Save Grades
      </button>
      </div>
    </div>
  );
}
