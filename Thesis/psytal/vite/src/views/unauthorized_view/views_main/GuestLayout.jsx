import { Fragment } from 'react';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { NavLink, Navigate, Outlet } from 'react-router-dom';
import { useStateContext } from '../../../context/ContextProvider';
import { useState, useEffect } from 'react';
import logo from "@assets/PsychCircle.png";
import axiosClient from '../../../axios';

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
  
  const dynamicNavigation = isPreRegOpen === 0
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

  return (
    <>
      <div>
        <header>
        <Disclosure as="nav" className="fixed h-[20%] w-[100%] z-20 bg-gray-600">
          {({ open }) => (
            <>
            {/* 1st Header */}
            <div  className="bg-viridian w-[100%]"> 
              <div className="flex justify-center space-x-5 px-10 py-2">
                <div className="flex items-center">
                  <a href="/landingpage">
                    <img
                      className="h-20 w-20"
                      src={logo}
                      alt="Department of Psychology"
                    />
                  </a>
                  <div className="flex items-center px-10">
                    <p className="font-semibold text-3xl ml-2 font-franklin text-white">
                      DEPARTMENT OF PSYCHOLOGY PORTAL
                    </p>
                  </div>
                </div>
                </div>
                </div>
              {/* 2nd Header */}
                <div className="flex justify-center items-center px-10 py-2 bg-[#739072]">
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

      <div>
        <main>
          <div className='h-[100%] w-[100%] py-[1%]'>
            <Outlet/>
          </div>
        </main>
      </div>
    </>
  );
}
