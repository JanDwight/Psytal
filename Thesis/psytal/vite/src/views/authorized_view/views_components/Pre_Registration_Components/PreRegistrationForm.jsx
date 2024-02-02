import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

import schoolLogo from "@assets/BSUlogo.png";
import info from "@assets/info.png";
import date from "@assets/calendar.png";
import axiosClient from '../../../../axios';
import "../../../../../src/styles.css";


export default function PreRegistrationForm() {
  
  const [error, setError] = useState({__html: ""});
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  //variables for the user inputs
  const [startOfSchoolYear, setStartOfSchoolYear] = useState('');
  const [endOfSchoolYear, setEndOfSchoolYear] = useState('');   
  const [studentSchoolId, setStudentSchoolId] = useState(''); 
  const [learnersReferenceNumber, setLearnersReferenceNumber] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [maidenName, setMaidenName] = useState('');
  const [academicClassification, setAcademicClassification] = useState('');
  const [lastSchoolAttended, setLastSchoolAttended] = useState('');
  const [addressOfSchoolAttended, setAddressOfSchoolAttended] = useState('');
  const [degree, setDegree] = useState('Bachelor of Science in Psychology');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [citizenship, setCitizenship] = useState('');
  const [ethnicity, setEthnicity] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [placeOfBirth, setPlaceOfBirth] = useState('');
  const [sexAtBirth, setSexAtBirth] = useState('');
  const [specialNeeds, setSpecialNeeds] = useState('');
  const [email, setEmail] = useState('');
  const [homeAddress, setHomeAddress] = useState('');
  const [addressWhileStudyingAtBsu, setAddressWhileStudyingAtBsu] = useState('');
  const [emergencyContactName, setEmergencyContactName] = useState('');
  const [emergencyContactAddress, setEmergencyContactAddress] = useState('');
  const [emergencyContactNumber, setEmergencyContactNumber] = useState('');
  const [relationship, setRelationship] = useState('');
  const [healthfacilityregistered, sethealthfacilityregistered] = useState('');
  const [parenthealthfacilitydependent, setparenthealthfacilitydependent] = useState('');
  const [vaccinationstatus, setvaccinationstatus] = useState('Not Vaccinated');
  const [technologylevel, settechnologylevel] = useState('');
  const [digitalliteracy, setdigitalliteracy] = useState('');
  const [availfreehighereducation, setavailfreehighereducation] = useState('');
  const [voluntarycontribution, setvoluntarycontribution] = useState('');
  const [contributionamount, setcontributionamount] = useState('');
  const [compliedtoadmissionpolicy, setcompliedtoadmissionpolicy] = useState('No');
  const [userId, setUserId] = useState('1');

  //clearing the input fields using the reset button
  const handleClear = () => {
    setStartOfSchoolYear('');
    setEndOfSchoolYear('');
    setStudentSchoolId('');
    setLearnersReferenceNumber('');
    setLastName('');
    setFirstName('');
    setMiddleName('');
    setMaidenName('');
    setAcademicClassification('');
    setLastSchoolAttended('');
    setAddressOfSchoolAttended('');
    setDateOfBirth('');
    setCitizenship('');
    setEthnicity('');
    setContactNumber('');
    setPlaceOfBirth('');
    setSexAtBirth('');
    setSpecialNeeds('');
    setEmail('');
    setHomeAddress('');
    setAddressWhileStudyingAtBsu('');
    setEmergencyContactName('');
    setEmergencyContactAddress('');
    setEmergencyContactNumber('');
    setRelationship('');
    sethealthfacilityregistered('');
    setparenthealthfacilitydependent('');
    setvaccinationstatus('Not Vaccinated');
    settechnologylevel('');
    setdigitalliteracy('');
    setavailfreehighereducation('');
    setvoluntarycontribution('');
    setcontributionamount('');
  }
  //the onSubmit function
  const onSubmit = (ev) => {
    ev.preventDefault();
    setError({ __html: "" });

    // if (
    //   !startOfSchoolYear ||
    //   !endOfSchoolYear ||
    //   !studentSchoolId ||
    //   !learnersReferenceNumber ||
    //   !lastName ||
    //   !firstName ||
    //   !middleName ||
    //   !academicClassification ||
    //   !lastSchoolAttended ||
    //   !addressOfSchoolAttended ||
    //   !dateOfBirth ||
    //   !citizenship ||
    //   !ethnicity ||
    //   !contactNumber ||
    //   !placeOfBirth ||
    //   !sexAtBirth ||
    //   !email ||
    //   !homeAddress ||
    //   !addressWhileStudyingAtBsu ||
    //   !emergencyContactName ||
    //   !emergencyContactAddress ||
    //   !emergencyContactNumber ||
    //   !relationship ||
    //   !healthfacilityregistered ||
    //   !parenthealthfacilitydependent ||
    //   !technologylevel ||
    //   !digitalliteracy ||
    //   !availfreehighereducation ||
    //   !voluntarycontribution ||
    //   !contributionamount
    // ) {
    //   setError({
    //     __html: "Please fill in all required fields."
    //   });
    //   return;
      // setSuccessMessage({
      //   message: 'Please fill in all required fields.',
      // });
      
    //   // return;
    // }

    axiosClient
    .post('/preregincommingtmp', {
      start_of_school_year: parseInt(startOfSchoolYear, 10),
      end_of_school_year: parseInt(endOfSchoolYear, 10),
      user_id: parseInt(userId),
      student_school_id: parseInt(studentSchoolId, 10),
      learners_reference_number: parseInt(learnersReferenceNumber, 10),
      last_name: lastName,
      first_name: firstName,
      middle_name: middleName,
      maiden_name: maidenName,
      academic_classification: academicClassification,
      last_school_attended: lastSchoolAttended,
      address_of_school_attended: addressOfSchoolAttended,
      degree: degree,
      date_of_birth: dateOfBirth,
      place_of_birth: placeOfBirth,
      citizenship: citizenship,
      sex_at_birth: sexAtBirth,
      ethnicity: ethnicity,
      special_needs: specialNeeds,
      contact_number: parseInt(contactNumber, 10),
      email_address: email,
      home_address: homeAddress,
      address_while_studying: addressWhileStudyingAtBsu,
      contact_person_name: emergencyContactName,
      contact_person_number: parseInt(emergencyContactNumber, 10), //theres an error here--doesnt accept multiple numbers
      contact_person_address: emergencyContactAddress,
      contact_person_relationship: relationship,
      health_facility_registered: healthfacilityregistered,
      parent_health_facility_dependent: parenthealthfacilitydependent,
      vaccination_status: vaccinationstatus,
      technology_level: technologylevel,
      digital_literacy: digitalliteracy,
      avail_free_higher_education: availfreehighereducation,
      voluntary_contribution: voluntarycontribution,
      contribution_amount: contributionamount,
      complied_to_admission_policy: compliedtoadmissionpolicy,
      pre_reg_status: 'Pending',
      type_of_student: 'Incoming',
      student_status: 'Regular',
      year_level: '1st Year',
      
    })
    .then(({ data }) => {
      //setFamilyName(data.family_name)

      // Check if any required field is empty
  
  
      setSuccessMessage({
        message: 'You have submitted your pre-registration form successfully!\n Please check your email within zero to three (0-3) working days \n for further instructions.',
      });

      setTimeout(() => {
        setSuccessMessage(null);
        handleClear();
        navigate('/landingpage');
        closeModal();
      }, 3000);


    })
    .catch(( error ) => {
      if (error.response) {
        const finalErrors = Object.values(error.response.data.errors).reduce((accum, next) => [...accum,...next], [])
        setError({__html: finalErrors.join('<br>')})
      }
        console.error(error)
    });
  };
  
  return (
    <>
        {error.__html && (
        <div className='bg-red-500 rounded py-2 px-2 text-white'
          dangerouslySetInnerHTML={error}>
        </div>)}
        
    <main className="w-[100%] h-[100%] py-[10%]">
      <div className="lg:w-8/12 mx-auto px-4 container">          
        <div className="rounded-t bg-grayGreen mb-0 px-6 py-9 items-center  "> {/**BOX  with contents*/}
          <section style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div >
              <img src={schoolLogo}
                className="object-cover btn- h-20 w-20 rounded-full bg-gray-300" alt="BSU Logo" />
            </div>
            <div className="flex flex-col justify-between pl-10">
              <span className="text-sm font-bold">PRE-REGISTRATION FORM</span> 
              <span className="text-sm">(NEW FIRST YEAR STUDENT)</span>
              <p className="text-sm font-semibold">Instructions: </p>
              <p className="text-sm italic"> Please fill out the form in</p>
            </div> 
          </section>             
        </div>          
      </div>

      {/**STUDENT DETAILS */}
      <div className="lg:w-8/12 px-4 mx-auto mt-6">  
              <div className="text-center flex justify-between">
                <h6 className="text-blueGray-700 text-sm">
                    STUDENT DETAILS
                </h6>
                <button className="bg-blue-600 text-white active:bg-blue-800 font-bold uppercase text-xs px-4 py-1 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" 
                        type="button"
                        onClick={handleClear}>
                    RESET
                </button>
              </div>         
      </div>
      {/**=========================== 2 ==========================*/}      
      {/**Start of Filling the FORM */}
      
      <div className="w-full lg:w-8/12 px-4 container mx-auto">
        <form onSubmit={onSubmit} action="#" method="POST">
          <div className='relative flex flex-col min-w-0 break-words w-full shadow-md rounded-t-lg px-4 py-5 bg-white border-0'>
            <div className="flex-auto px-4 lg:px-10 py-5 pt-0 mt-1">
              
                {/**=========================== SchoolYear - Date ==========================*/}  
                <div className="flex flex-wrap flex-row px-3 -mx-3 mb-3">               
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 mt-5">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mt-2 mb-2" htmlFor="grid-schoolyear">
                      Semester :
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                     value= "First Semester"
                     />
                  </div>
                  
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 mt-5">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mt-2 mb-2" htmlFor="grid-schoolyear">
                      School Year :
                    </label>
                    <div className="flex items-center mt-2 pl-3">
                      <div className="relative w-fit">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <img src={date} className='h-5 w-5'/>
                        </div>
                        
                        <input //Update this to automatically set the min to current year and max to 5 yeas after for better user experience
                          name="start"
                          type="text" 
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                          pattern="\d{0,4}"
                          placeholder="20XX"
                          min="2000" // Minimum year
                          max="2099" // Maximum year
                          step="1" // Year step
                          maxLength={4}
                          value={startOfSchoolYear}
                          onChange= {ev => {
                              // Ensure that only numeric values are entered
                              const value = ev.target.value.replace(/\D/g, '');
                              setStartOfSchoolYear(value);
                              setEndOfSchoolYear(parseInt(value) + 1);}}
                        />
                      </div>
                      <span className="mx-4 text-gray-500">to</span>
                      <div className="relative w-fit">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <img src={date} className='h-5 w-5'/>
                        </div>
                        <input
                          name="end"
                          type="text"  
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 "
                          pattern="\d{0,4}"
                          placeholder="20XX"
                          min="2000" 
                          max="2099" 
                          step="1" 
                          maxLength={4}
                          value={endOfSchoolYear}
                          onChange={ev => {
                              // Ensure that only numeric values are entered
                              const value = ev.target.value.replace(/\D/g, '');
                              setEndOfSchoolYear(value);
                              setStartOfSchoolYear(parseInt(value) - 1);}}
                        />
                      </div>
                    </div>
                  </div>                 
                </div> <hr />

                {/**=========================== Student ID - LRN ==========================*/} 
                <div className="flex flex-wrap flex-row -mx-3 mb-2">
                      {/*column1*/}
                      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 mt-5">
                      <div className="input-container relative">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-studentID">
                          student id no :
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="grid-studentID"
                        type="text"
                        pattern="\d{0,7}"
                        title="Input numeric characters only. (0 to 9)"
                        inputmode="numeric"
                        maxLength={7}
                        value={studentSchoolId}
                        onChange={ev => {
                          // Ensure that only numeric values are entered
                          const value = ev.target.value.replace(/\D/g, '');
                          setStudentSchoolId(value);}}
                        />
                        <img
                        src={info}
                        alt="info"
                        className="absolute right-3 top-[50%] h-6 w-6"
                        title="Input numeric characters only. (0 to 9)"
                      />
                        </div>                          
                      </div>
                      {/*column2*/}
                      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 mt-5">
                      <div className="input-container relative">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-lrn">
                          learner's reference number (lrn) :
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="grid-lrn"
                        type="text"
                        pattern="\d{0,12}"
                        title="Input numeric characters only. (0 to 9)"
                        inputmode="numeric"
                        maxLength={12}
                        value={learnersReferenceNumber}
                        onChange={ev => {
                          const value = ev.target.value.replace(/\D/g, '');
                          setLearnersReferenceNumber(value);}}
                        />        
                        <img
                        src={info}
                        alt="info"
                        className="absolute right-3 top-[50%] h-6 w-6"
                        title="Input numeric characters only. (0 to 9)"
                      />
                        </div> 
                      </div>
                </div> 

                {/**=========================== Last Name - Madain Name ==========================*/} 
                <div className="flex flex-wrap flex-row -mx-3 mb-2">
                  {/**column1 */}
                  <div className="w-full md:w-[33.33%] px-3 mb-6 md:mb-0 mt-2">
                  <div className="input-container relative">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-studentLastname">
                      Last Name :
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-studentLastname"
                    type="text"
                    pattern="[a-zA-Z .]+"
                    title="Input your Legal Last Name with your Suffix, if applicable."
                    value={lastName}
                    maxLength={30}
                    onChange={ev => {
                      const value = ev.target.value.replace(/[^A-Za-z .]/g, '');
                      setLastName(value);
                    }}
                   />  
                   <img
                        src={info}
                        alt="info"
                        className="absolute right-3 top-[50%] h-6 w-6"
                        title="Input your Legal Last Name with your Suffix, if applicable."
                      />
                  </div>
                  </div>
                  {/**column2 */}
                  <div className="w-full md:w-[33.33%] px-3 mb-6 md:mb-0 mt-2">
                  <div className="input-container relative">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-studentFirstname"
                      >
                        First Name:
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white pr-10"
                        id="grid-studentFirstname"
                        type="text"
                        pattern="[a-zA-Z .]+"
                        title="Input your Legal Given Name/s."
                        value={firstName}
                        maxLength={50}
                        onChange={ev => {
                          const value = ev.target.value.replace(/[^A-Za-z .]/g, '');
                          setFirstName(value);
                        }}
                      />
                      <img
                        src={info}
                        alt="info"
                        className="absolute right-3 top-[50%] h-6 w-6"
                        title="Input your Legal Given Name/s."
                      />
                  </div>
                  </div>
                  {/**column3 */}
                  <div className="w-full md:w-[33.33%] px-3 mb-6 md:mb-0 mt-2">
                  <div className="input-container relative">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-studentMiddlename">
                      Middle Name :
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-studentMiddlename" 
                    type="text" 
                    pattern="[a-zA-Z ]+"
                    title="Input your Legal Middle Name. Leave blank if not applicable."
                    value={middleName}
                    maxLength={30}
                    onChange={ev => {
                      const value = ev.target.value.replace(/[^A-Za-z ]/g, '');
                      setMiddleName(value);
                    }}
                    />  
                     <img
                        src={info}
                        alt="info"
                        className="absolute right-3 top-[50%] h-6 w-6"
                        title="Input your Legal Middle Name. Leave blank if not applicable."
                      />
                  </div>
                  </div>
                  {/** */}
                  <div className="w-full px-3 mb-6 md:mb-0 mt-2">
                  <div className="input-container relative">
                    <label className='text-xs' htmlFor="grid-studentMaidenname">
                      <strong className="block tracking-wide text-gray-700 text-xs font-bold mb-2">MAIDEN NAME : (For female students, if married)</strong>
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-studentMaidenname" 
                    type="text" 
                    //pattern="[^a-zA-Z\s/]+"
                    title="Input 'N/A' if not applicable."
                    value={maidenName}
                    maxLength={30}
                    onChange={ev => {
                      const value = ev.target.value.replace(/[^a-zA-Z\s/]/g, '');
                      setMaidenName(value);
                    }}
                    />  
                    <img
                        src={info}
                        alt="info"
                        className="absolute right-3 top-[50%] h-6 w-6"
                        title="Input 'N/A' if not applicable."
                    />

                  </div>
                  </div>
                </div> <hr />
                
                {/**=========================== Academic Classification: Radio Buttons ==========================*/}
                {/**re-do the implementation of the radio button */} 
                <div className="flex flex-wrap flex-row -mx-3 mb-2">
                  <div className="w-full px-3 mb-6 md:mb-0 mt-2">
                    <label className= "text-sm font-semibold">ACADEMIC CLASSIFICATION: 
                    </label>
                  </div>
                      
                  <div className="w-full px-3 md:mb-0 flex flex-wrap flex-row mb-2">
                    {/**Radio buttion for SHS graduate */}
                    <div className='mx-5 mt-2'>
                      <input className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s]  dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                        type="radio"
                        name="typeofacadclass"
                        id="shsgraduate"
                        checked={academicClassification === 'SHS graduate'}
                        value="SHS graduate" 
                        onChange={ev => setAcademicClassification(ev.target.value)}
                        
                        />
                        <label
                          className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                          htmlFor="continuing">Senior High School Graduate
                        </label>
                    </div>

                    {/**Radio buttion for HS graduate */}
                    <div className='mx-5 mt-2'>
                      <input
                        className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s]  dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                        type="radio"
                        name="typeofacadclass"
                        id="hsgraduate"
                        value="HS graduate"
                        checked={academicClassification === 'HS graduate'}
                        onChange={ev => setAcademicClassification(ev.target.value)}
                        />
                      <label
                        className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                        htmlFor="secondsem">High School Graduate
                      </label>
                    </div>

                    {/**Radio buttion for ALS completer */}
                    <div className='mx-5 mt-2'>
                      <input
                        className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s]  dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                        type="radio"
                        name="typeofacadclass"
                        id="alscompleter"
                        value="ALS completer"
                        checked={academicClassification === 'ALS completer'}
                        onChange={ev => setAcademicClassification(ev.target.value)}
                        />
                      <label
                        className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                        htmlFor="secondsem">Alternative Learning System (ALS) Completer
                      </label>
                    </div>
                  </div>
                </div> <hr />

                {/**=========================== Last School Attended - Degree Program ==========================*/} 
                <div className="flex flex-wrap flex-row -mx-3 mb-2">
                  <div className="w-full px-3 mb-6 md:mb-0 mt-4">
                  <div className="input-container relative">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-lastschoolattended">
                      Last School Attended :
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-lastschoolattended" 
                    type="text" 
                    pattern="[a-zA-Z ]+"
                    title="Do not abbreviate."
                    value={lastSchoolAttended}
                    minLength={10}
                    onChange={ev => {
                      const value = ev.target.value.replace(/[^A-Za-z ]/g, '');
                      setLastSchoolAttended(value);
                    }}
                    />  
                    <img
                        src={info}
                        alt="info"
                        className="absolute right-3 top-[50%] h-6 w-6"
                        title="Do not abbreviate."
                      />
                  </div>
                  </div>
                  <div className="w-full px-3 mb-6 md:mb-0 mt-2">
                  <div className="input-container relative">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-addresslastschoolattended">
                      Address of School Attended :
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-addresslastschoolattended" 
                    type="text"
                    title="Input the school address using the format given. FORMAT: Bldg No., Street, Barangay, City/Municipality"
                    placeholder="Bldg No., Street, Barangay, City/Municipality"
                    value={addressOfSchoolAttended}
                    onChange={ev => setAddressOfSchoolAttended(ev.target.value)}/>  
                    <img
                        src={info}
                        alt="info"
                        className="absolute right-3 top-[50%] h-6 w-6"
                        title="Input the school address using the format given. FORMAT: Bldg No., Street, Barangay, City/Municipality"
                      />
                  </div>
                  </div>
                  <div className="w-full px-3 mb-6 md:mb-0 mt-2">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-degreeprogram">
                      Degree/Program :
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-degreeprogram" 
                    type="text" 
                    placeholder=""
                    value="Bachelor of Science in Psychology"
                    readOnly
                    //value={degree} 
                    //onChange={ev => setDegree(ev.target.value)}
                    />  
                  </div>
                </div> <hr />

                {/**=========================== Citizenship - Email Address ==========================*/} 
                <div className="flex flex-wrap -mx-3 mb-2">
                  {/*column1*/}
                  <div className="w-full md:w-1/2 px-3 mb-3 md:mb-0 mt-2">
                    <label className=" text-gray-700 text-xs font-bold mb-2" htmlFor="grid-birthdate">Date of Birth :</label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                      id="grid-birthdate" 
                      type="date" 
                      placeholder=""
                      value={dateOfBirth}
                      onChange={ev => setDateOfBirth(ev.target.value)}
                      />

                    <div className="input-container relative">
                    <label className=" text-gray-700 text-xs font-bold mb-2" htmlFor="citizenship">
                      Citizenship :
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-nationality" 
                    type="text" 
                    placeholder=""
                    pattern="[a-zA-Z ]+"
                    title="Input your Legal Citizenship. Example: Filipino"
                    value={citizenship}
                    onChange={ev => {
                      const value = ev.target.value.replace(/[^A-Za-z ]/g, '');
                      setCitizenship(value);
                    }}
                    />
                    <img
                        src={info}
                        alt="info"
                        className="absolute right-3 top-[50%] h-6 w-6"
                        title="Input your Legal Citizenship. Example: Filipino"
                      />
                    </div>
                    
                    <div className="input-container relative">
                    <label className=" text-gray-700 text-xs font-bold mb-2" htmlFor="ethnicity">
                      Ethnicity/Tribal Affilation :
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-ethnicity" 
                    type="text" 
                    placeholder=""
                    //pattern="[^a-zA-Z\s/]+"
                    value={ethnicity}
                    title="Input your Ethnicity or Tribal Affilation. Example: Ilocano"
                    onChange={ev => {
                      const value = ev.target.value.replace(/[^a-zA-Z\s/]/g, '');
                      setEthnicity(value);
                    }}/>
                    <img
                        src={info}
                        alt="info"
                        className="absolute right-3 top-[50%] h-6 w-6"
                        title="Input your Ethnicity or Tribal Affilation. Example: Ilocano"
                      />
                    </div>

                    <div className="input-container relative">                      
                    <label className=" text-gray-700 text-xs font-bold mb-2" htmlFor="grid-contactnumber">Contact Number :</label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-contactnumber" 
                    type="text" 
                    pattern="^09[0-9]{9}$"
                    placeholder="09XXXXXXXXX"
                    title="Input your contact number using the format given. FORMAT: 09XXXXXXXXX"
                    maxLength={11}
                    value={contactNumber}
                    onChange={ev => {
                        const value = ev.target.value.replace(/\D/g, '');
                        setContactNumber(value);}}
                    /> 
                    <img
                        src={info}
                        alt="info"
                        className="absolute right-3 top-[50%] h-6 w-6"
                        title="Input your contact number using the format given. FORMAT: 09XXXXXXXXX"
                      />
                    </div>                   
                  </div>

                  {/*column2*/}
                  <div className="w-full md:w-1/2 px-3 mb-3 md:mb-0 mt-2">    

                  <div className="input-container relative">
                    <label className=" text-gray-700 text-xs font-bold mb-2" htmlFor="placeofbirth">
                      Place of Birth :
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-placeofbirth" 
                    type="text" 
                    placeholder="City/Municipality"
                    title="Input your Legal Place of Birth. This is either a city or municipality."
                    value={placeOfBirth}
                    onChange={ev => setPlaceOfBirth(ev.target.value)}/>
                    <img
                        src={info}
                        alt="info"
                        className="absolute right-3 top-[50%] h-6 w-6"
                        title="Input your Legal Place of Birth. This is either a city or municipality."
                      />
                  </div>

                  <div className="input-container relative">
                    <label className=" text-gray-700 text-xs font-bold mb-2" htmlFor="sexatbirth">
                      Sex at Birth :
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                      id="grid-sexatbirth" 
                      type="text" 
                      placeholder="Male/Female"
                      pattern="[a-zA-Z]+"
                      maxLength={6}
                      title="Input your Sex at Birth. This is either Male or Female."
                      value={sexAtBirth}
                      onChange={ev => {
                        const value = ev.target.value.replace(/[^A-Za-z]/g, '');
                        setSexAtBirth(value);
                      }}/>
                      <img
                        src={info}
                        alt="info"
                        className="absolute right-3 top-[50%] h-6 w-6"
                        title="Input your Sex at Birth. This is either Male or Female."
                      />
                  </div>
                    
                  <div className="input-container relative">
                    <label className=" text-gray-700 text-xs font-bold mb-2" htmlFor="speacialneeds">
                      Special Need/s :
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-studyaddress" 
                    type="text" 
                    placeholder=""
                    title="Input 'N/A' if not applicable."
                    value={specialNeeds}
                    onChange={ev => setSpecialNeeds(ev.target.value)}/>
                    <img
                        src={info}
                        alt="info"
                        className="absolute right-3 top-[50%] h-6 w-6"
                        title="Input 'N/A' if not applicable."
                      />
                  </div>
                  
                  <div className="input-container relative">
                    <label className=" text-gray-700 text-xs font-bold mb-2" htmlFor="emailaddress">
                      Email Address :
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-emailaddress" 
                    type="text" 
                    pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                    placeholder=""
                    value={email}
                    onChange={ev => {
                      const value = ev.target.value;
                      setEmail(value); // Update the state with the input value
                  
                      // Custom validation logic
                      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                      if (!isValidEmail) {
                        setEmailError('Invalid email format');
                      } else {
                        setEmailError('');
                      }
                    }}
                    />
                    <img
                        src={info}
                        alt="info"
                        className="absolute right-3 top-[50%] h-6 w-6"
                        title="Input your working email address."
                      />
                  </div>
                  </div>
                </div> <hr />

                {/**=========================== Filling the Adresses ==========================*/} 
                <div className="flex flex-wrap -mx-3 mb-2">
                  <div className="w-full px-3 mb-3 md:mb-0 mt-2">
                  <div className="input-container relative">
                    <label className=" text-gray-700 text-xs font-bold mb-2" htmlFor="grid-homeaddress">Home Address :</label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-homeaddress" 
                    type="text" 
                    title="Input your home address using the format given. FORMAT: Bldg No., Street, Barangay, City/Municipality"
                    placeholder="Bldg No., Street, Barangay, City/Municipality"
                    value={homeAddress}
                    onChange={ev => setHomeAddress(ev.target.value)}/>
                    <img
                        src={info}
                        alt="info"
                        className="absolute right-3 top-[50%] h-6 w-6"
                        title="Input your home address using the format given. FORMAT: Bldg No., Street, Barangay, City/Municipality"
                      />
                  </div>
                  </div>

                  <div className="w-full px-3 mb-3 md:mb-0 mt-2">
                  <div className="input-container relative">
                    <label className=" text-gray-700 text-xs font-bold mb-2" htmlFor="studyaddress">
                      Address while studying at BSU :
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-studyaddress" 
                    type="text" 
                    title="Input your address while studying at BSU using the format given. FORMAT: Bldg No., Street, Barangay, City/Municipality"
                    placeholder="Bldg No., Street, Barangay, City/Municipality"
                    value={addressWhileStudyingAtBsu}
                    onChange={ev => setAddressWhileStudyingAtBsu(ev.target.value)}/>
                    <img
                        src={info}
                        alt="info"
                        className="absolute right-3 top-[50%] h-6 w-6"
                        title="Input your address while studying at BSU using the format given. FORMAT: Bldg No., Street, Barangay, City/Municipality"
                      />
                  </div>
                  </div>
                </div> <hr />

                {/**=========================== Emergency Contact ==========================*/} 
                <div className="text-normal font-medium text-center mt-2">EMERGENCY CONTACT (Person to be contacted in case of emergency)</div> <hr className='mt-2'/>
                <div className="flex flex-wrap -mx-3 mb-2"> 
                  
                  {/*column1*/}
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 mt-2">
                  <div className="input-container relative">
                    <label className=" text-gray-700 text-xs font-bold mb-2" htmlFor="grid-contactname">Complete Name :</label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-contactname" 
                    type="text" 
                    placeholder="Given Name M.I. Last Name"
                    pattern="[a-zA-Z .]+"
                    title="Input the name of the person to be contacted in case of emergency using the format given. FORMAT: Given Name M.I. Last Name"
                    value={emergencyContactName}
                    onChange={ev => {
                      const value = ev.target.value.replace(/[^A-Za-z .]/g, '');
                      setEmergencyContactName(value);
                    }}/>
                    <img
                        src={info}
                        alt="info"
                        className="absolute right-3 top-[50%] h-6 w-6"
                        title="Input the name of the person to be contacted in case of emergency using the format given. FORMAT: Given Name M.I. Last Name"
                      />
                  </div>

                  <div className="input-container relative">
                    <label className=" text-gray-700 text-xs font-bold mb-2" htmlFor="grid-address">Address :</label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                      id="grid-address" 
                      type="text" 
                      placeholder="Bldg No., Street, Barangay, City/Municipality"
                      title="Input the address of the person to be contacted in case of emergency using the format given. FORMAT: Bldg No., Street, Barangay, City/Municipality"
                      value={emergencyContactAddress}
                      onChange={ev => setEmergencyContactAddress(ev.target.value)}/>
                       <img
                        src={info}
                        alt="info"
                        className="absolute right-3 top-[50%] h-6 w-6"
                        title="Input the address of the person to be contacted in case of emergency using the format given. FORMAT: Bldg No., Street, Barangay, City/Municipality"/>
                  </div>
                  </div>

                  {/*column2*/}
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 mt-2">
                  <div className="input-container relative">
                    <label className=" text-gray-700 text-xs font-bold mb-2" htmlFor="grid-contactnum">
                      Contact Number :
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-contactnum" 
                    type="text" 
                    pattern="^09[0-9]{9}$"
                    placeholder="09XXXXXXXXX"
                    title="Input the contact number of the person to be contacted in case of emergency using the format given. FORMAT: 09XXXXXXXXX"
                    maxLength={11}
                    value={emergencyContactNumber}
                    onChange={ev => {
                      const value = ev.target.value.replace(/\D/g, '');
                      setEmergencyContactNumber(value);}}
                    />
                    <img
                        src={info}
                        alt="info"
                        className="absolute right-3 top-[50%] h-6 w-6"
                        title="Input the contact number of the person to be contacted in case of emergency using the format given. FORMAT: 09XXXXXXXXX"
                      />
                    </div>

                    <div className="input-container relative">    
                    <label className=" text-gray-700 text-xs font-bold mb-2" htmlFor="grid-relationship">
                      Relationship :
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-relationship" 
                    type="text" 
                    //pattern="[^a-zA-Z\s/]+"
                    title="Input your relationship with the person to be contacted in case of emergency. Example: Parent"
                    value={relationship}
                    onChange={ev => {
                      const value = ev.target.value.replace(/[^a-zA-Z\s/]/g, '');
                      setRelationship(value);
                    }}/>
                    <img
                        src={info}
                        alt="info"
                        className="absolute right-3 top-[50%] h-6 w-6"
                        title="Input your relationship with the person to be contacted in case of emergency. Example: Parent"
                      />
                  </div>
                  </div>
                </div> <hr />

                {/**=========================== Insurance Coverage ==========================*/} 
                <div className="text-normal text-center font-medium mt-2">INSURANCE COVERAGE (As per CHED-DOH Joint Memorandum Circular No. 2021 - 001:VI.J)</div> <hr className='mt-2'/>
                <div className="flex flex-wrap -mx-3 mb-2">
                  {/*column1*/}
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 mt-2">
                    <label className=" text-gray-700 text-xs font-bold mb-2">
                      Are you registed as by a health facility with Phil Health or equivalent Medical Insurance that covers medical expenses: 
                    </label>
                    <div className="w-full px-3 md:mb-0 flex flex-wrap flex-row mb-2">
                      {/**Radio buttion for Yes registered */}
                      <div className='mx-5 mt-2'>
                        <input className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                          type="radio"
                          name="yesregister"
                          id="yesregister"
                          value='Yes' 
                          checked={healthfacilityregistered === 'Yes'}
                          onChange={ev => sethealthfacilityregistered(ev.target.value)}
                          />
                          <label
                            className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                            htmlFor="healthregistered">Yes
                          </label>
                      </div>
                      {/**Radio buttion for No registered */}
                      <div className='mx-5 mt-2'>
                        <input className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                          type="radio"
                          name="noregister"
                          id="noregister"
                          value='No'
                          checked={healthfacilityregistered === 'No'}
                          onChange={ev => sethealthfacilityregistered(ev.target.value)}
                          />
                          <label
                            className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                            htmlFor="healthregistered">No
                          </label>
                      </div>
                    </div>
                    
                  </div>
                  {/*column2*/}
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 mt-2">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold py-4 mb-2">Covid-19 Vaccination Status :</label>
                    <select  className='ml-5'
                      onChange={ev => setvaccinationstatus(ev.target.value)} 
                      value={vaccinationstatus}>
                      <option 
                        value="Not Vaccinated">
                          Not Vaccinated</option>
                      <option 
                        value="Fully Vaccinated">
                          Fully Vaccinated</option>
                      <option 
                        value="2nd Dose">
                          Not Fully Vaccinated</option>
                    </select>
                  </div>

                  {/**/}
                  <div className="w-full px-3 mb-6 md:mb-0 mt-2">                 
                    <label className=" text-gray-700 text-xs font-bold mb-2" htmlFor="grid-contactnum">
                      Are you DEPENDENT on your Mother/Father/Legal Guardian of a health facility with Phil Health or equivalent Medical Insurance that covers Medical Expenses related to COVID-19? :
                    </label>
                    <div className="w-full px-3 md:mb-0 flex flex-wrap flex-row mb-2">
                      {/**Radio buttion for Yes dependent */}
                      <div className='mx-5 mt-2'>
                        <input className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                          type="radio"
                          name="healthdependent"
                          id="Dependent"
                          value="Yes" 
                          checked={parenthealthfacilitydependent === 'Yes'}
                          onChange={ev => setparenthealthfacilitydependent(ev.target.value)}
                          />
                        <label
                          className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                          htmlFor="healthdependent">Yes
                        </label>
                      </div>
                      {/**Radio buttion for No dependent */}
                      <div className='mx-5 mt-2'>
                        <input className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                          type="radio"
                          name="healthdependent"
                          id="Dependent"
                          value="No" 
                          checked={parenthealthfacilitydependent === 'No'}
                          onChange={ev => setparenthealthfacilitydependent(ev.target.value)}
                          />
                        <label
                            className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                            htmlFor="healthdependent">No
                        </label>
                      </div>
                    </div>
                  </div>
                </div> <hr />
            </div>
          </div>
        
          {/**=========================== 3 ==========================*/}      
          {/**Start of Filling the FORM */}
          <div className="w-full container mx-auto">
            <div className='relative flex flex-col min-w-0 break-words w-full shadow-md rounded-t-lg px-4 py-5 bg-white border-0 mt-3'>
              <div className="flex-auto px-4 lg:px-10 py-5 pt-0 mt-1">
                  <div className="text-normal font-medium text-center mt-2">
                    DIGITAL COMMUNICATION AND LITERACY:
                    <em> CHED Memorandom Order Number 04, Series of 2020: GUIDELINES ON THE IMPLEMENTATION OF FLEXIBLE LEARNING</em>
                  </div> <hr className='mt-2'/>

                  {/*column1*/}
                  <div className="w-full px-3 mb-6 md:mb-0 mt-2">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-category">
                      Category :
                    </label>
                    <div className="w-full px-3 md:mb-0 flex flex-wrap flex-col mb-2">
                      {/**Radio buttion for High level technology */}
                      <div className='mx-5 mt-2'>
                        <input className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                type="radio"
                                name="highlvl"
                                id="highlvl"
                                value="category1" 
                                checked={technologylevel === 'category1'}
                                onChange={ev => settechnologylevel(ev.target.value)}
                                />
                        <label
                              className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                              htmlFor="categorytech">
                              <strong>High Level Technology: </strong>
                               <i>Availability of Devices-laptops, mobile phones, tablets, desktops, Internet connectvity-fast</i>
                        </label>
                      </div>
                      {/**Radio buttion for Medium level technology */}
                      <div className='mx-5 mt-2'>
                        <input className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                type="radio"
                                name="mediumlvl"
                                id="mediumlvl"
                                value="category2" 
                                checked={technologylevel === 'category2'}
                                onChange={ev => settechnologylevel(ev.target.value)}
                                />
                        <label
                              className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                              htmlFor="categorytech">
                              <strong>Medium Level Technology: </strong>
                              <i>Availability of Devices-Mostly available phones, Internet connectvity-slow</i>
                        </label>
                      </div>
                      {/**Radio buttion for Low level technology */}
                      <div className='mx-5 mt-2'>
                        <input className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                type="radio"
                                name="lowlvl"
                                id="lowlvl"
                                value="category3" 
                                checked={technologylevel === 'category3'}
                                onChange={ev => settechnologylevel(ev.target.value)}
                                />
                        <label
                              className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                              htmlFor="categorytech">
                              <strong>Low Level Technology: </strong>
                              <i>Availability of Devices-Some mobile phones or no technology, Internet connectvity-poor or no internet connection</i>
                        </label>
                      </div>
                    </div>                                         
                  </div> <hr className='mt-2'/>

                  {/*column2*/}
                  <div className="w-full px-3 mb-6 md:mb-0 mt-2">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-lodl">
                      Level of Digital Literacy :
                    </label>
                    <div className="w-full px-3 md:mb-0 flex flex-wrap flex-row mb-2">
                    {/**Radio buttion for Proficient literacy */}
                    <div className='mx-5 mt-2'>
                      <input className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                              type="radio"
                              name="proficient"
                              id="proficient"
                              value="lvl1" 
                              checked={digitalliteracy === 'lvl1'}
                              onChange={ev => setdigitalliteracy(ev.target.value)}/>
                      <label
                            className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                            htmlFor="literacy">Proficient
                      </label>
                    </div>
                    {/**Radio buttion for Advanced literacy */}
                    <div className='mx-5 mt-2'>
                      <input className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                              type="radio"
                              name="advanced"
                              id="advanced"
                              value="lvl2" 
                              checked={digitalliteracy === 'lvl2'}
                              onChange={ev => setdigitalliteracy(ev.target.value)}/>
                      <label
                            className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                            htmlFor="literacy">Advanced
                      </label>
                    </div>
                    {/**Radio buttion for Beginner literacy */}
                    <div className='mx-5 mt-2'>
                      <input className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                              type="radio"
                              name="beginner"
                              id="beginner"
                              value="lvl3" 
                              checked={digitalliteracy === 'lvl3'}
                              onChange={ev => setdigitalliteracy(ev.target.value)}/>
                      <label
                            className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                            htmlFor="literacy">Beginner
                      </label>
                    </div>
                  </div>                      
                </div><hr />
              </div>
            </div>
          </div>

      {/**=========================== 4 ==========================*/}      
      {/**Start of Filling the FORM */}
        <div className="w-full container mx-auto">
          <div className='relative flex flex-col min-w-0 break-words w-full shadow-md rounded-t-lg px-4 py-5 bg-white border-0 mt-3'>
            <div className="flex-auto px-4 lg:px-10 py-5 pt-0 mt-1">
                <div className="text-normal font-medium text-center mt-2">
                  AVAILMENT OF FREE HIGHER EDUCATION :
                </div> <hr className='mt-2'/>

                <div className="flex flex-wrap flex-row -mx-3 mb-2">
                  {/*column1*/}
                  <div className="w-full md:w-[15%] px-3  py-5 mb-6 md:mb-0 mt-2">
                    <label className=" text-gray-700 text-sm font-bold mb-2">
                      STUDENT 
                    </label>
                  </div>

                        {/*column2*/}
                        <div className="w-full md:w-[25%] px-3 mb-6 md:mb-0 mt-2">
                            <label className=" text-gray-700 text-xs font-bold mb-2">
                                Will you avail Free Higher Education? 
                            </label>
                            <div className="w-full px-3 md:mb-0 flex flex-wrap flex-row mb-2">
                                {/**Radio buttion for Yes registered */}
                                <div className='mx-5 mt-2'>
                                    <input className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                    type="radio"
                                    name="yesavail"
                                    id="yesavail"
                                    value="YesAvail" 
                                    checked={availfreehighereducation === 'YesAvail'}
                                    onChange={ev => setavailfreehighereducation(ev.target.value)}
                                    />
                                    <label
                                        className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                                        htmlFor="yesavail">Yes
                                    </label>
                                </div>
                                {/**Radio buttion for No registered */}
                                <div className='mx-5 mt-2'>
                                    <input className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                    type="radio"
                                    name="noavail"
                                    id="noavail"
                                    value="NoAvail" 
                                    checked={availfreehighereducation === 'NoAvail'}
                                    onChange={ev => setavailfreehighereducation(ev.target.value)}
                                    />
                                    <label
                                        className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                                        htmlFor="noavail">No
                                    </label>
                                </div>
                            </div>                  
                        </div>

                        {/*column3*/}
                        <div className="w-full md:w-[30%] px-3 mb-6 md:mb-0 mt-2">
                            <label className=" text-gray-700 text-xs font-bold mb-2">
                                Would you like to voluntarily Contribute any amount to BSU? 
                            </label>
                            <div className="w-full px-3 md:mb-0 flex flex-wrap flex-row mb-2">
                                {/**Radio buttion for Yes contribute */}
                                <div className='mx-5 mt-2'>
                                    <input className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                        type="radio"
                                        name="yescontribute"
                                        id="yescontribute"
                                        value="YesContribute" 
                                        checked={voluntarycontribution === 'YesContribute'}
                                        onChange={ev => {setvoluntarycontribution(ev.target.value);
                                                        setcontributionamount("");}}
                                    />
                                    <label
                                        className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                                        htmlFor="yescontribute">Yes
                                    </label>
                                </div>
                                {/**Radio buttion for No contribute */}
                                <div className='mx-5 mt-2'>
                                    <input className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                        type="radio"
                                        name="nocontribute"
                                        id="nocontribute"
                                        value="NoContribute" 
                                        checked={voluntarycontribution === 'NoContribute'}
                                        onChange={ev => {setvoluntarycontribution(ev.target.value);
                                                        setcontributionamount(0);
                                                        const inputField = document.getElementById('grid-amtcontibute');
                                                        inputField.disabled = true;}}
                                    />
                                    <label
                                        className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                                        htmlFor="nocontribute">No
                                    </label>
                                </div>
                            </div>                  
                        </div>

                  {/**column4 */}
                  <div className="w-full md:w-[30%] px-3 mb-6 md:mb-0 mt-2">
                  <div className="input-container relative">
                    <label className=" text-gray-700 text-xs font-bold mb-2">
                      AMOUNT <em>(If YES, indicate amount)</em>
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                    id="grid-amtcontibute" 
                    type="text" 
                    pattern="\d{0,12}"
                    maxLength={12}
                    title="Input numeric characters only. (0 to 9)"
                    inputmode="numeric"
                    value={contributionamount}
                    disabled={false}
                    onChange={ev => {
                      const value = ev.target.value.replace(/\D/g, '');
                      setcontributionamount(value);}}
                    />
                    <img
                        src={info}
                        alt="info"
                        className="absolute right-3 top-[60%] h-6 w-6"
                        title="Input numeric characters only. (0 to 9)"
                      />
                  </div>
                  </div>
                </div>
                
            </div>
          </div>
        </div>
        
        {/**===========SUMBIT Button============= */}
        <div className="text-center items-center my-8">
            <button 
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 mr-6 rounded-full">
                  Cancel
            </button>
            <button 
                type="submit"
                className="bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded-full">
                  Submit
            </button>
        </div>  
        </form>
      </div>
    </main>
    {successMessage && (
        <div className="fixed top-0 left-0 w-full h-full overflow-y-auto bg-black bg-opacity-50">
          <div className="lg:w-1/2 px-4 py-1 shadow-lg w-[20%] h-fit bg-[#FFFFFF] rounded-xl mt-[10%] mx-auto p-5">
            <div className="w-full px-4 mx-auto mt-6">
              <div className="text-center text-xl text-green-600 font-semibold my-3">
                {successMessage.message}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
    
  )
}