import React, { useEffect, useState } from 'react';
import axiosClient from '../../../../axios';
import ReactModal from 'react-modal';
import CreatePrompt from '../../prompts/CreatePrompt';

export default function StudentGrades({ showModal, onClose, selectedStudent }) {
  const [studentClasses, setStudentClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allowEdit, setAllowEdit] = useState(true);
  const [semesterInfo, setSemesterInfo] = useState('No Semester Information Found.');
  const [showPrompt, setShowPrompt] = useState(false);
  const [promptMessage, setPromptMessage] = useState('');
  const action = "Confirm Save Grade";

  const [gradeStat, setGradeStat] = useState(true); //check if there is existing grades

  //<><><><><>
  const editprompt = (ev) => {
    ev.preventDefault();
    const concatmessage = 'Grades for student: "' + selectedStudent.full_name + '" will be saved. Do you wish to proceed?';
    setPromptMessage(concatmessage);
    setShowPrompt(true);
  }

  const fetchStudentClasses = async () => {
    try {
      const response = await axiosClient.get('getstudentclasses', {
        params: { student_profile_id: selectedStudent.student_profile_id }
      });
      const zeroGradesCount = response.data.filter(item => item.grade === '0' || item.grade === 'No Grade to Show').length;
      const totalItemCount = response.data.length;
      if (zeroGradesCount !== totalItemCount) {
        console.log('Comparison Result: FALSE, should update');
        setGradeStat(false);
      } else {
        console.log('Comparison Result: TRUE, should save');
        setGradeStat(true);
      }

      console.log('Update Yes or No: ', zeroGradesCount);
      setStudentClasses(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  //<><><><><>
  const fetchSemesterInfo = async () => {
    try{
          const response = await axiosClient.get('/getsemesterinformation');
          setSemesterInfo(response.data);
    } catch (error) {
          console.log('Error: ', error);
    }
  };

  useEffect(() => {
    fetchSemesterInfo();
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
      setAllowEdit(!allowEdit);
      //feedback please
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
      <div className="relative bg-white w-full lg:w-1/2 px-4 py-4 shadow-lg rounded-lg">
          {/* Exit (Close) Button */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-full hover:bg-red-700 cursor-pointer"
          >
            X
          </button>
        <div className='overflow-y-auto'>
          <strong className='text-lg'>{selectedStudent.full_name}</strong>
          <br></br>
          <h1>Grades for {semesterInfo}</h1> {/*current semester info*/}
          <table className="table w-full table-striped text-gray-700 mb-3 border border-gray-300">
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
                  <td className="text-left p-2 w-1/6">{grade.class_code}</td>
                  <td className="text-left p-2 w-2/6">{grade.course_title}</td>
                  <td className="text-left p-2 w-1/6">{grade.class_section}</td>
                  <td className="text-left p-2 w-2/6">
                    <select
                      value={grade.grade}
                      disabled={allowEdit}
                      onChange={(event) => handleGradeChange(index, event)}
                      className="border rounded-md px-2 py-1 w-full"
                    >
                      {['No Grade to Show', 1.0, 1.25, 1.50, 1.75, 2.0, 2.25, 2.50, 2.75, 3.0, 5.0].map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className='flex justify-end'>
            <button hidden={!allowEdit}  onClick={() => setAllowEdit(false)} className="bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-4 mr-4 rounded-full">
              Allow Editing
            </button>
          </div>

          <div className='flex justify-end'>
            <button hidden={allowEdit} onClick={editprompt} className="bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-4 mr-4 rounded-full">
              {gradeStat ? "Save Grades" : "Update Grades"}
            </button>
            <button hidden={allowEdit} onClick={() => {setAllowEdit(true); fetchStudentClasses();}} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 mr-4 rounded-full">
              Cancel
            </button>
          </div>
        </div>
      </div>
      <ReactModal
            isOpen={showPrompt}
            onRequestClose={() => setShowPrompt(false)}
            className="md:w-[1%]"
          >
            <div>
                <CreatePrompt
                    closeModal={() => setShowPrompt(false)}
                    handleSave={handleSaveGrades}
                    action={action}
                    promptMessage={promptMessage}
                />
            </div>
      </ReactModal>
    </div>
  );
}
