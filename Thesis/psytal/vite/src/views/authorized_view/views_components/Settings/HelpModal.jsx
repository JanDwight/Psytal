import React, { useState, useRef, useEffect } from 'react';
import ReactModal from 'react-modal';
//imports for help
//ADMIN
import page1 from "@assets/Help/Admin/Post/1.png";
import page2 from "@assets/Help/Admin/Post/2.png";
import page3 from "@assets/Help/Admin/Post/3.png";
import page4 from "@assets/Help/Admin/Post/4.png";
import page5 from "@assets/Help/Admin/Post/5.png";
import page6 from "@assets/Help/Admin/Post/6.png";
import page7 from "@assets/Help/Admin/Post/7.png";
import page9 from "@assets/Help/Admin/Dashboard/1.png";
import page10 from "@assets/Help/Admin/Dashboard/2.png";
import page11 from "@assets/Help/Admin/Dashboard/3.png";
import page12 from "@assets/Help/Admin/ManageAccounts/1.png";
import page13 from "@assets/Help/Admin/ManageAccounts/2.png";
import page14 from "@assets/Help/Admin/ManageAccounts/3.png";
import page15 from "@assets/Help/Admin/ManageAccounts/4.png";
import page15a from "@assets/Help/Admin/ManageAccounts/5.png";
import page15b from "@assets/Help/Admin/ManageAccounts/6.png";
import page15c from "@assets/Help/Admin/ManageAccounts/7.png";
import page16 from "@assets/Help/Admin/Classes/1.png";
import page17 from "@assets/Help/Admin/Classes/2.png";
import page18 from "@assets/Help/Admin/Classes/3.png";
import page19 from "@assets/Help/Admin/Classes/4.png";
import page19a from "@assets/Help/Admin/Classes/5.png";
import page20 from "@assets/Help/Admin/Pre-registration/1.png";
import page21 from "@assets/Help/Admin/Pre-registration/2.png";
import page22 from "@assets/Help/Admin/Pre-registration/3.png";
import page22a from "@assets/Help/Admin/Pre-registration/4.png";
import page23 from "@assets/Help/Admin/Links/1.png";
import page24 from "@assets/Help/Admin/Links/2.png";
import page25 from "@assets/Help/Admin/Links/3.png";
import page26 from "@assets/Help/Admin/Links/4.png";
import page27 from "@assets/Help/Admin/Links/5.png";
import page28 from "@assets/Help/Admin/Curriculum/1.png";
import page29 from "@assets/Help/Admin/Curriculum/2.png";
import page30 from "@assets/Help/Admin/Curriculum/3.png";
import page31 from "@assets/Help/Admin/Curriculum/4.png";
import page32 from "@assets/Help/Admin/Settings/1.png";
import page33 from "@assets/Help/Admin/Settings/2.png";
import page34 from "@assets/Help/Admin/Settings/3.png";
import page35 from "@assets/Help/Admin/Settings/4.png";
import page36 from "@assets/Help/Admin/Settings/5.png";
import page37 from "@assets/Help/Admin/Settings/6.png";
import page38 from "@assets/Help/Admin/Settings/7.png";
import page39 from "@assets/Help/Admin/Settings/8.png";
import page40 from "@assets/Help/Admin/Settings/9.png";
import page41 from "@assets/Help/Admin/Settings/10.png";
import page41a from "@assets/Help/Admin/Settings/11.png";

//STAFF
import page42 from "@assets/Help/Staff/Post/1.png";
import page43 from "@assets/Help/Staff/Post/2.png";
import page44 from "@assets/Help/Staff/Post/3.png";
import page45 from "@assets/Help/Staff/ManageAccounts/1.png";
import page46 from "@assets/Help/Staff/ManageAccounts/2.png";
import page47 from "@assets/Help/Staff/ManageAccounts/3.png";
import page48 from "@assets/Help/Staff/ManageAccounts/4.png";
import page49 from "@assets/Help/Staff/Classes/1.png";
import page50 from "@assets/Help/Staff/Classes/2.png";
import page51 from "@assets/Help/Staff/Classes/3.png";
import page52 from "@assets/Help/Staff/Classes/4.png";
import page53 from "@assets/Help/Staff/Classes/5.png";
import page54 from "@assets/Help/Staff/Pre-registration/1.png";
import page55 from "@assets/Help/Staff/Pre-registration/2.png";
import page56 from "@assets/Help/Staff/Pre-registration/3.png";
import page57 from "@assets/Help/Staff/Links/1.png";
import page58 from "@assets/Help/Staff/Links/2.png";
import page59 from "@assets/Help/Staff/Links/3.png";
import page60 from "@assets/Help/Staff/Curriculum/1.png";
import page61 from "@assets/Help/Staff/Curriculum/2.png";
import page62 from "@assets/Help/Staff/Curriculum/3.png";

//STUDENT
import page63 from "@assets/Help/Student/Post/1.png";
import page64 from "@assets/Help/Student/Post/2.png";
import page65 from "@assets/Help/Student/Post/3.png";

import page67 from "@assets/Help/Student/Pre-registration/1.png";
import page68 from "@assets/Help/Student/Pre-registration/2.png";
import page69 from "@assets/Help/Student/Classes/1.png";
import page70 from "@assets/Help/Student/Links/1.png";
import page71 from "@assets/Help/Student/CurriculumChecklist/1.png";


