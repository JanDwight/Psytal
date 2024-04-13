import React, { useEffect, useState } from 'react';
import AddingPost from '../views_components/AddingPost';
import PostArticles from '../views_components/Post_Components/PostArticles';
import { useStateContext } from '../../../context/ContextProvider';
import ReactModal from 'react-modal';
import page1 from "@assets/Help/Admin/Post/1.png";
import page2 from "@assets/Help/Admin/Post/2.png";
import page3 from "@assets/Help/Admin/Post/3.png";
import page4 from "@assets/Help/Admin/Post/4.png";
import page5 from "@assets/Help/Admin/Post/5.png";
import page6 from "@assets/Help/Admin/Post/6.png";
import page7 from "@assets/Help/Admin/Post/7.png";

import page42 from "@assets/Help/Staff/Post/1.png";
import page43 from "@assets/Help/Staff/Post/2.png";
import page44 from "@assets/Help/Staff/Post/3.png";
import page63 from "@assets/Help/Student/Post/1.png";
import page64 from "@assets/Help/Student/Post/2.png";
import page65 from "@assets/Help/Student/Post/3.png";


export default function Home(isOpen, onClose) {
  const {userRole} = useStateContext();
  
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false); //help modal
    
  // Function to toggle help modal
    const toggleHelpModal = () => {
      setIsHelpModalOpen(!isHelpModalOpen);
    };

  return (
    <>
    <div>
      <div className="flex flex-col justify-center items-center ml-10">
      {userRole == 1 && (
          <div className="w-full">
            <AddingPost />
          </div>
        )}

          <div className="w-full mt-10">
          <PostArticles/>
          </div>
        </div>
    </div>
    
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
            <p className='text-3xl bg-[#91b482]'>HOME</p>
            <img src={page1} />
            <img src={page2} />
            <img src={page3} />
            <img src={page4} />
            <img src={page5} />
            <img src={page6} />
            <img src={page7} />
            
        </>
          )}
          {userRole == 2 && (
              <>
            <p className='text-4xl bg-[#7e9f70]'>STAFF USER'S MANUAL</p>
            <p className='text-3xl bg-[#91b482]'>HOME</p>
            <img src={page42} />
            <img src={page43} />
            <img src={page44} />
              </>

          )}
          {userRole == 4 && (
              <>
            <p className='text-4xl bg-[#7e9f70]'>STUDENT USER'S MANUAL</p>
            <p className='text-3xl bg-[#91b482]'>HOME</p>
            <img src={page63} />
            <img src={page64} />
            <img src={page65} />
  
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
        
  )
}
