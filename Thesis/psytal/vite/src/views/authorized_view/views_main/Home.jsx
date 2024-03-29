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


export default function Home() {
  const {userRole} = useStateContext();
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  // Function to toggle help modal
  const toggleHelpModal = () => {
    setIsHelpModalOpen(!isHelpModalOpen);
  };

  
  return (
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
        {/* Help Modal */}
        <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: '9999' }}>
            <button onClick={toggleHelpModal} style={{ backgroundColor: '#fff', color: '#000', border: 'none', borderRadius: '50%', width: '40px', height: '40px', fontSize: '20px', cursor: 'pointer' }}>?</button>
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
        <img
            src={page2}
            alt="Page 2"
        />
        <img
            src={page3}
            alt="Page 3"
        />
        <img
            src={page4}
            alt="Page 4"
        />
        <img
            src={page5}
            alt="Page 5"
        />
        <img
            src={page6}
            alt="Page 6"
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
    </div>
  )
}
