import {React, Fragment, useState, useEffect } from "react";
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
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import page28 from "@assets/Help/Admin/Curriculum/1.png";
import page29 from "@assets/Help/Admin/Curriculum/2.png";
import page30 from "@assets/Help/Admin/Curriculum/3.png";
import page31 from "@assets/Help/Admin/Curriculum/4.png";
import page60 from "@assets/Help/Staff/Curriculum/1.png";
import page61 from "@assets/Help/Staff/Curriculum/2.png";
import page62 from "@assets/Help/Staff/Curriculum/3.png";

export default function Curriculum(){
      //Calling the ArchiveCourse
      const [showArchivecourse, setShowArchivecourse]= useState(false);
      const [showEditcourse, setShowEditcourse]= useState(false);
      const [selectedcourse, setSelectedcourse] = useState([]);
      const [errors, setErrors] = useState({ __html: '' });
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [curriculum, setCurriculum] = useState([]);   
      const [filterText, setFilterText] = useState(''); //for search
      const {userRole} = useStateContext(''); //just refresh server
      const [curriculumCodes, setCurriculumCodes] = useState([]);

      //filters
      const [selectedSemester, setSelectedSemester] = useState(null);
      const [selectedYear, setSelectedYear] = useState(null);
      const [selectedSection, setSelectedSection] = useState(null); 
      const [selectedCourseCode, setSelectedCourseCode] = useState(null);

      const [isHelpModalOpen, setIsHelpModalOpen] = useState(false); //help modal
    
      // Function to toggle help modal
        const toggleHelpModal = () => {
          setIsHelpModalOpen(!isHelpModalOpen);
        };
     
      const handleArchiveClick = (curriculum) => {
        setShowArchivecourse(true);
        setSelectedcourse(curriculum);
      }
      
      const handleEditClick = (curriculum) => {
        setShowEditcourse(true);
        setSelectedcourse(curriculum);
      }

      // Add a new state variable for curriculum code


      // Fetch curriculum data and curriculum codes separately
      useEffect(() => {
          fetchCurriculum();
      }, []);

      useEffect(() => {
          console.log(curriculumCodes);
      }, [curriculumCodes]); // Log whenever curriculumCodes changes

      const fetchCurriculum = async () => {
          try {
              const response = await axiosClient.get('/getcurriculum');
              // Extract curriculum codes from curriculum data
              const uniqueCodes = new Set(response.data.curriculum.map(item => item.curriculum_code));
              const codes = [...uniqueCodes];
              // Set curriculum codes state
              setCurriculumCodes(codes);
              // Set curriculum data
              setCurriculum(response.data.curriculum);
          } catch (error) {
              console.error(error);
          }
    };
    
          //filter semester
          const handleSemester = (semester) => {
            setSelectedSemester(semester);
            setSelectedSemester(semester === 'All' ? null : semester);
          };

          //filter year_level
          const handleYear = (year) => {
            setSelectedYear(year);
            setSelectedYear(year === 'All' ? null : year);
          };

          //filter section
          const handleSection = (section) => {
            setSelectedSection(section);
            setSelectedSection(section === 'All' ? null : section);
          };

          const handleCurriculumFilter = (code) => {
            setSelectedCourseCode(code);
            setSelectedCourseCode(code === 'All' ? null : code);
            console.log(code);
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
    curriculum.preReq.toLowerCase().includes(filterText.toLowerCase()) ||
    curriculum.curriculum_code.toLowerCase().includes(filterText.toLowerCase()) ||
    curriculum.validation.toLowerCase().includes(filterText.toLowerCase()) 
  );

  return (
        <>
        <div className="w-full h-[auto] px-4 mx-auto rounded-3xl bg-white pt-5 pb-12  table-container ">{/*For the Container*/}
            <div className="mt-5 mx-5 pb-5 border-b-2 border-black flex flex-col sm:flex-row justify-between items-baseline">
              <div className="font-bold text-4xl lg:text-6xl text-[#525252]">Curriculum</div>
                  {/*Search and Add Courses */}
                  <div className='mt-5 mx-0 sm:mx-5 flex sm:flex-row justify-between items-baseline'>      
                    {/* //Search input */}
                    <div className="flex items-baseline">
                      <div className="my-4 mx-0 sm:mx-4" id="magnifying_glass">
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
                          className="bg-[#397439] hover:bg-[#0FE810] rounded-2xl  px-7 py-2 text-white font-size ml-1 sm:ml-10 mt-5">
                              Add Course
                    </button>
                  </div>   
            </div>
            <div className="mt-2 flex overflow-x-auto ">
              {curriculumCodes.map((code, index) => (
                <button
                  onClick={() => handleCurriculumFilter(code)}
                  className="mx-1 px-3 bg-[#397439] hover:bg-[#0FE810] text-white rounded-2xl"
                  key={index}
                >
                  {code}
                </button>
              ))}
            </div>


            <div className="table-container overflow-y-auto">
            <table className="table w-full table-striped text-gray-700 mt-5" >
		            <thead >
		              <tr>
                    <th className="text-center text-gray-700 bg-gray-200 p-2" style={{ width: "5%" }}>
                      <Menu as="div" className="relative block text-left">
                          <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-m font-bold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:ring-lime-300">
                            Year
                            <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                          </Menu.Button>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="fixed z-50  mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                              <button onClick={() => handleYear('All')}
                                className={'block px-4 py-2 text-sm text-gray-700  text-left w-full hover:bg-green-500'}
                              >
                                ALL
                              </button>
                              </Menu.Item>
                            <Menu.Item>
                              <button onClick={() => handleYear('1st')}
                                className={'block px-4 py-2 text-sm text-gray-700  text-left w-full hover:bg-green-500'}
                              >
                                1st Year
                              </button>
                            </Menu.Item>
                            <Menu.Item>
                              <button onClick={() => handleYear('2nd')}
                                className={'block px-4 py-2 text-sm text-gray-700  text-left w-full hover:bg-green-500'}
                              >
                                2nd Year
                              </button>
                            </Menu.Item>
                            <Menu.Item>
                              <button onClick={() => handleYear('3rd')}
                                className={'block px-4 py-2 text-sm text-gray-700  text-left w-full hover:bg-green-500'}
                              >
                                3rd Year
                              </button>
                            </Menu.Item>
                            <Menu.Item>
                              <button onClick={() => handleYear('4th')}
                                className={'block px-4 py-2 text-sm text-gray-700  text-left w-full hover:bg-green-500'}
                              >
                                4th Year
                              </button>
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </th>
                    <th className="text-center text-gray-700 bg-gray-200 p-2" style={{ width: "5%" }}>
                      <Menu as="div" className="relative block text-left">
                          <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-m font-bold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:ring-lime-300">
                            Semester
                            <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                          </Menu.Button>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="fixed z-50  mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                              <button onClick={() => handleSemester('All')}
                                className={'block px-4 py-2 text-sm text-gray-700  text-left w-full hover:bg-green-500'}
                              >
                                ALL
                              </button>
                              </Menu.Item>
                            <Menu.Item>
                              <button onClick={() => handleSemester('1st')}
                                className={'block px-4 py-2 text-sm text-gray-700  text-left w-full hover:bg-green-500'}
                              >
                                1st Semester
                              </button>
                              </Menu.Item>
                            <Menu.Item>
                                <button onClick={() => handleSemester('2nd')}
                                  className={'block px-4 py-2 text-sm text-gray-700  text-left w-full hover:bg-green-500'}
                                >
                                  2nd Semester
                                </button>
                            </Menu.Item>
                            <Menu.Item>
                                <button onClick={() => handleSemester('Midyear')}
                                  className={'block px-4 py-2 text-sm text-gray-700  text-left w-full hover:bg-green-500'}
                                >
                                  Midyear
                                </button>
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </th>
                    <th className="text-center text-gray-700 bg-gray-200 p-2" style={{ width: "7%" }}>Course Code</th>
                    <th className="text-center text-gray-700 bg-gray-200 p-2" style={{ width: "5%" }}>Units</th>
                    <th className="text-center text-gray-700 bg-gray-200 p-2" style={{ width: "20%" }}>Course Title</th>
                    <th className="text-center text-gray-700 bg-gray-200 p-2" style={{ width: "5%" }}>Hours/Week</th>
                    <th className="text-center text-gray-700 bg-gray-200 p-2" style={{ width: "7%" }}>Lec/Lab</th>
                    <th className="text-center text-gray-700 bg-gray-200 p-2" style={{ width: "10%" }}>Pre-Requisite</th>
                    <th className="text-center text-gray-700 bg-gray-200 p-2" style={{ width: "10%" }}>Action</th>
		              </tr>
                </thead>
                </table>
                </div>
                <div className="w-full h-[500px] px-4 mx-auto  bg-white   pb-12  table-container overflow-y-auto">
                <table className="table w-full table-striped text-gray-700 ">
                <tbody>
                {filteredData
                .filter(curriculum => 
                  (!selectedSemester || curriculum.semester === selectedSemester) &&
                  (!selectedYear || curriculum.class_year === selectedYear) &&
                  (!selectedCourseCode || curriculum.curriculum_code === selectedCourseCode)
                ).map((curriculum, index) => (
                      <tr 
                        key={index} 
                        className={`${index % 2 === 0 ? 'odd:bg-green-100' : ''}`}
                      >
                          <td className="text-left p-2" style={{ width: "10%" }}>{curriculum.class_year}</td>
                          <td className="text-left p-2" style={{ width: "10%" }}>{curriculum.semester}</td>
                          <td className="text-center p-2" style={{ width: "10%" }}>{curriculum.course_code}</td>
                          <td className="text-left p-2" style={{ width: "5%" }}>{curriculum.units}</td>
                          <td className="text-center p-2 overflow-hidden overflow-wrap break-word" style={{ width: "26%" }}>{curriculum.course_title}</td>
                          <td className="text-center p-2" style={{ width: "7%" }}>{curriculum.hoursperWeek}</td>
                          <td className="text-center p-2" style={{ width: "10%" }}>{curriculum.course_type}</td>
                          <td className="text-center p-2" style={{ width: "15%" }}>{curriculum.preReq}</td>
                          <td className= "flex items-center p-2" style={{ width: "auto" }}>
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
            className="w-full md:w-[50%] h-fit bg-[#FFFFFF] rounded-3xl ring-1 ring-black shadow-2xl mt-[10%] mx-auto p-5"
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

        {/* Help Icon */}
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: '9999' }}>
                    <button onClick={toggleHelpModal} style={{ backgroundColor: '#b3d7b2', color: '#000', border: 'none', borderRadius: '50%', width: '60px', height: '60px', fontSize: '30px', cursor: 'pointer' }}>?</button>
              </div>   

          {/* HELP*/}
    <ReactModal
      isOpen={isHelpModalOpen}
      onRequestClose={toggleHelpModal}
      style={{ content: {
        position: 'fixed',
        width:'60%',
        bottom: '20px',
        top:'15%',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: '9999',
        backgroundColor: '#fff',
        border: '1px solid #000',
        padding: '20px',
        textAlign: 'center', // Align the content center
      }
    }}
    >

    <div>
            
    {userRole == 1 && (
        <>
            <p className='text-4xl bg-[#7e9f70]'>ADMIN USER'S MANUAL</p>
            <p className='text-3xl bg-[#91b482]'>CURRICULUM</p>
            <img src={page28} />
            <img src={page29} />
            <img src={page30} />
            <img src={page31} />
        </>
          )}
          {userRole == 2 && (
              <>
            <p className='text-4xl bg-[#7e9f70]'>STAFF USER'S MANUAL</p>
            <p className='text-3xl bg-[#91b482]'>CURRICULUM</p>
            <img src={page60} />
            <img src={page61} />
            <img src={page62} />
              </>

          )}
        </div>
        
        <button
          onClick={toggleHelpModal}
          style={{
            backgroundColor: 'red',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            padding: '10px 20px',
            cursor: 'pointer',
          }}
        >
          Close
        </button>
    </ReactModal>
        </>
);
}