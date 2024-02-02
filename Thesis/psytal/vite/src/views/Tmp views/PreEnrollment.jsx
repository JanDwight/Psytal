import React,{ useState } from 'react'
import schoolLogo from "@assets/BSUlogo.png";
import date from "@assets/calendar.png";

export default function PreEnrollment() {
  const [rows, setRows] = useState([{ id: 0 }]);
  const addRow = () => {
    const newRow = { id: rows.length };
    setRows([...rows, newRow]);
  };
  const removeRow = (id) => {
    const updatedRows = rows.filter(row => row.id !== id);
    setRows(updatedRows);
  };
  const Row = ({ id }) => (
    <div className="flex mb-4">
      <div className="w-1/3 pr-3">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor={`grid-classcode-${id}`}>Class Code</label>
        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id={`grid-classcode-${id}`} type="text" placeholder=""/>
      </div>
      <div className="w-1/3 pr-3">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor={`grid-coursecode-${id}`}>Course Code</label>
        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id={`grid-coursecode-${id}`} type="text" placeholder=""/>
      </div>
      <div className="w-1/3 pr-3">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor={`grid-units-${id}`}>Units</label>
        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id={`grid-units-${id}`} type="number" placeholder=""/>
      </div>
      <div className="w-1/3">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor={`grid-bcac-${id}`}>BC/AC</label>
        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id={`grid-units-${id}`} type="text" placeholder=""/>
      </div>
      <div className="flex items-center justify-center mx-2 mt-4">
        {id > 0 && (
        <button
        type="button"
        className="ml-2 text-red-600 hover:text-red-800 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center border border-gray-600 hover:border-red-800"
        onClick={() => removeRow(id)}
        >
        <svg
          className="w-4 h-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M20 12H4"
          />
          </svg>
        </button>
     
     
     
     
      )}
      </div>
    </div>
  );
  return (
    <>
    <main >
{/**=========================== 1 ==========================*/}   
      {/** TOP */}
      <div className="w-full lg:w-8/12 px-4 container mx-auto  h-32">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0"> {/* Centered content */}
            <div className="rounded-t bg-grayGreen h-32 mb-0 px-6 py-9 items-center  "> {/**BOX  with contents*/}
              <section className='flex items-center mx-20'>
                <div className="flex items-center  ">
                  <img src={schoolLogo}
                   className="object-cover btn- h-14 w-14 rounded-full mr-2 bg-gray-300" alt="BSU Logo" />
                </div>
                <div className="flex flex-col mx-5">
                  <span className="text-sm font-bold">PRE-REGISTRATION FORM</span> 
                  <span className="text-sm font-medium">(CONTINUING/RETURNING STUDENT)</span>
                </div> 
                <div>
                  <p className="text-sm mx-6 font-semibold">Instructions: </p>
                  <p className="text-sm mx-6"> Please fill out the form in</p>
                </div>
              </section>             
            </div>
          </div>
      </div>

      {/**STUDENT DETAILS */}
      <div className="w-full lg:w-8/12 px-4 mx-auto mt-6">  
              <div className="text-center flex justify-between">
                <h6 className="text-blueGray-700 text-sm">
                    STUDENT DETAILS
                </h6>
                <button className="bg-blue-600 text-white active:bg-blue-800 font-bold uppercase text-xs px-4 py-1 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="button">
                    RESET
                </button>
              </div>
          
      </div>

{/**=========================== 2 ==========================*/}      
{/**Start of Filling the FORM */}
      <div className="w-full lg:w-8/12 px-4 container mx-auto">
        <div className='relative flex flex-col min-w-0 break-words w-full shadow-md rounded-t-lg px-4 py-5 bg-white border-0'>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0 mt-1">
            <form>
              <div className="flex flex-wrap flex-row -mx-3 mb-6">
{/** -------------------------COLUMN 1----------------------------------- */}
                {/**Type of Student*/}
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 mt-5">
                  <div>
                    <span className= "text-sm font-semibold">TYPE OF STUDENT: </span> <hr />
                    <div className="flex justify-left mx-6 ">
                      {/**Radio buttion for Continuing */}
                      <div className='mx-5 mt-2'>
                        <input className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                              type="radio"
                              name="typeofstudent"
                              id="continuing"
                              value="option1" />
                        <label
                              className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                              htmlFor="continuing">Continuing
                        </label>
                      </div>
                      {/**Radio buttion for Returnee/Readmitted */}
                      <div className='mx-5 mt-2'>
                        <input
                              className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] "
                              type="radio"
                              name="termoption"
                              id="returnee"
                              value="option2"/>
                          <label
                              className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                              htmlFor="secondsem">Returnee/ Readmitted
                          </label>
                      </div>
                    </div>
                  </div>
                  {/**Candidate for GRAD? */}
                  <div className='mt-5'>
                    <span className= "text-sm font-semibold">Candidate for graduation this semester?</span> <hr />
                    <div className="flex justify-center mx-6 mt-2">
                      {/**YES */}
                      <div className='mx-5'>
                        <div>
                          <input className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                type="radio"
                                name="availOptions"
                                id="yes"
                                value="option1"/>
                        </div>
                        <label 
                          className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer" 
                          htmlFor="yes">YES
                        </label>
                      </div>
                      {/**NO */}
                      <div className='mx-5'>
                        <div>
                          <input className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                type="radio"
                                name="availOptions"
                                id="no"
                                value="option2"/>
                        </div>
                        <label 
                          className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer" 
                          htmlFor="no">NO
                        </label>
                      </div>
                    </div>
                  </div>
                  {/**End of Term */}
                  <div className='mt-5'>
                    <span className= "text-sm font-semibold">End of Term to Finish Degree Program:</span> <hr />
                    <input className="mt-2 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="end-of-term" type="text" placeholder=""/>
                  </div>
                  {/**Status */}
                  <div>
                  <span className= "text-sm font-semibold">Status:</span> <hr />
                    <div className="flex justify-center mx-6 mt-2">
                      {/**REGULAR */}
                      <div className='mx-5'>
                        <div>
                          <input className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                type="radio"
                                name="statusOptions"
                                id="regular"
                                value="option1"/>
                        </div>
                        <label 
                          className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer" 
                          htmlFor="regular">Regular
                        </label>
                      </div>
                      {/**IRREGULAR */}
                      <div className='mx-5'>
                        <div>
                          <input className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                type="radio"
                                name="statusOptions"
                                id="irregular"
                                value="option2"/>
                        </div>
                        <label 
                          className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer" 
                          htmlFor="irregular">Irregular
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
{/**-------------------------COLUMN2-------------------------- */}
                {/**TERM */}
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 mt-5">
                  <div >
                    <span className= "text-sm font-semibold">TERM: </span> <hr />
                    <div className="flex justify-center mx-6 mt-2">
                      {/**Radio buttion for 1st Sem */}
                      <div className='mx-5'>
                        <input className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                              type="radio"
                              name="typeofstudent"
                              id="firstsem"
                              value="option1" />
                        <label
                              className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                              htmlFor="continuing">1st Semeter
                        </label>
                      </div>
                      {/**Radio buttion for 2nd Sem */}
                      <div className='mx-5'>
                        <input
                              className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] "
                              type="radio"
                              name="termoption"
                              id="secondsem"
                              value="option2"/>
                          <label
                              className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                              htmlFor="secondsem">2nd Semester
                          </label>
                      </div>
                      {/**Radio button for Mid-year */}
                      <div className='mx-5'>
                        <input
                              className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] "
                              type="radio"
                              name="termoption"
                              id="midyear"
                              value="option3"/>
                          <label
                              className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                              htmlFor="midyear">Mid-year
                          </label>
                      </div>
                    </div>
                  </div>
                  
                  
                  {/**School Year */}
                  <div className='mt-5'>
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mt-3 mb-2" htmlFor="grid-schoolyear">
                          School year :
                        </label> <hr />
                        <div className="flex items-center mt-2">
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                              <img src={date} className='h-5 w-5'/>
                            </div>
                            <input
                              name="start"
                              type="number" 
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                              placeholder="20-"
                              min="2000" // Minimum year
                              max="2099" // Maximum year
                              step="1" // Year step
                            />
                          </div>
                          <span className="mx-4 text-gray-500">to</span>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                              <img src={date} className='h-5 w-5'/>
                            </div>
                            <input
                              name="end"
                              type="number" 
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 "
                              placeholder="20-"
                              min="2000" 
                              max="2099" 
                              step="1" 
                            />
                          </div>
                        </div>
                  </div>

                  {/**Year Level */}
                  <div className='mt-5'>
                    <label className="text-sm font-semibold" htmlFor="grid-yearlevel">
                          Year Level :
                        </label> <hr />
                    <input name="yearlevel"
                              type="number" 
                              className="bg-gray-50 border border-gray-300 mt-2 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 "
                              placeholder=""
                              min="0" 
                              max="99" 
                              step="1"/>
                  </div>
                  {/**Curriculum Used */}
                  <div className='mt-5'>
                    <label className="text-sm font-semibold" htmlFor="grid-yearlevel">
                          Curriculum Used:
                        </label> <hr />
                    <input className="mt-2 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="curriculum-used" type="text" placeholder=""/>
                  </div>
                </div> {/**END for Column 2 or TERMS*/}

              </div> {/**END for Type student to Term */}

  {/**------------------------------------------------------------------ */}
  <hr />
              <div className="flex flex-wrap flex-row -mx-3 mb-6">
                {/*column1*/}
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 mt-5">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-studentID">
                        student id no :
                      </label>
                      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-studentID" type="number" placeholder=""/>
                    
                       <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-degree">
                        Degree Program :
                        </label> {/*For backend the default value will be coming from the database*/}
                      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-degree" type="text" value="Bachelor of Science in Psychology" disabled readOnly/>
                    </div>
                    {/*column2*/}
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 mt-5">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-lrn">
                        learner's reference number (lrn) :
                      </label>
                      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-lrn" type="number" placeholder=""/>
                      
                       <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-major">
                        major, if applicable :
                        </label>
                      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-major" type="text" placeholder="(optional)"/>
                    </div>
              </div>
            </form>
          </div>
        </div>
      </div>

