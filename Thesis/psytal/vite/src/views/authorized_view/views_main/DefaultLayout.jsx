  import { Fragment, useState, useEffect } from 'react'
  import ReactModal from 'react-modal';
  import { Disclosure, Menu, Transition } from '@headlessui/react'
  import { Bars3Icon, BellIcon, UserIcon, XMarkIcon } from '@heroicons/react/24/solid'
  import { NavLink, Navigate, Outlet } from 'react-router-dom'
  import { useStateContext } from '../../../context/ContextProvider'
  import axiosClient from '../../../axios'
  import PsychLogo from '../../../assets/PsychCircle.png'
  import UserProfile from '../views_components/profile_components/UserProfile'
  import LogOutPrompt from '../prompts/LogOutPrompt';
  //STUDENT
  import page63 from "@assets/Help/Student/Post/1.png";
  import page64 from "@assets/Help/Student/Post/2.png";
  import page65 from "@assets/Help/Student/Post/3.png";
  import page66 from "@assets/Help/Student/Post/4.png";
  import page67 from "@assets/Help/Student/Pre-registration/1.png";
  import page68 from "@assets/Help/Student/Pre-registration/2.png";
  import page69 from "@assets/Help/Student/Classes/1.png";
  import page70 from "@assets/Help/Student/Links/1.png";
  import page71 from "@assets/Help/Student/CurriculumChecklist/1.png";

  const navigation = [
    { name: 'Home', to: '/student/home'},
    { name: 'Pre-Registration', to: '/student/preregistrationforcontinuing'},  
    { name: 'Classes', to: '/student/classes'},
    { name: 'Links', to: '/student/links'},
    { name: 'Curriculum Checklist', to: '/student/curriculumchecklist'}  
  ]

  const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#' },
  ]

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  export default function DefaultLayout() {
    // Calling the ProfilePopupSample
    const [isProfileOpen, setIsProfileOpen] = useState(0);
    const [showWarning, setShowWarning] = useState(false);
    // const {userToken, setCurrentUser, setUserToken, setUserRole, userRole} = useStateContext();
    const {setCurrentUser, setUserToken, setUserRole, userToken, userRole, currentUser} = useStateContext();
    const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
    const [isPreRegOpen, setIsPreRegOpen] = useState();
    const [semesterInformation, setSemesterInformation] = useState('');
    //
    //For Ongoing Semester and School Year
    useEffect(() => {
      axiosClient
        .get('/getsemesterinformation')
        .then((res) => {
          setSemesterInformation(res.data.semester);  // Assuming res.data is an array
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }, []);

    if (!userToken) {
      localStorage.clear();
      return <Navigate to='/' />
    }

    if (userRole != 4) {
      localStorage.clear();
      return <Navigate to='/' />
    }

    const logout = () => {
      axiosClient.post('/logout')
        .then(res => {
          setCurrentUser({});
          setUserToken(null)
          setUserRole(null)
        })
    }

    //Get open_pre_reg
      axiosClient
        .get('/getopenprereg')
        .then((res) => {
          setIsPreRegOpen(res.data[0])
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    
    const dynamicNavigation = isPreRegOpen === 0
      ? navigation.filter(item => item.name !== 'Pre-Registration')
      : navigation;

      // Function to toggle help modal
      const toggleHelpModal = () => {
        setIsHelpModalOpen(!isHelpModalOpen);
      };

    return (
      <>
        <div className="min-h-full w-full">
          <Disclosure as="nav" className="bg-[#588665]">
            {({ open }) => (
              <>
                <div className="w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-8">
                  <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <img
                          className="h-14 w-14"
                          src={PsychLogo}
                          alt="Your Company"
                        />
                      </div>
                      <div className="hidden md:flex md:flex-col">
                        <p className="font-semibold text-xl  ml-5 font-franklin text-white ">Department of Psychology</p>
                      </div>
                    </div>

                    
                    <div className="hidden md:block">
                      <div className="ml-4 flex items-center md:ml-6">
                        {/* Profile dropdown */}
                        
                        <Menu as="div" className="relative ml-3">
                          <div className= "flex items-center p-2">
                          <div className="relative mt-2 w-auto origin-top-right right-[10%]"><h4 className="font-medium text-gray-800 dark:text-gray-600">WELCOME, {currentUser}</h4></div>
                          <div>
                          
                            <Menu.Button className="relative flex max-w-xs items-center rounded-full shadow-2xl shadow-black text-sm  focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                              <span className="absolute -inset-1.5" />
                              <span className="sr-only">Open user menu</span>
                              <UserIcon className=' w-8 h-8 text-white' />
                            </Menu.Button> 
                          </div>
                          </div>

                          {/**Animation/Transitions */}
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              <Menu.Item>
                                <button onClick={() => setIsProfileOpen(true)}
                                  className={'block px-4 py-2 text-sm text-gray-700'}
                                >
                                  Profile
                                </button>
                                
                              </Menu.Item>
                              <Menu.Item>
                                <button
                                  onClick={() => setShowWarning(true)}
                                  className={'block px-4 py-2 text-sm text-gray-700'}
                                >
                                  Sign out
                                </button>
                              </Menu.Item>
                            </Menu.Items>
                          </Transition>
                        </Menu>                   
                      </div>
                    </div>
                    
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
                  </div>
                </div>

                <Disclosure.Panel className="md:hidden">
                    <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                      {dynamicNavigation.map((item) => (
                        <NavLink
                          key={item.name}
                          to={item.to}
                          className={({ isActive }) =>
                            classNames(
                              isActive
                                ? 'bg-[#3A4D39] text-white'
                                : 'text-gray-300 hover:bg-gray-500 hover:text-white',
                              'block rounded-md px-3 py-2 text-l font-medium'
                            )
                          }
                        >
                          {item.name}
                        </NavLink>
                      ))}
                    </div>
                  <div className="border-t border-gray-700 pb-3 pt-4">
                    <div className="flex items-center px-5">
                      <div className="flex-shrink-0">
                      <UserIcon className=' w-8 h-8 rounded-full text-white bg-black' onClick={() => setIsProfileOpen(true)} />
                      </div>
                      <div className="ml-3">
                        <div className="text-base font-medium leading-none text-white">{'test'}</div>
                        <div className="text-sm font-medium leading-none text-gray-400">{'test'}</div>
                      </div>
                      <button
                        type="button"
                        className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                    <div className="mt-3 space-y-1 px-2">
                        <Disclosure.Button
                          as="a"
                          href="#"
                          onClick={() => setShowWarning(true)}
                          className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                        >
                          Sign out
                        </Disclosure.Button>
                    </div>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          
          {/**Navbar */}
          <header className="flex bg-[#EFEFEF] h-14 items-center justify-center shadow">
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {dynamicNavigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.to}
                    className={({ isActive }) =>
                      classNames(
                        isActive
                          ? 'bg-[#CCEFCC] text-[#737373]'
                          : 'text-[#737373] hover:bg-[#CCEFCC] hover:text-[#737373]',
                            'rounded-md px-3 py-2 text-sm font-medium'
                      )
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </div>
          </header>
          <main>

        {/* Help Modal */}
        <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: '9999' }}>
                    <button onClick={toggleHelpModal} style={{ backgroundColor: '#b3d7b2', color: '#000', border: 'none', borderRadius: '50%', width: '60px', height: '60px', fontSize: '30px', cursor: 'pointer' }}>?</button>
        </div> 

            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
              <Outlet />
            </div>
          </main>
        </div>
      {/**Setting the Profile Popup */}
        <ReactModal 
          isOpen={isProfileOpen}
          onRequestClose={() => setIsProfileOpen(false)}
          className="w-full lg:w-[50%] bg-white rounded-3xl ring-1 ring-black shadow-2xl mt-[10%] mx-auto p-5"
          >
            <div><UserProfile closeModal={() => setIsProfileOpen(false)}/></div>
        </ReactModal>

        <ReactModal
            isOpen={showWarning}
            onRequestClose={() => setShowWarning(false)}
            className="md:w-[1%]"
        >
            <div>
                <LogOutPrompt
                    closeModal={() => setShowWarning(false)}
                    handleSave={logout}
                />
            </div>
        </ReactModal>
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
        <img
            src={page66}
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
    )
  }
