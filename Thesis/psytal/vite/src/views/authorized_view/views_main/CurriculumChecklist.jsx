import React, { useState, useEffect } from 'react';
import axiosClient from '../../../axios';
import ReactModal from 'react-modal';

export default function CurriculumChecklist(){
      const [errors, setErrors] = useState({ __html: '' });
      const [curriculum, setCurriculum] = useState([]);
      const [grade, setGrade] = useState([]);   
      const [filterText, setFilterText] = useState(''); //for search

      //disclaimers
      const [disclaimer, setDisclaimer] = useState(false);
      useEffect(() => {
        setDisclaimer(true); // Set showModal to true when the component mounts
            
      }, []); 
      const handleCloseDisclaimer = () => {
        setDisclaimer(false);
      };
        
    // should be connected to studentclasslist of instructors to update grade values
    // add to admin/staff layout so they can edit the grades during pre-regristration period
        useEffect(() => {
            fetchCurriculum();
          }, []);
        
        const fetchCurriculum = async () => {
            try {
              const response = await axiosClient.get('/curriculumnCheckListIndex');
              setCurriculum(response.data.curriculum);
            } catch (error) {
              console.error(error);
            }
          };

          useEffect(() => {
              fetchGrade();
            }, []);
          
            const fetchGrade = async () => {
              try {
                const response = await axiosClient.get('/getgrade');
                setGrade(response.data.grade);
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
    //curriculum.hoursperWeek.toString().includes(filterText) ||
    curriculum.course_type.toLowerCase().includes(filterText.toLowerCase()) ||
    curriculum.preReq.toLowerCase().includes(filterText.toLowerCase()) ||
    curriculum.grade.toString().includes(filterText) // this should be from studentclasslist db

  );

  return (
        <>
        <div className="w-full h-full px-4 mx-auto  rounded-3xl bg-white shadow-2xl pt-5 pb-12  table-container overflow-y-auto">{/*For the Container*/}
            <div className="mt-5 mx-5 pb-5 border-b-2 border-black flex flex-row justify-between items-baseline">
                <div className="font-bold text-6xl text-[#525252]">Curriculum Checklist</div>
                {/*Search*/}
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
                    </div>   
            </div>
            
            <div className="table-container overflow-y-auto">
              {curriculum.length === 0 ? (
                <p className="text-center text-gray-500 text-lg font-bold my-8">No Data To Show</p>
                  ) : (
                    <table className="table w-full table-striped text-gray-700 mt-5">
		                    <thead>
		                      <tr>
                            <th className="text-center bg-gray-200 p-2">Class Year</th>
                            <th className="text-center bg-gray-200 p-2">Semester</th>
                            <th className="text-center bg-gray-200 p-2">Course Code</th>
                            <th className="text-center bg-gray-200 p-2">Units</th>
                            <th className="text-center bg-gray-200 p-2">Course Title</th>
                            {/* {<th className="text-center bg-gray-200 p-2">Hours/Week</th>} */}
                            <th className="text-center bg-gray-200 p-2">Lec/Lab</th>
                            <th className="text-center bg-gray-200 p-2">Pre-Requisite</th>
                            <th className="text-center bg-gray-200 p-2">Grade</th>
		                      </tr>
                        </thead>

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
                                  {/* {<td className="text-center p-2">{curriculum.hoursperWeek}</td>} */}
                                  <td className="text-center p-2">{curriculum.course_type}</td>
                                  <td className="text-center p-2">{curriculum.preReq}</td>
                                  <td className="text-center p-2">{curriculum.grade !== '0' ? curriculum.grade : 'N/A'}</td>  
                                </tr>
                                ))}
                        </tbody>
	                  </table>
                  )}
            </div>
          </div>
          {disclaimer && (
          <div className="fixed top-0 left-0 w-full h-full overflow-y-auto bg-black bg-opacity-50">
          <div className="lg:w-3/4 px-4 py-1 shadow-lg w-[75%] h-fit bg-[#FFFFFF] rounded-xl mt-[10%] mx-auto p-5">
          <div className="w-full px-4 mx-auto mt-6">
              <div className="text-xl text-green-600 font-semibold my-3">
                
              <head>
                <title>Student Grades Disclaimer</title>
              </head>
              <body>
                <h1 className='text-center'><strong>Regarding Student Grades</strong></h1>
                <p></p>
                <br></br>
                <ol class="text-justify">
                  <li>1. Please be aware that the list of numerical grades presented here is for viewing purposes only and is not considered official. </li>
                  <li>2. Students are reminded to retrieve their official grades from the university registrar's office for enrollment purposes.</li>
                </ol>
                <br></br>
                  <div className='text-center'>
                    <button
                      className="bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded-full" 
                      onClick={handleCloseDisclaimer}>I Understand</button>
                  </div>
              </body>
              </div>
            </div>
          </div>
        </div>
        )}     
        </>
);
}