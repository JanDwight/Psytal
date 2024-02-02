import React from 'react';
import ReactModal from 'react-modal';
import { useState, useEffect } from 'react';
import axiosClient from '../../../axios.js';

export default function AddClass({closeModal}) {
  const [selected_subject, setSelectedSubject] = useState(''); // state for the selected subject
  const [class_section, setSection] = useState(''); // Define state for section
  const [class_code, setClassCode] = useState(''); // Define state for class code
  const [instructor_name, setInstructor] = useState(''); // Define state for instructor
  const [subjectData, setSubjectData] = useState([]);
  const [instructorData, setInstructorData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);

  
  function handleDropdownChange(selected_subject) {
      console.log('Selected value:', selected_subject);
    
      axiosClient.get(`/get_selected/${selected_subject}`)
        .then((response) => {
          // Handle the response data here
          setSelectedData(response.data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
      });
  }

  //fetching display data
  useEffect(() => {
    // Your code here
    async function fetchData() {
        try {
          const [show_subjects, show_instructors] = await Promise.all([
            fetchTables('/show_curriculum'), //retrieve from curricula (id, course_title, course_code, course_type, units, semester, year)
            fetchTables('/show_instructors'), //retrieve from users (teachers only)
            //fetchTables(`/get_selected/${selected_subject}`)
            
          ]);

          const curriculum_Table = show_subjects.map(subject => ({
            c_id: subject.id,
            c_title: subject.course_title,
            c_code: subject.course_code,
          }));
          
          setSubjectData(curriculum_Table); //only id, title, code, lecture/lab, units, semester, yr

          const instructor_Table = show_instructors.map(instructor => ({
            id: instructor.id,
            name: instructor.name,
          }));
          
          setInstructorData(instructor_Table);

        } catch (error) {
          console.error('Error fetching data from the database:', error);
        }
      }
      
      //fetch all tables
      async function fetchTables(endpoint) {
        try {
          const response = await axiosClient.get(endpoint);
          return response.data;
        } catch (error) {
          console.error('Error fetching data from the database:', error);
        }
      }

      fetchData();
  }, []);

  const handleSubmit = (ev) => {
    ev.preventDefault(); // Prevent the default form submission behavior

    console.log('Selected:', selected_subject);

      // Create a formData object and send it using axios
      const formData = {
        course_title: selectedData.course_title,
        course_code: selectedData.course_code,
        course_type: selectedData.course_type,
        units: selectedData.units,
        semester: selectedData.semester,
        class_year: selectedData.class_year,
        course_id: selected_subject,
        class_section,
        class_code,
        instructor_name,
      };
      console.log('Selected:', formData);
  
    axiosClient.post('/addclass', formData)
      .then((response) => {
        // Handle a successful response here
        console.log('Data sent successfully:', response.data);

        // Close the modal or perform any other action as needed
   

        setSuccessMessage({
          message: 'The CLASS was added successfully!',
        });

        setTimeout(() => {
          setSuccessMessage(null);
          closeModal();
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        // Handle errors here
        console.error('Error sending data:', error);
      });
  };

 

  return (
    <>
    <ReactModal appElement={document.getElementById('root')} className="custom-modal"> </ReactModal>
        {/*For creating sections 1 class = 2 or more sections * 2 if there is both lec and lab 
        meaning one subject can potentially have 4 classes minimum*/}
        <div className='flex justify-center font-bold text-4xl text-[#525252] mt-1'>
        Create Class
        </div>
        
        {/*----------*/}
        <div>
          <form onSubmit={handleSubmit}>
            <div className="mt-5">
              <select
                id="course_title"
                name="course_title"
                onChange={(ev) => {
                  setSelectedSubject(ev.target.value); // update selected subject
                  handleDropdownChange(ev.target.value); // update modal
                }}
                className="block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                required
              >
                <option value="" disabled selected>
                  Course Title
                </option>
                
                {subjectData.map((subject) => (
                    <option key={subject.c_id} value={subject.c_id}>
                      {subject.c_code + ' - ' + subject.c_title}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-700 text-center font-bold mt-2 mb-2">
                Class Details
              </label>
            </div>
            <div className="mt-2 flex flex-col-2 justify-between">
            <label htmlFor="course_code" className="block text-sm text-gray-700">
              Class Code:
            </label>
            <input
                id="class_code"
                type="text"
                name="class_code"
                placeholder='Class Code'
                onChange={(ev) => setClassCode(ev.target.value.toUpperCase())}
                className="block w-[49%] rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 type=text" 
                required
            />
              <label htmlFor="course_code" className="block text-sm text-gray-700">
              Type:
              </label>
              <input
                id="course_type"
                type="text"
                name="course_type"
                placeholder='Course Type'
                value={selectedData.course_type}
                disabled // makes field uneditable
                className="block w-[49%] rounded-md border border-gray-300 bg-gray-100 py-1.5 px-3 text-gray-700 shadow-sm focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div className="mt-5 flex flex-col-2 justify-between">
              <label htmlFor="course_code" className="block text-sm text-gray-700 px-2">
                Units:
              </label>
              <input
                id="units"
                type="text"
                name="units"
                placeholder='Units'
                value={selectedData.units}
                disabled // makes field uneditable
                className="block w-[49%] rounded-md border border-gray-300 bg-gray-100 py-1.5 px-3 text-gray-700 shadow-sm focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
              />
              <label htmlFor="course_code" className="block text-sm text-gray-700 px-2">
              Semester:
              </label>
              <input
                id="semester"
                type="text"
                name="semester"
                placeholder='Semester'
                value={selectedData.semester}
                disabled // makes field uneditable
                className="block w-[49%] rounded-md border border-gray-300 bg-gray-100 py-1.5 px-3 text-gray-700 shadow-sm focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div className="mt-5 flex flex-col-2 justify-between">
            <label htmlFor="course_code" className="block text-sm text-gray-700 px-2">
              Year:
            </label>
            <input
                id="yrlvl"
                type="text"
                name="yrlvl"
                placeholder='Year Level'
                value={selectedData.class_year}
                disabled // makes field uneditable
                className="block w-[49%] rounded-md border border-gray-300 bg-gray-100 py-1.5 px-3 text-gray-700 shadow-sm focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
              />
              <label htmlFor="course_code" className="block text-sm text-gray-700 px-2">
              Section:
              </label>
              <input
                      id="section"
                      name="section"
                      type="text"
                      maxLength={1}
                      placeholder='Section'
                      onChange={(ev) => setSection(ev.target.value.toUpperCase())}
                      className="block w-[49%] rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 type=text" 
                      required
                    />
            </div>
            <div className="mt-5 flex flex-col-2 justify-between">
            <label htmlFor="course_code" className="block text-sm text-gray-700 px-2">
              Instructor:
            </label>
              <select
                  id="instructor"
                  name="instructor"
                  type="text"
                  onChange={(e) => setInstructor(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  required
                >
                  <option value="" disabled selected>
                   Teacher X
                  </option>
                  {instructorData.map((instructor) => (
                    <option key={instructor.id} value={instructor.name}>
                      {instructor.name}
                    </option>
                  ))}
              </select>
            
            </div>
            <div className="text-center flex justify-center">
                <button type="submit" className="bg-[#0FE810]  hover:bg-lime-700 text-white font-bold py-2 px-4 mt-5 rounded-full">
                  Add Class
                </button>
                <button onClick={closeModal} className="bg-[#f34450]  hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mt-5 ml-3 font-size">
                  Cancel
                </button>
            </div>
          </form>
        </div>
        {/*----------*/}
        {successMessage && (
        <div className="fixed top-0 left-0 w-full h-full overflow-y-auto bg-black bg-opacity-50">
          <div className="lg:w-1/2 px-4 py-1 shadow-lg w-[20%] h-fit bg-[#FFFFFF] rounded-xl mt-[10%] mx-auto p-5">
            <div className="w-full px-4 mx-auto mt-6">
              <div className="text-center text-xl text-green-600 font-semibold my-3">
                {successMessage.message}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}