export default function HelpModal({  isOpen, onClose}) {
  const toggleHelpModal = () => {
    setIsHelpModalOpen(!isHelpModalOpen);
  };
  return (
    <>

   {/* HELP*/}
    <ReactModal
                isOpen={isOpen}
                onRequestClose={onClose}
                style={{
                    content: {
                        position: 'fixed',
                        width: '60%',
                        bottom: '20px',
                        top: '15%',
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
      <p className='text-4xl bg-[#7e9f70]'>ADMIN USER'S MANUAL</p>
      <p className='text-3xl bg-[#91b482]'>HOME</p>
        <img
            src={page1}
        />
        <img
            src={page2}
        />
        <img
            src={page3}
        />
        <img
            src={page4}
        />
        <img
            src={page5}
        />
        <img
            src={page6}
        />
        <img
            src={page7}
        />

        <p className='text-3xl bg-[#91b482]'>DASHBOARD</p>
        <img
            src={page9}
        />
        <img
            src={page10}
        />
        <img
            src={page11}
        />
        <p className='text-3xl bg-[#91b482]'>MANAGE ACCOUNTS</p>
        <img
            src={page12}
        />
        <img
            src={page13}
        />
        <img
            src={page14}
        />
        <img
            src={page15}
        />
        <img
            src={page15a}
        />
        <img
            src={page15b}
        />
        <img
            src={page15c}
        />
        <p className='text-3xl bg-[#91b482]'>CLASSES</p>
        <img
            src={page16}
        />
        <img
            src={page17}
        />
        <img
            src={page18}
        />
        <img
            src={page19}
        />
        <img
            src={page19a}
        />
        <p className='text-3xl bg-[#91b482]'>PRE-REGISTRATION</p>
        <img
            src={page20}
        />
        <img
            src={page21}
        />
        <img
            src={page22}
        />
        <img
            src={page22a}
        />
        <p className='text-3xl bg-[#91b482]'>LINKS</p>
        <img
            src={page23}
        />
        <img
            src={page24}
        />
        <img
            src={page25}
        />
        <img
            src={page26}
        />
        <img
            src={page27}
        />
        <p className='text-3xl bg-[#91b482]'>CURRICULUM</p>
        <img
            src={page28}
        />
        <img
            src={page29}
        />
        <img
            src={page30}
        />
        <img
            src={page31}
        />
        <p className='text-3xl bg-[#91b482]'>SETTINGS</p>
        <img
            src={page32}
        />
        <img
            src={page33}
        />
        <img
            src={page34}
        />
        <img
            src={page35}
        />
        <img
            src={page36}
        />
        <img
            src={page37}
        />
        <img
            src={page38}
        />
        <img
            src={page39}
        />
        <img
            src={page40}
        />
        <img
            src={page41}
        />
        <img
            src={page41a}
        />
        <p className='text-4xl bg-[#7e9f70]'>STAFF USER'S MANUAL</p>
        <p className='text-3xl bg-[#91b482]'>HOME</p>
        <img
            src={page42}
        />
        <img
            src={page43}
        />
        <img
            src={page44}
        />
        <p className='text-3xl bg-[#91b482]'>MANAGE ACCOUNTS</p>
        <img
            src={page45}
        />
        <img
            src={page46}
        />
        <img
            src={page47}
        />
        <img
            src={page48}
        />
        <p className='text-3xl bg-[#91b482]'>CLASSES</p>
        <img
            src={page49}
        />
        <img
            src={page50}
        />
        <img
            src={page51}
        />
        <img
            src={page52}
        />
        <img
            src={page53}
        />
        <p className='text-3xl bg-[#91b482]'>PRE-REGISTRATION</p>
        <img
            src={page54}
        />
        <img
            src={page55}
        />
        <img
            src={page56}
        />
        <p className='text-3xl bg-[#91b482]'>LINKS</p>
        <img
            src={page57}
        />
        <img
            src={page58}
        />
        <img
            src={page59}
        />
        <p className='text-3xl bg-[#91b482]'>CURRICULUM</p>
        <img
            src={page60}
        />
        <img
            src={page61}
        />
        <img
            src={page62}
        />
        <p className='text-4xl bg-[#7e9f70]'>STUDENT USER'S MANUAL</p>
        <p className='text-3xl bg-[#91b482]'>HOME</p>
        <img
            src={page63}
        />
        <img
            src={page64}
        />
        <img
            src={page65}
        />

        <p className='text-3xl bg-[#91b482]'>PRE-REGISTRATION</p>
        <img
            src={page67}
        />
        <img
            src={page68}
        />
        <p className='text-3xl bg-[#91b482]'>CLASSES</p>
        <img
            src={page69}
        />
        <p className='text-3xl bg-[#91b482]'>LINKS</p>
        <img
            src={page70}
        />
        <p className='text-3xl bg-[#91b482]'>CURRICULUM CHECKLIST</p>
        <img
            src={page71}
        />
        {/* Close Button  */}
        <button onClick={onClose} style={{ 
                    top: '10px',
                    right: '10px',
                    backgroundColor: 'red',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    padding: '10px 20px',
                    cursor: 'pointer',
                }}>
                    Close
                </button>
      </div>
    </ReactModal>
    </>
  );
}