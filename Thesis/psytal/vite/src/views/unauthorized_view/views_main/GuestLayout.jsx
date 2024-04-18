import { Fragment } from 'react';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { NavLink, Navigate, Outlet } from 'react-router-dom';
import { useStateContext } from '../../../context/ContextProvider';
import { useState, useEffect } from 'react';
import logo from "@assets/PsychCircle.png";
import axiosClient from '../../../axios';
import ReactModal from 'react-modal';
import page1 from "@assets/Help/Login/1.png";
import page2 from "@assets/Help/Login/2.png";
import page3 from "@assets/Help/Pre-registration-incoming/1.png";
import page4 from "@assets/Help/Pre-registration-incoming/2.png";

const navigation = [
  { name: 'Home', to: 'landingpage' },
  { name: 'Pre-Registration-Incoming Students', to: 'preregistrationforincoming' }
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function GuestLayout() {
  const { userToken, userRole } = useStateContext();
  const [isPreRegOpen, setIsPreRegOpen] = useState();
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  
  //Get open_pre_reg
  useEffect(() => {
    axiosClient
      .get('/getopenprereg')
      .then((res) => {
        setIsPreRegOpen(res.data[0])
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  
  const dynamicNavigation = isPreRegOpen !== 1
    ? navigation.filter(item => item.name !== 'Pre-Registration-Incoming Students')
    : navigation;

  if (userToken && userRole === 1) {
    return <Navigate to='/admin/home' />;
  } else if (userToken && userRole === 2) {
    return <Navigate to='/staff/home' />;
  } else if (userToken && userRole === 3) {
    return <Navigate to='/instructor/home' />;
  } else if (userToken && userRole === 4) {
    return <Navigate to='/student/home' />;
  }

  // Function to toggle help modal
  const toggleHelpModal = () => {
    setIsHelpModalOpen(!isHelpModalOpen);
  };

  return (
    <>
      <div className='min-h-[15vh]'>
        <header className='fixed z-10'>
        <Disclosure as="nav" className="bg-viridian">
          {({ open }) => (
            <>
            {/* 1st Header */}
            <div  className=" w-[100vw]"> 
              <div className="flex justify-center space-x-5 px-10 py-2">
                <div className="flex static items-center">
                  <a href="/landingpage" className='flex-shrink-0'>
                    <img
                      className="h-14 w-14"
                      src={logo}
                      alt="Department of Psychology"
                    />
                  </a>
                  <div className="flex items-center px-10">
                    <p className="font-semibold text-lg sm:text-3xl ml-2 font-franklin text-white">
                      DEPARTMENT OF PSYCHOLOGY PORTAL
                    </p>
                  </div>
                </div>
                </div>
                </div>
              {/* 2nd Header */}
                <div className="md:flex justify-center items-center px-10 py-2 bg-[#739072]">
                <div>
                  <div className="ml-10 flex items-baseline space-x-10">
                    {dynamicNavigation.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.to}
                        className={({ isActive }) =>
                          classNames(
                            isActive
                              ? 'bg-[#3A4D39] text-white'
                              : 'text-gray-300 hover:bg-gray-500 hover:text-white',
                            'rounded-md px-3 py-2 text-l font-medium'
                          )
                        }
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
          </div>

                {/*Background*/}
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.to}
                      className={({ isActive }) =>
                        classNames(
                          isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'block rounded-md px-3 py-2 text-base font-medium'
                        )
                      }
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        </header>
        </div>
        {/* Help Modal */}
        <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: '9999' }}>
              <button onClick={toggleHelpModal} style={{ backgroundColor: '#b3d7b2', color: '#000', border: 'none', borderRadius: '50%', width: '60px', height: '60px', fontSize: '30px', cursor: 'pointer' }}>?</button>
        </div>

      <div>
        <main>
          <div className='h-[100vh] w-[100vw]'>
            <Outlet/>
          </div>
        </main>
      </div>
  {/* HELP*/}
    <ReactModal
      isOpen={isHelpModalOpen}
      onRequestClose={toggleHelpModal}
      style={{ content: {
        position: 'fixed',
        width: '60%',
        bottom: '20px',
        top: '25vh',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: '9999',
        backgroundColor: '#fff',
        border: '1px solid #000',
        padding: '20px',
        textAlign: 'center',
        }
      }}
    >
      <div>
        <p className='text-3xl bg-[#91b482]'>LOGIN</p>
        <img
            src={page1}
            alt="Page 1"
        />
        <img
            src={page2}
            alt="Page 2"
        />
        <p className='text-3xl bg-[#91b482]'>PRE-REGISTRATION</p>
        <img
            src={page3}
            alt="Page 3"
        />
        <img
            src={page4}
            alt="Page 4"
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
