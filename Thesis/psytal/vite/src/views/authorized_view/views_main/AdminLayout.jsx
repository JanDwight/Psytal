import { Fragment, useState, useEffect } from 'react'
import logo from "@assets/PsychCircle.png";
import dashboard from "@assets/icons8dashboard.png";
import home from "@assets/icons8home.png";
import file from "@assets/icons8file.png";
import users from "@assets/icons8adduser.png";
import avatar from "@assets/icons8avatar.png";
import link from "@assets/icons8link.png";
import curriculum from "@assets/icons8curriculum.png";
import archive from "@assets/icons8archive60.png"
import classicon from "@assets/icons8book.png";
import settingsIcon from "@assets/Settings Icon.png"
import ReactModal from 'react-modal';
import { NavLink, Navigate, Outlet } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react'
import { EllipsisHorizontalIcon ,MagnifyingGlassIcon, UserIcon, BellIcon, Bars3Icon } from '@heroicons/react/24/solid'
import { useStateContext } from '../../../context/ContextProvider';
import axiosClient from '../../../axios';
import UserProfile from '../views_components/profile_components/UserProfile';
import LogOutPrompt from '../prompts/LogOutPrompt';
//imports for help
//Not Used
//ADMIN
import page1 from "@assets/Help/Admin/Post/1.png";
import page2 from "@assets/Help/Admin/Post/2.png";
import page3 from "@assets/Help/Admin/Post/3.png";
import page4 from "@assets/Help/Admin/Post/4.png";
import page5 from "@assets/Help/Admin/Post/5.png";
import page6 from "@assets/Help/Admin/Post/6.png";
import page7 from "@assets/Help/Admin/Post/7.png";
import page8 from "@assets/Help/Admin/Post/8.png";
import page9 from "@assets/Help/Admin/Dashboard/1.png";
import page10 from "@assets/Help/Admin/Dashboard/2.png";
import page11 from "@assets/Help/Admin/Dashboard/3.png";
import page12 from "@assets/Help/Admin/ManageAccounts/1.png";
import page13 from "@assets/Help/Admin/ManageAccounts/2.png";
import page14 from "@assets/Help/Admin/ManageAccounts/3.png";
import page15 from "@assets/Help/Admin/ManageAccounts/4.png";
import page16 from "@assets/Help/Admin/Classes/1.png";
import page17 from "@assets/Help/Admin/Classes/2.png";
import page18 from "@assets/Help/Admin/Classes/3.png";
import page19 from "@assets/Help/Admin/Classes/4.png";
import page20 from "@assets/Help/Admin/Pre-registration/1.png";
import page21 from "@assets/Help/Admin/Pre-registration/2.png";
import page22 from "@assets/Help/Admin/Pre-registration/3.png";
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
import page66 from "@assets/Help/Student/Post/4.png";
import page67 from "@assets/Help/Student/Pre-registration/1.png";
import page68 from "@assets/Help/Student/Pre-registration/2.png";
import page69 from "@assets/Help/Student/Classes/1.png";
import page70 from "@assets/Help/Student/Links/1.png";
import page71 from "@assets/Help/Student/CurriculumChecklist/1.png";


