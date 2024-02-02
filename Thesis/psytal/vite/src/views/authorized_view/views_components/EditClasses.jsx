import React, { useEffect, useState } from 'react';
import axiosClient from '../../../axios.js';

export default function EditClasses({ showModal, onClose, subject, onSave}) {
  const course_title = subject.course_title;
  const course_code = subject.course_code;
  const class_code_old = subject.class_code;
  const section_old = subject.class_section;
  const instructor_old = subject.instructor_name;

  const [instructor_name, setInstructor] = useState(instructor_old);
  const [class_section, setClass_Section] = useState(section_old);
  const [class_code, setClass_Code] = useState(class_code_old);
  const [successMessage, setSuccessMessage] = useState(null);
  
  const [instructorsTable, setInstructorsTable] = useState([]);

  useEffect(() => {

    async function fetchTable() {

      const [show_instructors] = await Promise.all([
       fetchInstructorData('/show_instructors'),
       ]);
       console.log('data: ', show_instructors);

       const instructor_Table = show_instructors.map(instructor => ({
         id: instructor.id,
         name: instructor.name,
       }));
      
       setInstructorsTable(instructor_Table);
    }

    async function fetchInstructorData(endpoint) {
      try {
        const response = await axiosClient.get(endpoint);
        return response.data;
      } catch (error) {
        console.error('Error fetching data from the database:', error);
      }
    }
    fetchTable();

  },[])

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Create an object with the updated class data
    console.log('Submitting', subject.class_id); //sending the passed ID to edit
    const updatedClass = {
      // Assuming classId is still the same
      instructor_name,
      class_section: class_section,
      class_code,
    };
  
    axiosClient
      .put(`/updateclasses/${subject.class_id}`, updatedClass)
      .then((response) => {
        console.log('Class Updated Successfully');
        setSuccessMessage({
          message: 'The Class was Updated successfully!',
        });

        setTimeout(() => {
          setSuccessMessage(null);
          onSave();
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  if (!showModal) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full lg:w-1/2 px-4 py-6 shadow-lg rounded-lg">
        <div className="w-full px-4 mx-auto mt-6">
          <p className="block uppercase tracking-wide font-semibold text-green-800 my-3">Assign Class Information</p>
          <div>
            <form>
            <div className="mb-4">
                <label htmlFor="class" className="block text-sm text-gray-700">
                  Course Title:
                </label>
                <input
                  id="class"
                  name="class"
                  type="text"
                  value={course_code + ' - ' +course_title}
                  disabled //makes field uneditable
                  className="block w-full rounded-md border border-gray-300 bg-gray-100 py-1.5 px-3 text-gray-700 shadow-sm focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="c_code" className="block text-sm text-gray-700">
                  Class Code:
                </label>
                <input
                  id="c_code"
                  name="c_code"
                  type="text"
                  placeholder={class_code_old}
                  value={class_code_old}
                  onChange={(ev) => setClass_Code(ev.target.value.toUpperCase())}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  required
                />
              </div>
             {/*User Input*/}
              <div className="mb-4">
                <label htmlFor="instructor" className="block text-sm text-gray-700">
                  Instructor:
                </label>
                <select
                  id="instructor"
                  name="instructor"
                  type="text"
                  onChange={(e) => setInstructor(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                >
                  <option value="" disabled selected>
                    {instructor_old ? instructor_old : "TBA"}
                  </option>
                  {instructorsTable.map((instructor) => (
                    <option key={instructor.id} value={instructor.name}>
                      {instructor.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="section" className="block text-sm text-gray-700">
                  Section:
                </label>
                <input
                      id="section"
                      name="section"
                      type="text"
                      maxLength={1}
                      placeholder={section_old}
                      value={section_old}
                      onChange={(ev) => setClass_Section(ev.target.value.toUpperCase())}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6" 
                      required
                    />
              </div>
              <div className="text-center flex justify-end my-7">
                <button onClick={handleSubmit} className="bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-4 mr-6 rounded-full">
                  Save Changes
                </button>
                <button onClick={onClose} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
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
    </div>
    // ... (rest of your component code)
  );
}