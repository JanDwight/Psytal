import React, { useEffect, useState } from 'react';
import axiosClient from '../../../../axios';
import ReactModal from 'react-modal';
import CreatePrompt from '../../prompts/CreatePrompt';
import Feedback from '../../../feedback/Feedback';

export default function StudentGrades({ showModal, onClose, selectedStudent }) {
  const [studentClasses, setStudentClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allowEdit, setAllowEdit] = useState(true);
  const [semesterInfo, setSemesterInfo] = useState('No Semester Information Found.');
  const [showPrompt, setShowPrompt] = useState(false);
  const [promptMessage, setPromptMessage] = useState('');
  const [action, setAction] = useState('Confirm Save Grade');
  const [gradeStat, setGradeStat] = useState(true); //check if there is existing grades
  const [successMessage, setSuccessMessage] = useState('');
  const [successStatus, setSuccessStatus] = useState('');

  const [selectedSemester, setSelectedSemester] = useState('');
  const [currentSemester, setCurrentSemester] = useState('');
  const [uniqueTerms, setUniqueTerms] = useState([]);

  //<><><><><>
  const handleSelectSemester = (selectedOption) => {
    //|| 'none'
    //what is default semester?
    setSelectedSemester(selectedOption);
    console.log('Chosen: ', selectedOption);
    console.log('Term List: ', uniqueTerms);
    console.log('Current Semester: ', currentSemester);
  }

  //if selectedsemester = currentsemester then allow editing (show buttons, else disable them)

  //<><><><><>
  const editprompt = (ev) => {
    ev.preventDefault();
    if (!gradeStat) {
      setAction('Confirm Update Grade');
    } else {
      setAction('Confirm Save Grade');
    }
    const concatmessage = 'Grades for student: "' + selectedStudent.full_name + '" will be saved. Do you wish to proceed?';
    setPromptMessage(concatmessage);
    setShowPrompt(true);
  }

  const fetchStudentClasses = async () => {
    try {
      const response = await axiosClient.get('getstudentclasses', {
        params: { student_profile_id: selectedStudent.student_profile_id }
      });
      const zeroGradesCount = response.data.classdetails.filter(item => item.grade === '0' || item.grade === 'No Grade to Show').length;
      const totalItemCount = response.data.length;
      if (zeroGradesCount !== totalItemCount) {
        console.log('Comparison Result: FALSE, should update');
        setGradeStat(false);
      } else {
        console.log('Comparison Result: TRUE, should save');
        setGradeStat(true);
      }

      console.log('Update Yes or No: ', zeroGradesCount);
      console.log('Terms: ', response.data.terms)
      //
      const updatedClassDetails = response.data.classdetails.map(item => {
        if (item.term === 'none') {
            return { ...item, term: currentSemester };
        } else {
            return item;
        }
      });

      //console.log('New Class: ', updatedClassDetails);
      //
      //setStudentClasses(response.data.classdetails);
      setStudentClasses(updatedClassDetails);
      setUniqueTerms(response.data.terms);
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
          setSelectedSemester(response.data.semester);
          setCurrentSemester(response.data.semester);
          //
          
            const response_2 = await axiosClient.get('getstudentclasses', {
              params: { student_profile_id: selectedStudent.student_profile_id }
            });
            const zeroGradesCount = response_2.data.classdetails.filter(item => item.grade === '0' || item.grade === 'No Grade to Show').length;
            const totalItemCount = response_2.data.length;
            if (zeroGradesCount !== totalItemCount) {
              console.log('Comparison Result: FALSE, should update');
              setGradeStat(false);
            } else {
              console.log('Comparison Result: TRUE, should save');
              setGradeStat(true);
            }
      
            console.log('Update Yes or No: ', zeroGradesCount);
            console.log('Terms: ', response_2.data.terms)
            //
      
            const updatedClassDetails = response_2.data.classdetails.map(item => {
              if (item.term === 'none') {
                  return { ...item, term: response.data.semester };
              } else {
                  return item;
              }
            });
      
            console.log('New Class: ', updatedClassDetails);
            setStudentClasses(updatedClassDetails);
            setUniqueTerms(response_2.data.terms);
            setLoading(false);
      
    } catch (error) {
          console.log('Error: ', error);
    }
  };

  useEffect(() => {
    fetchSemesterInfo();
    //fetchStudentClasses();
  }, [selectedStudent]);

  const handleGradeChange = (index, event) => {
    const updatedClasses = [...studentClasses];
    updatedClasses[index].grade = event.target.value;
    setStudentClasses(updatedClasses);
  };

  const handleSaveGrades = async () => {
    try {
      const response = await axiosClient.put('updatestudentgrades', {studentClasses, student_id: selectedStudent.student_profile_id, currentSemester: selectedSemester}); //issue with currenSemester
      
      setAllowEdit(!allowEdit);
      fetchSemesterInfo();
      //fetchStudentClasses();
      
      const message_x = response.data.message;
      let message_y;
      if(gradeStat){
        message_y = "Save";
      } else {
        message_y = "Update";
      }


      setSuccessMessage(message_y + message_x);
      setSuccessStatus(response.data.success)
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
      <Feedback isOpen={successMessage !== ''} onClose={() => setSuccessMessage('')} successMessage={successMessage} status={successStatus} refresh={false}/>
      <div className="relative bg-white h-4/5 w-3/4 px-4 py-4 shadow-lg rounded-lg">
          {/* Exit (Close) Button */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-full hover:bg-red-700 cursor-pointer"
          >
            X
          </button>
        <div className='h-full'>
          <strong className='text-lg'>{selectedStudent.full_name}</strong>
          <br></br>
          <div className='flex justify-between mb-2'>
            <h1>Grades for: {/*Space*/}
              <b>
                {/*<select
                      className="rounded-md border border-gray-300 pl-5 pr-9 py-1"
                      onChange={(event) => handleSelectSemester(event.target.value)}
                      >
                        <option value={currentSemester}>{currentSemester}</option>
                        {uniqueTerms.map((option, index) => (
                          (option !== currentSemester && option !== 'none') && 
                          <option key={index} value={option}>{option}</option>
                        ))}
                      </select>*/}
                {currentSemester}
              </b>
            </h1>
            <strong hidden={allowEdit}>*Editing grades is now enabled.</strong>
          </div>
          <div className='relative h-4/5 overflow-y-auto'>
            <table className="w-full table-striped text-gray-700 mb-3 border border-gray-300 h-full">
              <thead className="sticky top-0 bg-black z-10">
                <tr>
                  <th className="text-left bg-gray-200 p-2">Class Code</th>
                  <th className="text-left bg-gray-200 p-2">Course Title</th>
                  <th className="text-left bg-gray-200 p-2">Section</th>
                  <th className="text-left bg-gray-200 p-2">Grade</th>
                </tr>
              </thead>
              <tbody>
              {studentClasses.map((grade, index) => {
                // Check if the class matches the selected semester
                const isVisible = grade.term === selectedSemester;

                return (
                  // Render only if the class matches the selected semester
                  isVisible && (
                    <tr key={index} className={index % 1 === 0 ? 'odd:bg-green-100' : 'bg-white'}>
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
                          <option value="0">No Grade to Show</option>
                          {[1.0, 1.25, 1.50, 1.75, 2.0, 2.25, 2.50, 2.75, 3.0, 5.0, 'INC'].map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  )
                );
              })}
              </tbody>
            </table>
          </div>
          <div className='flex justify-end mt-2'>
            <button hidden={!allowEdit}  onClick={() => {setAllowEdit(false)}} className="bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-4 mr-4 rounded-full">
              Allow Editing
            </button>
          </div>

          <div className='flex justify-end'>
            <button hidden={allowEdit} onClick={editprompt} className="bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-4 mr-4 rounded-full">
              {gradeStat ? "Save Grades" : "Update Grades"}
            </button>
            <button hidden={allowEdit} onClick={() => {fetchStudentClasses(); setAllowEdit(true);}} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 mr-4 rounded-full">
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