const navigation = [
  { img: home, name: 'Home', to: 'home'},
  { img: dashboard, name: 'Dashboard', to: 'dashboard'},
  { img: users, name: 'Manage Accounts', to: 'manageusers'},
  { img: classicon, name: 'Classes', to: 'classes'},
  { img: file, name: 'Pre-registration', to: 'preregistration'},
  { img: link, name: 'Links', to: 'links'},
  { img: curriculum, name: 'Curriculum', to: 'curriculum'},
  { img: settingsIcon, name: 'Settings', to: 'settings'}
  //add view archives
]
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function AdminLayout() {
  // Calling the ProfilePopupSample
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const {setCurrentUser, setUserToken, setUserRole, userToken, userRole, currentUser} = useStateContext();
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
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

  if (userRole != 1) {
    localStorage.clear();
    return <Navigate to='/' />
  }


  if (!userToken && !userRole) {
    return <Navigate to='/' />
  }

  const logout = () => {
    //ev.preventDefault();
    axiosClient.post('/logout')
      .then(res => {
        setCurrentUser({});
        setUserToken(null);
        setUserRole(null);
      })
  }

  // Function to toggle help modal
  const toggleHelpModal = () => {
    setIsHelpModalOpen(!isHelpModalOpen);
  };

  return (
    <>
      <div className="bg-white">
        {/*NavBar*/}
        <div className="flex-col flex">
          <div className="bg-viridian w-full border-b-2 border-gray-200">
            <div className=" h-20 justify-between items-center mx-auto px-10 flex">
              <div className='flex flex-row'>
                <div>
                  <img src= {logo}
                    className="block btn- h-11 w-auto" alt="Department of Psychology" />
                </div>
                <div className="hidden md:flex md:flex-col">
                  <p className="font-semibold text-xl  ml-5 font-franklin text-white ">Department of Psychology</p>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                <div className= "flex items-center p-2">
                          <div className="relative mt-2 w-auto origin-top-right right-[10%]"><h4 className="font-medium text-gray-800 dark:text-gray-600">WELCOME, {currentUser}</h4></div>
                  {/* Profile dropdown */}{/*lg:hidden*/}
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="relative flex max-w-xs items-center rounded-full shadow-2xl shadow-black text-sm  focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <UserIcon className=' w-8 h-8 text-white' />
                        </Menu.Button> 
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
                              //onClick={(ev) => setLogout(ev)}
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
                </div>

                {/*Mobile Menu*/}
                <Menu as='div' className='relative z-50 lg:hidden'>
                  <div className=''>
                    <Menu.Button>
                      <Bars3Icon className='w-10 h-10 text-white'/>
                    </Menu.Button>
                  </div>
                  
                  <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                    <Menu.Items className='absolute -right-10 w-[450%] origin-bottom-left py-5  bg-[#D9D9D9] rounded-3xl'>
                      {navigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({active}) => (
                            <NavLink
                              key={item.name}
                              to={item.to}
                              className={({isActive}) => classNames(
                                isActive
                                ? 'bg-[#CCEFCC]  text-[#757575]'
                                : 'text-[#757575] hover:bg-gray-200 hover:text-black',
                                'rounded-full px-3 py-1 text-sm font-medium flex items-center mt-5'
                              )}
                            >
                              <img src={item.img} className='w-10  pr-5'/>
                              {item.name}
                            </NavLink>
                          )}
                        </Menu.Item>
                      ))}
                      <div className="border-t border-gray-500 mt-5 pb-3 pt-4">
                        <div className="flex items-center px-5">
                          <div className="flex-shrink-0">
                          <UserIcon className=' w-8 h-8 rounded-full text-white bg-black hover:cursor-pointer' onClick={() => setIsProfileOpen(true)} />
                          </div>
                        </div>
                        <div className="mt-3 space-y-1 px-2">
                            <button
                              as="a"
                              href="#"
                              onClick={() => setShowWarning(true)}
                              //onClick={(ev) => setLogout(ev)}
                              className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                            >
                              Sign out
                            </button>
                        </div>
                      </div>
                    
                    </Menu.Items>

                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
        </div>
    
    
      {/*sidebar*/}
      <div className="flex justify-start px-10 pt-5"> {/*Main container */}
      
        <aside className="lg:min-w-[250px] hidden lg:h-fit lg:flex lg:flex-col lg:w-1/4 lg:h-50 lg:px-5 lg:py-5 lg:bg-white lg:border-r lg:rtl:border-r-0 lg:rtl:border-1 lg:rounded-lg  lg:shadow-2xl  " >
          <div className="flex flex-col items-center mt-6 -mx-2">
            <img className="object-cover w-15 h-15 mx-2 rounded-full cursor-pointer" src={avatar} alt="avatar" onClick={() => setIsProfileOpen(true)}/>
            <h4 className="mx-2 mt-2 font-medium text-gray-800 dark:text-gray-600">{currentUser}</h4>
            <p className="mx-2 text-sm font-medium text-gray-600 dark:text-lime-600">Admin</p>
          </div>

          <div className="flex flex-col justify-between mt-2">
            {navigation.map((item) => (
                            
              <NavLink
                key={item.name}
                to={item.to}
                className={({label, isActive, onClick }) => classNames(
                isActive
                  ? 'bg-[#aaf0aa]  text-black'
                  : 'text-gray-600 hover:bg-gray-200 hover:text-black',
                  'rounded-full px-3 py-1 text-sm font-medium flex items-center mt-5'
                )}
              >
                <img src={item.img} className='w-10  pr-5'/>
                  {item.name}
              </NavLink>
            ))}
        
          </div>
        </aside>

        {/* Help Modal */}
              {/* <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: '9999' }}>
                    <button onClick={toggleHelpModal} style={{ backgroundColor: '#b3d7b2', color: '#000', border: 'none', borderRadius: '50%', width: '60px', height: '60px', fontSize: '30px', cursor: 'pointer' }}>?</button>
              </div>          */}

        <div className="flex flex-col w-3/4 pd-10 ml-10 ">
          <Outlet/>
        </div>
        
        
      </div>

      {/**Setting the Profile Popup */}
      <ReactModal 
      isOpen={isProfileOpen}
      onRequestClose={() => setIsProfileOpen(false)}
      className="w-full lg:w-8/12 px-4 container h-fit bg-white rounded-3xl ring-1 ring-black shadow-2xl mt-[10%] mx-auto p-5 "
      >
        <div className='relative flex flex-col min-w-0 break-words w-full mt-3'>
          <UserProfile closeModal={() => setIsProfileOpen(false)}/>
        </div>
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
    {/* <ReactModal
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
        <img
            src={page8}
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
    </ReactModal> */}

  </>
  );
}