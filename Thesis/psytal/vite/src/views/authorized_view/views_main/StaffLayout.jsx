import { Fragment, useState } from 'react'
import logo from "@assets/PsychCircle.png";
import dashboard from "@assets/icons8dashboard.png";
import home from "@assets/icons8home.png";
import file from "@assets/icons8file.png";
import users from "@assets/icons8adduser.png";
import avatar from "@assets/icons8avatar.png";
import link from "@assets/icons8link.png";
import curriculum from "@assets/icons8curriculum.png";
import classicon from "@assets/icons8book.png";
import ReactModal from 'react-modal';
import { NavLink, Navigate, Outlet } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react'
import { UserIcon, BellIcon, Bars3Icon } from '@heroicons/react/24/solid'
import { useStateContext } from '../../../context/ContextProvider';
import axiosClient from '../../../axios';
import UserProfile from '../views_components/profile_components/UserProfile';
import LogOutPrompt from '../prompts/LogOutPrompt';
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

const navigation = [
  { img: home, name: 'Home', to: 'home'},
  { img: users, name: 'Manage Accounts', to: 'manageusers'},
  { img: classicon, name: 'Classes', to: 'classes'},
  { img: file, name: 'Pre-Registration', to: 'preregistration'},
  { img: link, name: 'Links', to: 'links'},
  { img: curriculum, name: 'Curriculum', to: 'curriculum'}
]
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function StaffLayout() {
  // Calling the ProfilePopupSample
  const [isStaffProfileOpen, setIsStaffProfileOpen] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const {setCurrentUser, setUserToken, setUserRole, userToken, userRole, currentUser} = useStateContext();
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  if (!userToken) {
    localStorage.clear();
    return <Navigate to='/' />
  }

  if (userRole != 2) {
    localStorage.clear();
    return <Navigate to='/' />
  }

  const logout = () => {
    axiosClient.post('/logout')
      .then(res => {
        setCurrentUser({});
        setUserToken(null);
        setUserRole(null)
      })
  }

  // Function to toggle help modal
  const toggleHelpModal = () => {
    setIsHelpModalOpen(!isHelpModalOpen);
  };

  return (
    <>
      {/*NavBar*/}
      <div className="bg-white">
      <div className="flex-col flex">
          <div className="bg-viridian w-full border-b-2 border-gray-200">
            <div className=" h-16 justify-between items-center mx-auto px-10 flex">
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
                        {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                        <div className="fixed mt-2 w-auto origin-top-right right-[10%]"><h4 className="font-medium text-gray-800 dark:text-gray-600">WELCOME, {currentUser}</h4></div>
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
                              <button onClick={()=>setIsStaffProfileOpen(true)}
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
                            <UserIcon className=' w-8 h-8 rounded-full text-white bg-black hover:cursor-pointer' onClick={()=>setIsStaffProfileOpen(true)}/>
                            </div>
                          </div>
                          <div className="mt-3 space-y-1 px-2">
                              <button
                                as="a"
                                href="#"
                                onClick={() => setShowWarning(true)}
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
      
        <aside className="lg:min-w-[250px] hidden lg:h-fit lg:flex lg:flex-col lg:w-60 lg:h-50 lg:px-5 lg:py-5 lg:bg-white lg:border-r lg:rtl:border-r-0 lg:rtl:border-1 lg:rounded-lg lg:shadow-lg lg:shadow-2xl" >
          <div className="flex flex-col items-center mt-6 -mx-2 cursor-pointer" onClick={()=>setIsStaffProfileOpen(true)}>
            <img className="object-cover w-15 h-15 mx-2 rounded-full" src={avatar} alt="avatar"/>
            <h4 className="mx-2 mt-2 font-medium text-gray-800 dark:text-gray-600">{currentUser}</h4>
            <p className="mx-2 text-sm font-medium text-gray-600 dark:text-lime-600">Staff</p>
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
                <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: '9999' }}>
                    <button onClick={toggleHelpModal} style={{ backgroundColor: '#b3d7b2', color: '#000', border: 'none', borderRadius: '50%', width: '60px', height: '60px', fontSize: '30px', cursor: 'pointer' }}>?</button>
              </div>    

            <div className="flex flex-col w-3/4 pd-10 ml-10 ">
            <Outlet />
            </div>
        
        
      </div>

      {/**Setting up the Staff Profile */}
      <ReactModal
        isOpen={isStaffProfileOpen}
        onRequestClose={()=> setIsStaffProfileOpen(false)}
        className="w-full lg:w-8/12 px-4 container h-fit bg-white rounded-3xl ring-1 ring-black shadow-2xl mt-[10%] mx-auto p-5 ">
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

      <Navigate to='/staff/home' /> {/**This prevents the user from gaining access to /admin URL*/}
    </>
  );
}