{/**=========================== 3 ==========================*/}   
      {/*STUDENT PERSONAL DETAILS*/}
      <div className="w-full lg:w-8/12 px-4 mx-auto mt-6">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
       
              {/*Main Container*/}
              <div className="shadow-md rounded-t-lg px-4 py-5 bg-white">
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0 mt-5">
                  <form>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      {/*column1*/}
                      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 mt-5">
                        <label className=" text-gray-700 text-xs font-bold mb-2" htmlFor="grid-familyname">Family Name :</label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-familyname" type="text" placeholder=""/>
                    
                        <label className=" text-gray-700 text-xs font-bold mb-2" htmlFor="grid-middlename">Middle Name :</label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-middlename" type="text" placeholder=""/>

                        <label className=" text-gray-700 text-xs font-bold mb-2" htmlFor="grid-birthdate">Date of Birth :</label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-birthdate" type="text" placeholder=""/>
                    
                        <label className=" text-gray-700 text-xs font-bold mb-2" htmlFor="grid-homeaddress">Home Address :</label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-homeaddress" type="text" placeholder=""/>
                    
                        <label className=" text-gray-700 text-xs font-bold mb-2" htmlFor="grid-contactnumber">Contact Number :</label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-contactnumber" type="number" placeholder=""/>
                    
                      </div>
                      {/*column2*/}
                      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 mt-5">
                        <label className=" text-gray-700 text-xs font-bold mb-2" htmlFor="grid-givenname">
                          Given Name :
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-givenname" type="text" placeholder=""/>
                      
                        <label className=" text-gray-700 text-xs font-bold mb-2" htmlFor="maidenname">
                          Maiden Name :
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-maidenname" type="text" placeholder=""/>
                    
                        <label className=" text-gray-700 text-xs font-bold mb-2" htmlFor="nationality">
                          Citizenship/Nationality :
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-nationality" type="text" placeholder=""/>
                    
                        <label className=" text-gray-700 text-xs font-bold mb-2" htmlFor="studyaddress">
                          Address while studying at BSU :
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-studyaddress" type="text" placeholder=""/>
                    
                        <label className=" text-gray-700 text-xs font-bold mb-2" htmlFor="emailaddress">
                          Email Address :
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-emailaddress" type="text" placeholder=""/>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
{/**=========================== 4 ==========================*/}   
          {/*Emergency Contact*/}
          <div className="w-full lg:w-8/12 px-4 mx-auto mt-6">
            <p className="text-normal mx-5">EMERGENCY CONTACT (Person to be contacted in case of emergency)</p>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
              <div className="shadow-md rounded-t-lg px-4 py-5 bg-white">
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0 mt-5">
                  <form>
                
                    <div className="flex flex-wrap -mx-3 mb-6">
                      {/*column1*/}
                      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 mt-5">
                        <label className=" text-gray-700 text-xs font-bold mb-2" htmlFor="grid-contactname">Name :</label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-contactname" type="text" placeholder=""/>
                    
                        <label className=" text-gray-700 text-xs font-bold mb-2" htmlFor="grid-address">Address :</label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-address" type="text" placeholder=""/>
                      </div>
                      {/*column2*/}
                      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 mt-5">
                        <label className=" text-gray-700 text-xs font-bold mb-2" htmlFor="grid-contactnum">
                          Contact Number :
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-contactnum" type="text" placeholder=""/>
                      
                        <label className=" text-gray-700 text-xs font-bold mb-2" htmlFor="grid-relationship">
                          Relationship :
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-relationship" type="text" placeholder=""/>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
{/**=========================== 5 ==========================*/} 
          {/**AT the college of Academic Institute */}
          <div className="w-full lg:w-8/12 px-4 mx-auto mt-6">
            <p className="text-normal mx-5">AT THE COLLEGE OR ACADEMIC INSTITUTE</p>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
              <div className="shadow-md rounded-t-lg px-4 py-5 bg-white">
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0 mt-5">
                  <form>
                    {/**FOR regular Student COL */}
                    <div className="flex items-center">
                      <p>For Regular students :</p>
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mx-2" htmlFor="section">Section:</label>
                      <select className="block appearance-none bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="section">
                          <option>A</option>
                          <option>B</option>
                          <option>C</option>
                      </select>
                      <p className="ml-3">(no need to specify classcode for all courses).</p>    
                    </div> 
                    {/**FOR Irregular student col */}
                    <div className="flex items-center">
                      <p> <label className='font-semibold'>For Irregular students: </label>
                        <label> indicate class codes for all courses to be enrolled in the boxes below:</label>
                      </p>  
                    </div>
                    {/**Note */}
                    <hr/> 
                    <div className="flex items-center">
                      <p> <label className='font-semibold'>Note: </label>
                        <label> If the course you are enrolling is a <a className='font-semibold'>back course/ subject </a>
                                write <a className='font-semibold'>BC, </a> and if it is an <a className='font-semibold'>advanced subject/ course </a>
                                write <a className='font-semibold'>AC.</a>
                        </label>
                      </p>   
                    </div>
                    <hr/> 

                    {/**Col Adding SUb */}
                    <div className="flex flex-wrap -mx-3 my-5 m-2">
                      <div className="flex flex-wrap -mx-3 my-5 m-2">
                      <Row id={0} />
                      {rows.slice(1).map(row => (<Row key={row.id} id={row.id} /> ))} 
                        {/**ADD */}
                        <div className="flex items-center justify-center mx-4 my-4 ml-14">
                            <button
                              type="button"
                              className="text-gray-600 border border-gray-600 hover:bg-gray-800 hover:text-white rounded-full p-2.5 text-center inline-flex items-center"
                              onClick={addRow}
                              >
                              <svg
                                className="w-4 h-4"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                />
                              </svg>
                            </button>
                        </div>
                        {/**Total Unit */}
                        <div className="w-full md:w-64 px-5 ml-56">
                              <label
                                className="text-gray-700 text-xs font-bold mb-2 block"
                                htmlFor="grid-totalunits"
                              >
                                Total Units :
                              </label>
                              <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-totalunits"
                                type="text"
                                placeholder=""
                              />
                            </div> 
                        
                      </div>
                    </div>
                    {/**AVail Free Higher EDU? */}
                    <div className="flex-col mx-4">
                      <p>Will you avail of the free higher education benefit?</p>
                      
                      <div className="flex justify-center mx-6">
                        {/*YES*/}
                        <div className="mb-[0.125rem] mr-5 inline-block min-h-[1.5rem]">
                        <input
                            className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                            type="radio"
                            name="availOptions"
                            id="yes"
                            value="option1"
                        />
                        <label
                            className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer" htmlFor="yes">YES</label>
                        </div>
                          {/*NO*/}
                          <div className="mb-[0.125rem] mr-4 inline-block min-h-[1.5rem] pl-[1.5rem]">
                            <input
                              className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] "
                              type="radio"
                              name="availOptions"
                              id="no"
                              value="option2"/>
                            <label
                              className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                              htmlFor="no">NO
                            </label>
                          </div>
                          {/*YES with contrib*/}
                          <div className="mb-[0.125rem] inline-block min-h-[1.5rem] pl-[1.5rem]">
                            <input
                              className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] disabled:opacity-60"
                              type="radio"
                              name="availOptions"
                              id="voluntary"
                              value="option3"/>
                            <label
                                className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                                htmlFor="voluntary">YES, with VOLUNTARY CONTRIBUTION
                            </label>
                            <p>Reason:</p>
                            <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                              <input
                              className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                              type="radio"
                              name="reason"
                              id="optout"
                              />
                              <label
                                className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                                htmlFor="optout">
                                I will pay my tuition fee (Opt-out)
                              </label>
                            </div>
                            <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                              <input
                                className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                type="radio"
                                name="reason"
                                id="unqualified"
                                defaultChecked
                                />
                              <label
                                className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                                htmlFor="unqualified">
                                Not qualified
                              </label>
                            </div>
                          </div> {/**End col for yes volun */}
                      </div> {/**END for yes to yes voluntary */}
                    </div>

                  </form>
                </div>

                <p className="text-sm italic mx-5">Please certify that the above information are true and correct!</p>

              </div>
            </div> {/**end of the coollege or acad insti */}
            <div className="text-center flex justify-end my-8">
                 <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 mr-6 rounded-full">Cancel</button>
                 <button className="bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded-full">Submit</button>
                 </div>
          </div>
          
    </main>

    
    </>
  )
}
 