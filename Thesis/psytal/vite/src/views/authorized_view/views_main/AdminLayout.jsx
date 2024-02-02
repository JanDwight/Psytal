import { Fragment, useState } from 'react'
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

  const {setCurrentUser, setUserToken, setUserRole, userToken, userRole, currentUser} = useStateContext();
  
  if (!userToken) {
    localStorage.clear();
    return <Navigate to='/' />
  }

  if (userRole != 1) {
    localStorage.clear();
    return <Navigate to='/' />
  }

  console.log(userRole)

  if (!userToken && !userRole) {
    return <Navigate to='/' />
  }

  const logout = (ev) => {
    ev.preventDefault();
    axiosClient.post('/logout')
      .then(res => {
        setCurrentUser({});
        setUserToken(null);
        setUserRole(null);
      })
  }

  console.log('Current User' + currentUser)

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
                              onClick={(ev) => logout(ev)}
                              className={'block px-4 py-2 text-sm text-gray-700'}
                            >
                              Sign out
                            </button>
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>

                    {/**Notification */}{/*lg:hidden*/}
                    <button
                      type="button"
                      className="relative rounded-full p-1 ml-4 text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-7 w-7" aria-hidden="true" />
                    </button>
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
                            <button
                              as="a"
                              href="#"
                              onClick={(ev) => logout(ev)}
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
                 

        <div className="flex flex-col w-3/4 pd-10 ml-10 ">
          <Outlet />
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

  </>
  );
}