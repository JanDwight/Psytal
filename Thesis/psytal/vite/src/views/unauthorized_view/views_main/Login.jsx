import { useState, useEffect } from 'react'
import axiosClient from '../../../axios';
import { useStateContext } from '../../../context/ContextProvider';
import PsychLogo from '../../../assets/PsychCircle.png';
import ReactModal from 'react-modal';
import InputEmail from '../views_components/Forgot_Password/InputEmail';

export default function Login() {
  const {setCurrentUser, setUserToken, setUserRole} = useStateContext();
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({__html: ""});
  const [userRole, currentUser, userToken] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [displayTime, setDisplayTime] = useState(false);
  const [countdown, setCountdown] = useState(180); // Set the countdown time in seconds (3 minutes)

  //This is for the 3 attempts
  useEffect(() => {
    let timer;

    if (attempts === 3) {
      setDisplayTime(true);

      timer = setInterval(() => {
        setCountdown((prevCountdown) => Math.max(0, prevCountdown - 1)); // Ensure countdown doesn't go below 0

        if (countdown === 0) {
          window.location.reload();
          setDisplayTime(false);
        }
      }, 1000);
    } else {
      setDisplayTime(false);
      setCountdown(180); // Reset the countdown when attempts are not equal to 3
    }

    return () => {
      clearInterval(timer);
    };
  }, [attempts, countdown]);
  //-------------------------------------------------------------------------
  
  const onSubmit = (ev) => {
    ev.preventDefault();
    setError({ __html: "" });

    axiosClient
    .post('/login', {
      name: fullName,
      password,
    })
    .then(({ data }) => {
      setCurrentUser(data.user_name)
      setUserToken(data.token)
      setUserRole(data.role)
    })
    .catch(( error ) => {
      if (error.response && error.response.status === 401) {
        setError({ __html: "Username or Password is incorrect. Please try again later." });
      } else {
        setError({ __html: "Username or Password is incorrect. Please try again." });
      }

      setAttempts(attempts + 1)
      
    });
  };

  

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
    
  };

  return (
    <>
      <div className="flex min-h-[100%] flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-[100%] sm:max-w-sm">
        <div className="box-border md:box-content rounded-3xl bg-gradient-to-r from-[#739072]/80 via-gray-400/80 to-[#739072]/80 p-9 shadow-2xl">
          <img
            className="mx-auto h-20 w-auto"
            src={PsychLogo}
            alt="psychology logo"
          />
          <h2 className="mt-3 text-center text-2xl font-franklin leading-9 tracking-tight text-gray-900">
            Login to PSYTAL
          </h2>

          <form onSubmit={onSubmit} className="space-y-6" action="#" method="POST"> 
            <div>
              <label htmlFor="fullName" className="mt-5 block text-sm font-medium leading-6 text-gray-900">
                Full Name
              </label>
              <div className="mt-2"> 
                <input
                 placeholder={userToken}
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="fullName"
                  required
                  value={fullName}
                  onChange={ev => setFullName(ev.target.value)}
                  className="block w-[100%] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>

              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type={isVisible ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={ev => setPassword(ev.target.value)}
                  className="block w-[100%] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <div>
                  <label onClick={toggleVisibility} className='text-blue-400 text-sm text px-2 mb-2'>
                    {isVisible ? "Hide Password" : "Show Password"}
                  </label>
                </div>
              </div>
              {error.__html && (
            <div className='bg-red-500 rounded py-2 px-2 text-white' dangerouslySetInnerHTML={error}></div>
          )}
            </div>
            <div className="text-sm">
            <label onClick={() => setIsModalOpen(true)} className="font-semibold text-indigo-600 hover:text-indigo-500">
              Forgot password?
            </label>
            </div>
            <div>
            <button
        type="submit"
        className={`flex w-[100%] justify-center rounded-md ${
          attempts === 3 ? 'bg-gray-500' : 'bg-[#397439]'
        } px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#367E18] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
        disabled={attempts === 3 && countdown > 0} // Disable the button when attempts are 3 and countdown is not zero
        onClick={onSubmit}
      >
                Sign in
              </button>
              {attempts === 3 && displayTime && (
        <p className="text-sm text-gray-600 mt-2">
          Please wait {Math.floor(countdown / 60)}:{countdown % 60} before trying again.
        </p>
      )}
            </div>
          </form>
          </div>

        </div>
      </div>

      <ReactModal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            className="w-[100%] md:w-[30%] h-fit bg-gray-300 rounded-3xl ring-1 ring-black shadow-2xl mt-[10%] mx-auto p-2"
        >
            <div>
                <InputEmail
                 closeModal={() => setIsModalOpen(false)}/>
            </div>
      </ReactModal>

    </>
  )
}