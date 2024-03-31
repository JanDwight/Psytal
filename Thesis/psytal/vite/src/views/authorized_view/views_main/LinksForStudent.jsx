import React, { useState, useEffect } from 'react';
import axiosClient from '../../../axios.js';
import ReactModal from 'react-modal';
import page1 from "@assets/Help/Student/Links/1.png";


export default function LinksForStudent() {

  const [filterText, setFilterText] = useState(''); //for search
  
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  // Function to toggle help modal
  const toggleHelpModal = () => {
    setIsHelpModalOpen(!isHelpModalOpen);
  };

  const fetchLinks = async () => {
    try {
      const response = await axiosClient.get('/getlinks');
      setLinks(response.data.links);
    } catch (error) {
      console.error(error);
    }
  };

  const [links, setLinks] = useState([]);  
  useEffect(() => {
    fetchLinks();
  }, []);

  useEffect(() => {
    fetchLinks();
  }, []);

  // //for search
  const filteredData = links.filter(
    (link) =>
      link.class_code.toString().toLowerCase().includes(filterText.toLowerCase()) ||
      link.class_description.toLowerCase().includes(filterText.toLowerCase()) ||
      link.instructor_name.toLowerCase().includes(filterText.toLowerCase()) ||
      link.url.toLowerCase().includes(filterText.toLowerCase())
  );
 
  return (
    <>
    <div className="w-full h-full px-4 mx-auto  rounded-3xl bg-white shadow-2xl pt-5 pb-12  table-container overflow-y-auto">
      <div className="mt-5 mx-5 pb-5 border-b-2 border-black flex flex-row justify-between items-baseline">
        <div className="font-bold text-4xl lg:text-6xl text-[#525252]">Links</div>
        <div className="mt-5 mx-5 flex flex-row justify-between items-baseline">
          
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
    
      {/* <div className="table-container overflow-x-auto"> Edited*/}
      <div className="table-container overflow-y-auto">
            <table className="table w-full table-striped text-gray-700 mt-5" >
		            <thead>
		              <tr>
                    <th className="text-center bg-gray-200 p-2" style={{ width: "10%" }}>Title</th>
                    <th className="text-center bg-gray-200 p-2" style={{ width: "15%" }}>Description</th>
                    <th className="text-center bg-gray-200 p-2" style={{ width: "15%" }}>Contact</th>
                    <th className="text-center bg-gray-200 p-2" style={{ width: "60%" }}>Links</th>
		              </tr>
                </thead>
                </table>
                </div>
                <div className="max-h-[400px] overflow-y-auto">
                  <table>
                 <tbody>
                     {filteredData.map((link, index) => (//edited
                      <tr key={index} className={`${index % 2 === 0 ? 'odd:bg-green-100' : ''}`}>
                          <td className="text-center p-2 overflow-hidden overflow-wrap break-word" style={{ width: "10%" }}>{link.class_code.slice(0, 40)}</td>
                          <td className="text-center p-2 overflow-hidden overflow-wrap break-word" style={{ width: "15%" }}>{link.class_description.slice(0, 50)}</td>
                          <td className="text-center p-2 overflow-hidden overflow-wrap break-word" style={{ width: "15%" }}>{link.instructor_name.slice(0, 50)}</td>
                          <td className="text-center p-2 overflow-hidden overflow-wrap break-word" style={{ width: "60%" }}>
                            <a href={link.url} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-blue-500">
                           {link.url.slice(0, 50)}... {/* Displaying the first 10 characters */}
                            </a>
                          </td>
                        </tr>
                        ))}
                </tbody>
	          </table>
        {/* Help Modal */}
        <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: '9999' }}>
              <button onClick={toggleHelpModal} style={{ backgroundColor: '#b3d7b2', color: '#000', border: 'none', borderRadius: '50%', width: '60px', height: '60px', fontSize: '30px', cursor: 'pointer' }}>?</button>
        </div>
            </div>
          </div>  
          {/* HELP*/}
      <ReactModal
      isOpen={isHelpModalOpen}
      onRequestClose={toggleHelpModal}
      style={{ content: {
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: '9998',
          backgroundColor: '#fff',
          border: '1px solid #000',
          padding: '20px',
          textAlign: 'center', // Align the content center
        }
      }}
    >
      <div>
        <img
            src={page1}
            alt="Page 1"
        />

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
      </div>
    </ReactModal>         
      </>

    
  );
  }