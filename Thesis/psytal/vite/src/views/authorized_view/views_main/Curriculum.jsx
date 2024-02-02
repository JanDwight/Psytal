import React, { useState, useEffect } from 'react';
import axiosClient from '../../../axios';
import { useStateContext } from '../../../context/ContextProvider.jsx';
import { Menu, Transition } from '@headlessui/react';
import ReactModal from 'react-modal';
import AddCourse from "../views_components/AddCourse";
import archive from "@assets/delete.png"
import edit from "@assets/icons8createpost.png";
import ArchiveCourse from "../views_components/ArchiveCourse";
import EditCourse from "../views_components/EditCourse";
import { useAsyncValue } from 'react-router-dom';

export default function Curriculum(){
      //Calling the ArchiveCourse
      const [showArchivecourse, setShowArchivecourse]= useState(false);
      const [showEditcourse, setShowEditcourse]= useState(false);
      const [selectedcourse, setSelectedcourse] = useState([]);
      const [errors, setErrors] = useState({ __html: '' });
      const [filterText, setFilterText] = useState(''); //for search
     
      const handleArchiveClick = (curriculum) => {
        setShowArchivecourse(true);
        setSelectedcourse(curriculum);
      }
      
      const handleEditClick = (curriculum) => {
        setShowEditcourse(true);
        setSelectedcourse(curriculum);
      }

      // const addCourse = async (CurriculumData) => {
      //     try {
      //       const response = await axios.post('/addcurriculum', CurriculumData);
      //       // Handle the response (e.g., show success message)
      //     } catch (error) {
      //       // Handle errors (e.g., display validation errors)
      //       console.error(error);
      //     }
      //   };
        
    
      // Calling the AddCourse
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [curriculum, setCurriculum] = useState([]);   
        useEffect(() => {
            fetchCurriculum();
          }, []);
        
        const fetchCurriculum = async () => {
            try {
              const response = await axiosClient.get('/getcurriculum');
              setCurriculum(response.data.curriculum);
            } catch (error) {
              console.error(error);
            }
          };

  //for search
  const filteredData = curriculum.filter(
    (curriculum) =>
    curriculum.class_year.toString().includes(filterText) ||
    curriculum.semester.toString().includes(filterText) ||
    curriculum.course_code.toLowerCase().includes(filterText.toLowerCase()) ||
    curriculum.units.toString().includes(filterText) ||
    curriculum.course_title.toLowerCase().includes(filterText.toLowerCase()) ||
    curriculum.hoursperWeek.toString().includes(filterText) ||
    curriculum.course_type.toLowerCase().includes(filterText.toLowerCase()) ||
    curriculum.preReq.toLowerCase().includes(filterText.toLowerCase())

  );

  return (
        <>
        <div className="w-full h-[auto] px-4 mx-auto rounded-3xl bg-white pt-5 pb-12  table-container ">{/*For the Container*/}
            <div className="mt-5 mx-5 pb-5 border-b-2 border-black flex flex-row justify-between items-baseline">
            <div className="font-bold text-6xl text-[#525252]">Curriculum</div>
                {/*Search and Add Courses */}
                <div className='mt-5 mx-5 flex flex-row justify-between items-baseline'>      

                      {/* //Search input */}
                      <div className="flex items-baseline">
                      <div className="my-4 mx-4" id="magnifying_glass">
                          <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                      </div>
                      <input
                        id="search_bar"
                        type="text"
                        placeholder="Search..."
                        value={filterText}
                        onChange={(event) => setFilterText(event.target.value)}
                        className="h-10 px-7 py-4 border border-gray-300 focus:ring-viridianHue focus:border-viridianHue rounded-lg"
                      />
                    </div>
                      <button onClick={() => setIsModalOpen(true)} 
                            className="bg-[#397439] hover:bg-[#0FE810] rounded-2xl  px-7 py-2 text-white font-size ml-10">
                                Add Course
                        </button>
                    </div>   
            </div>
            
            <div className="table-container overflow-y-auto">
            <table className="table w-full table-striped text-gray-700 mt-5" >
		            <thead >
		              <tr>
                    <th className="text-center text-gray-700 bg-gray-200 p-2">Class Year</th>
                    <th className="text-center text-gray-700 bg-gray-200 p-2">Semester</th>
                    <th className="text-center text-gray-700 bg-gray-200 p-2">Course Code</th>
                    <th className="text-center text-gray-700 bg-gray-200 p-2">Units</th>
                    <th className="text-center text-gray-700 bg-gray-200 p-2">Course Title</th>
                    <th className="text-center text-gray-700 bg-gray-200 p-2">Hours/Week</th>
                    <th className="text-center text-gray-700 bg-gray-200 p-2">Lec/Lab</th>
                    <th className="text-center text-gray-700 bg-gray-200 p-2">Pre-Requisite</th>
                    <th className="text-center text-gray-700 bg-gray-200 p-2">Action</th>
		              </tr>
                </thead>
                </table>
                </div>
                <div className="w-full h-[500px] px-4 mx-auto  bg-white   pb-12  table-container overflow-y-auto">
                <table className="table w-full table-striped text-gray-700 ">
                <tbody>
                    {filteredData.map((curriculum, index) => (
                      <tr 
                        key={index} 
                        className={`${index % 2 === 0 ? 'odd:bg-green-100' : ''}`}
                      >
                          <td className="text-center p-2">{curriculum.class_year}</td>
                          <td className="text-center p-2">{curriculum.semester}</td>
                          <td className="text-center p-2">{curriculum.course_code}</td>
                          <td className="text-center p-2">{curriculum.units}</td>
                          <td className="text-center p-2 overflow-hidden overflow-wrap break-word">{curriculum.course_title}</td>
                          <td className="text-center p-2">{curriculum.hoursperWeek}</td>
                          <td className="text-center p-2">{curriculum.course_type}</td>
                          <td className="text-center p-2">{curriculum.preReq}</td>
                          <td className= "flex items-center p-2">
                            <button onClick={() => handleEditClick(curriculum)}>
                              <img src={edit} alt='edit' className='h-5 w-5 cursor-pointer transform transition-transform hover:scale-125' />
                            </button>
                            <button onClick={() => handleArchiveClick(curriculum)}>
                              <img src={archive} alt='archive' className='h-7 w-7 cursor-pointer transform transition-transform hover:scale-125'/>
                            </button>
                          </td>
                        </tr>
                        ))}
                </tbody>
	          </table>
            </div>
          </div>
      
        <ReactModal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            className="w-full md:w-[30%] h-fit bg-[#FFFFFF] rounded-3xl ring-1 ring-black shadow-2xl mt-[10%] mx-auto p-5"
        >
            <div>
                <AddCourse
                 closeModal={() => setIsModalOpen(false)}/>
            </div>
        </ReactModal>

        <ArchiveCourse
          showArchivecourse={showArchivecourse}
          onClose={() => setShowArchivecourse(false)}
          curriculum={selectedcourse}
        />

        <EditCourse
          showEditcourse={showEditcourse}
          onClose={() => setShowEditcourse(false)}
          curriculum={selectedcourse}
        />
          
        </>
);
}