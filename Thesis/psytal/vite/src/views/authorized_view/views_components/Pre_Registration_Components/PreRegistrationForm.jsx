import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

import schoolLogo from "@assets/BSUlogo.png";
import info from "@assets/info.png";
import date from "@assets/calendar.png";
import axiosClient from '../../../../axios';
import "../../../../../src/styles.css";

import download from 'downloadjs';
import { PDFDocument } from 'pdf-lib'
import preregFirstYearForm from '../../../../assets/preregFirstYearForm.pdf';
import Feedback from '../../../feedback/Feedback';

import ReactModal from 'react-modal';

export default function PreRegistrationForm() {
  
  const [error, setError] = useState({__html: ""});
  const [successMessage, setSuccessMessage] = useState('');
  const [successStatus, setSuccessStatus] = useState('');
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  //-----
  const [disclaimer, setDisclaimer] = useState(false);

  const [preregData, setPreregData] = useState({
    semester: '1st Semester',
    user_id: '',
    start_of_school_year: '',   
    end_of_school_year: '',
    student_school_id: '',      
    learners_reference_number: '',
    last_name: '',              
    first_name: '',
    middle_name: '',            
    maiden_name: '',
    academic_classification: '',
    last_school_attended: '',
    address_of_school_attended: '',
    degree: 'Bachelor of Science in Psychology',
    date_of_birth: '',
    place_of_birth: '',
    citizenship: '',
    sex_at_birth: 'Male',
    ethnicity: '',
    special_needs: '',
    contact_number: '',
    email_address: '',
    home_address: '',
    address_while_studying: '',
    contact_person_name: '',
    contact_person_number: '',
    contact_person_address: '',
    contact_person_relationship: '',
    health_facility_registered: '',
    parent_health_facility_dependent: '',
    vaccination_status: 'Not Vaccinated',
    technology_level: '',
    digital_literacy: '',
    avail_free_higher_education: '',
    voluntary_contribution: '',
    contribution_amount: '',
    complied_to_admission_policy: 'No',
  });

  useEffect(() => {
    setDisclaimer(true); // Set showModal to true when the component mounts
  }, []); 

  const handleCloseDisclaimer = () => {
    setDisclaimer(false);
  };

  //-----

  //----------------For PDF
  const onPrint = () => {
    // PDF modification code======================================================================
    //for new incoming first years
    const fetchPdf = async () => {
      // Extract the first character of the middle name as the middle initial
      const middleInitial = preregData.middle_name ? preregData.middle_name.charAt(0) + '.' : '';

      // Combine last name, first name, and middle initial with comma and dot
      const fullName = `${preregData.last_name}, ${preregData.first_name} ${middleInitial}`;

      // Convert the integer term to text
      // Combine two terms start and End
      const semesterTxt = preregData.semester;
      const integerstartOfSchoolYear = preregData.start_of_school_year;
      const textstartOfSchoolYear = integerstartOfSchoolYear.toString();
      const integerendOfSchoolYear = preregData.end_of_school_year;
      const textendOfSchoolYear = integerendOfSchoolYear.toString();
      const fullTerm = semesterTxt + ' ' + textstartOfSchoolYear + ' - ' + textendOfSchoolYear;

      // Convert the integer to text before assigning
      const integerstudentSchoolId = preregData.student_school_id;
      const textstudentSchoolId = integerstudentSchoolId.toString();

      const integerValuecontactnumber = preregData.contact_number;
      const textcontactnumber = integerValuecontactnumber.toString();

      const integerValuecontactPersonNumber = preregData.contact_person_number;
      const textcontactPersonNumber = integerValuecontactPersonNumber.toString();

      const integerValuecontactPersonAddress = preregData.contact_person_address;
      const textcontactPersonAddress = integerValuecontactPersonAddress.toString();

      const integerValuelearnersReferenceNumber = preregData.learners_reference_number;
      const textlearnersReferenceNumber = integerValuelearnersReferenceNumber.toString();

      const integerValuecontributionAmount = preregData.contribution_amount;
      const textcontributionAmount = integerValuecontributionAmount.toString();

      
      try {
        const pdfBytes = await fetch(preregFirstYearForm).then((res) => res.arrayBuffer());
        const pdfDoc = await PDFDocument.load(pdfBytes);
    
        const form = pdfDoc.getForm();


        const dateField = form.getTextField('text_date_applied');
        if (dateField) {
          // Current date
          const currentDate = new Date();

          // Format of date 'Text-DD-YYYY'
          const formattedDate = currentDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: '2-digit',
          });
          // Set the text of the date field
          dateField.setText(formattedDate);
        } else {
          console.error("Field 'text_date_applied' not found");
        }

        
        const Term = form.getTextField('text_term');
        Term.setText(fullTerm);


        const studentSchoolId = form.getTextField('text_student_ID');
        if (studentSchoolId) {
          studentSchoolId.setText(textstudentSchoolId);
        } else {
          console.error(`Field ${studentSchoolId} not found`);
        }
        const name = form.getTextField('text_student_name');
        const maidenName = form.getTextField('text_student_maiden');

        // Check or uncheck each checkbox based on the value of academicClassification
        const checkboxSHS = form.getCheckBox('checkbox_SHS');
        const checkboxHS = form.getCheckBox('checkbox_HS');
        const checkboxALS = form.getCheckBox('checkbox_ALS');
        const academicClassification = preregData.academic_classification;
        if (academicClassification === 'SHS graduate') {
          checkboxSHS.check();
        } else {
          checkboxSHS.uncheck();
        }

        if (academicClassification === 'HS graduate') {
          checkboxHS.check();
        } else {
          checkboxHS.uncheck();
        }

        if (academicClassification === 'ALS completer') {
          checkboxALS.check();
        } else {
          checkboxALS.uncheck();
        }

        const lastSchoolAttended = form.getTextField('text_lastSchool');
        const addressOfSchoolAttended = form.getTextField('text_lastSchool_address');
        const degreeProgram = form.getTextField('text_degree_program');
        const dateOfBirth = form.getTextField('text_date_birth');
        const citizenship = form.getTextField('text_citizenship');
        const ethnicity = form.getTextField('text_ethnicity');
        const placeOfBirth = form.getTextField('text_birth_place');
        const sexAtBirth = form.getTextField('text_student_sex');
        const specialNeeds = form.getTextField('text_special_needs');
        const emailAddress = form.getTextField('text_student_email');
        
        const contactNumber = form.getTextField('text_student_contact_num');
        if (contactNumber) {
          contactNumber.setText(textcontactnumber);
        } else {
          console.error(`Field ${contactNumber} not found`);
        }

        const permanentAddress = form.getTextField('text_pAddress');
        const addressWhileStudying = form.getTextField('text_wsAddress');

        //person to contact in case of emergency
        const contactPersonName = form.getTextField('text_em_name');
        const contactPersonAddress = form.getTextField('text_em_address'); 
        if (contactPersonAddress) {
          contactPersonAddress.setText(textcontactPersonAddress);
        } else {
          console.error(`Field ${contactPersonAddress} not found`);
        }

        const contactPersonNumber = form.getTextField('text_em_number');
        if (contactPersonNumber) {
          contactPersonNumber.setText(textcontactPersonNumber);
        } else {
          console.error(`Field ${contactPersonNumber} not found`);
        }
        const contactPersonRelationship = form.getTextField('text_em_relationship');
        const healthfacilityregistered = form.getTextField('text_ic_registered');
        const parentHealthFacilityDependent = form.getTextField('text_ic_dependent');
        const vaccinationStatus = form.getTextField('text_ic_vax_stat');

        const txttechnologyLevel = preregData.technology_level;
        const technologylevel = form.getTextField('text_dcl_level');
        if (txttechnologyLevel === 'category1') {
          technologylevel.setText('Proficient');
        } else if (txttechnologyLevel === 'category2') {
          technologylevel.setText('Advanced');
        } else if (txttechnologyLevel === 'category3') {
          technologylevel.setText('Beginner');
        } else {
          console.error(`Field ${technologylevel} not found`);
        }

        const txtdigitalLiteracy = preregData.digital_literacy;
        const digitalLiteracy = form.getTextField('text_dcl_category');
        if (txtdigitalLiteracy === 'lvl1') {
          digitalLiteracy.setText('High Level Technology');
        }
        else if (txtdigitalLiteracy === 'lvl2') {
          digitalLiteracy.setText('Medium Level Technology');
        }  
        else if (txtdigitalLiteracy === 'lvl3') {
          digitalLiteracy.setText('Low Level Technology');
        }  
        else {
          console.error(`Field ${digitalLiteracy} not found`);
        }

        // Check or uncheck each checkbox based on the value of availFreeHigherEducation
        const availFreeHigherEducation = preregData.avail_free_higher_education;
        const checkboxfheavailyes = form.getCheckBox('checkbox_fhe_avail_yes');
        const checkboxfheavailno = form.getCheckBox('checkbox_fhe_avail_no');
        if (availFreeHigherEducation === 'YesAvail') {
          checkboxfheavailyes.check();
          checkboxfheavailno.uncheck();
          console.log("checkbox", availFreeHigherEducation);
        } else {
          checkboxfheavailyes.uncheck();
          checkboxfheavailno.check();
          console.log("checkbox", availFreeHigherEducation);
        }

        const contributionAmount = form.getTextField('text_fhe_amount');
        if (contributionAmount) {
          contributionAmount.setText(textcontributionAmount);
        } else {
          console.error(`Field ${contributionAmount} not found`);
        }

        const voluntaryContribution = preregData.voluntary_contribution;
        const checkboxYesContribute = form.getCheckBox('checkbox_fhe_con_yes');
        const checkboxNoContribute = form.getCheckBox('checkbox_fhe_con_no');
        if (voluntaryContribution === 'YesContribute') {
          checkboxYesContribute.check();
          checkboxNoContribute.uncheck();
          console.log("checkbox", voluntaryContribution);
        } else {
          checkboxYesContribute.uncheck();
          checkboxNoContribute.check();
          console.log("checkbox", voluntaryContribution);
        }

        //const compliedToAdmissionPolicy = form.getTextField('text_fhe_complied'); TO ADD, FRONTEND NOT YET FINISHED

        const learnersReferenceNumber = form.getTextField('text_student_lrn');
        if (learnersReferenceNumber) {
          learnersReferenceNumber.setText(textlearnersReferenceNumber);
        } else {
          console.error(`Field ${learnersReferenceNumber} not found`);
        }
        name.setText(fullName)
        maidenName.setText(preregData.maiden_name);
        lastSchoolAttended.setText(preregData.last_school_attended);
        addressOfSchoolAttended.setText(preregData.address_of_school_attended);
        degreeProgram.setText(preregData.degree);
        dateOfBirth.setText(preregData.date_of_birth);
        citizenship.setText(preregData.citizenship);
        ethnicity.setText(preregData.ethnicity);
        placeOfBirth.setText(preregData.place_of_birth);
        sexAtBirth.setText(preregData.sex_at_birth);
        specialNeeds.setText(preregData.special_needs);
        emailAddress.setText(preregData.email_address);
        permanentAddress.setText(preregData.home_address);
        addressWhileStudying.setText(preregData.address_while_studying);
        contactPersonName.setText(preregData.contact_person_name);
        contactPersonRelationship.setText(preregData.contact_person_relationship);
        healthfacilityregistered.setText(preregData.health_facility_registered);
        parentHealthFacilityDependent.setText(preregData.parent_health_facility_dependent);
        vaccinationStatus.setText(preregData.vaccination_status);

        //compliedToAdmissionPolicy.setText(preregData.first_name); TO ADD, FRONTEND NOT YET FINISHED
        
        const finalPDF = await pdfDoc.save();
        
        download(finalPDF, 'Pre-Registration Form.pdf', 'application/pdf');

        setSuccessMessage({
          message: 'You have submitted your pre-registration form successfully! Please present the downloaded form to the department within the enrollment period.',
        });

        setTimeout(() => {
          setSuccessMessage(null);
          handleClear();
          navigate('/landingpage');
          closeModal();
        }, 3000);
  
      } catch (error) {
        console.error('Error loading PDF:', error);
      }
    };
    
    // Call the fetchPdf function directly in your component code
    fetchPdf();


    //put axios here
    console.log("Pre-Reg Data:", preregData);
    console.log("Student ID:", preregData.student_school_id);
    console.log("First Name:", preregData.first_name);
    console.log("Last Name:", preregData.last_name);
    

    

  };

  //clearing the input fields using the reset button
  const handleClear = () => {
    console.log("Inside handleClear function");
    setPreregData(prevData => ({
    ...prevData,
    learners_reference_number:'',
    start_of_school_year: '',
    end_of_school_year: '',
    student_school_id: '',
    last_name: '',
    first_name: '',
    middle_name: '',
    maiden_name: '',
    last_school_attended: '',
    address_of_school_attended: '',
    degree: '',
    date_of_birth: '',
    place_of_birth: '',
    citizenship: '',
    sex_at_birth: 'Male',
    ethnicity: '',
    special_needs: '',
    contact_number: '',
    email_address: '',
    home_address: '',
    address_while_studying: '',
    contact_person_name: '',
    contact_person_number: '',
    contact_person_address: '',
    contact_person_relationship: '',
    health_facility_registered: '',
    parent_health_facility_dependent: '',
    vaccination_status: 'Not Vaccinated',
    technology_level: '',
    digital_literacy: '',
    avail_free_higher_education: '',
    voluntary_contribution: '',
    contribution_amount: '',
    semester: '1st Semester',
    end_of_term_to_finnish_degree: '',
    last_of_term_to_finnish_degree: '',
    major: '',
    year_level: ''
  }));
    console.log("Closing modal");
    setShowModal(false);
  }
  //the onSubmit function
  const onSubmit = (ev) => {
    ev.preventDefault();
    setError({ __html: "" });
    axiosClient
    .post('/preregincommingtmp', {
      start_of_school_year: parseInt(preregData.start_of_school_year, 10),
      end_of_school_year: parseInt(preregData.end_of_school_year, 10),
      user_id: 1,
      semester: preregData.semester,
      student_school_id: 0,
      learners_reference_number: parseInt(preregData.learners_reference_number, 10),
      last_name: preregData.last_name,
      first_name: preregData.first_name,
      middle_name: preregData.middle_name,
      maiden_name: preregData.maiden_name,
      academic_classification: preregData.academic_classification,
      last_school_attended: preregData.last_school_attended,
      address_of_school_attended: preregData.address_of_school_attended,
      degree: 'Bachelor of Science in Psychology',
      date_of_birth: preregData.date_of_birth,
      place_of_birth: preregData.place_of_birth,
      citizenship: preregData.citizenship,
      sex_at_birth: preregData.sex_at_birth,
      ethnicity: preregData.ethnicity,
      special_needs: preregData.special_needs,
      contact_number: preregData.contact_number,
      email_address: preregData.email_address,
      home_address: preregData.home_address,
      address_while_studying: preregData.address_while_studying,
      contact_person_name: preregData.contact_person_name,
      contact_person_number: preregData.contact_person_number, //theres an error here--doesnt accept multiple numbers
      contact_person_address: preregData.contact_person_address,
      contact_person_relationship: preregData.contact_person_relationship,
      health_facility_registered: preregData.health_facility_registered,
      parent_health_facility_dependent: preregData.parent_health_facility_dependent,
      vaccination_status: preregData.vaccination_status,
      technology_level: preregData.technology_level,
      digital_literacy: preregData.digital_literacy,
      avail_free_higher_education: preregData.avail_free_higher_education,
      voluntary_contribution: preregData.voluntary_contribution,
      contribution_amount: preregData.contribution_amount,
      complied_to_admission_policy: preregData.complied_to_admission_policy,
      pre_reg_status: 'Pending',
      type_of_student: 'Incoming',
      student_status: 'Regular',
      
    })
    .then(({ data }) => {
      
      setSuccessMessage(data.message);
      setSuccessStatus(data.success);
      if(setSuccessStatus==true){
        onPrint();
      }
          // setTimeout(() => {
          //   setSuccessMessage(null);
          //   closeModal();
          //   window.location.reload();
          // }, 2000);
    })
    .catch(( response ) => {
      setSuccessMessage(response.message);
      setSuccessStatus(response.success);
    });
  };
  
  return (
    <>
    <Feedback isOpen={successMessage !== ''} onClose={() => setSuccessMessage('')} successMessage={successMessage} status={successStatus} refresh={false}/>
        
    <main className="w-[100%] h-[100%] py-[10%]">
      <div className="lg:w-8/12 mx-auto px-4 container">          
        <div className="rounded-t bg-grayGreen mb-0 px-6 py-9 items-center  "> {/**BOX  with contents*/}
          <section style={{ display: "flex", justifyContent: "center", alignItems: "center" }} className='flex-col sm:flex-row'>
            <div >
              <img src={schoolLogo}
                className="object-cover btn- h-20 w-20 rounded-full bg-gray-300" alt="BSU Logo" />
            </div>
            <div className="flex flex-col justify-between pl-10">
              <span className="text-sm font-bold">PRE-REGISTRATION FORM</span> 
              <span className="text-sm">(NEW FIRST YEAR STUDENT)</span>
              <p className="text-sm font-semibold">Instructions: </p>
              <p className="text-sm italic"> Please fill out the form in</p>
              <p className="text-sm font-semibold">***NOTE: ALL FIELDS ARE REQUIRED. INPUT 'N/A' IF NOT APPLICABLE***</p>
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
                        onClick={() => setShowModal(true)}>
                    RESET
                </button>
              </div>         
      </div>
      {/* Modal for reset button*/}
      {showModal ? (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    <div className="bg-white rounded-lg z-50 p-5">
                        <h2 className="text-xl font-bold mb-3">Are you sure you want to reset?</h2>
                        <div className="flex justify-end">
                            <button 
                                className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-2 rounded mr-2"
                                onClick={() => setShowModal(false)}>
                                  
                                Cancel
                            </button>
                            <button 
                                className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-2 rounded"
                                onClick={handleClear}>
                                Confirm Reset
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}
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
                    <select
                        name="semester"
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        required
                        onChange={ev => {
                            setPreregData({ ...preregData, semester: ev.target.value });
                        }}
                    >
                        <option value="1st Semester">1st Semester</option>
                        <option value="2nd Semester">2nd Semester</option>
                        <option value="Midyear">Midyear</option>
                    </select>
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
                        
                      <input
                        name="start"
                        type="text" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                        pattern="\d{0,4}"
                        placeholder="20XX"
                        min={new Date().getFullYear()} // Set minimum year to current year
                        max={new Date().getFullYear() + 5} // Set maximum year to 5 years after current year
                        step="1"
                        maxLength={4}
                        value={preregData.start_of_school_year}
                        required
                        onChange={ev => {
                          // Ensure that only numeric values are entered
                          const value = ev.target.value.replace(/\D/g, '');
                          const startYear = parseInt(value);
                          setPreregData({ ...preregData, start_of_school_year: startYear });
                          setPreregData(prevData => ({
                            ...prevData,
                            end_of_school_year: startYear + 1
                          }));
                        }}
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
                          min={new Date().getFullYear()} 
                          max={new Date().getFullYear() + 5} 
                          step="1" 
                          maxLength={4}
                          value={preregData.end_of_school_year}
                          required
                          onChange={ev => {
                            // Ensure that only numeric values are entered
                            const value = ev.target.value.replace(/\D/g, '');
                            const endYear = parseInt(value);
                            setPreregData({ ...preregData, end_of_school_year: endYear });
                            setPreregData(prevData => ({
                              ...prevData,
                              start_of_school_year: endYear - 1
                            }));
                          }}
                        />

                      </div>
                    </div>
                  </div>                 
                </div> <hr />

                {/**=========================== Student ID - LRN ==========================*/} 
                <div className="flex flex-wrap flex-row -mx-3 mb-2">
                      
                      {/*column2*/}
                      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 mt-5">
                      <div className="input-container relative ml-0">
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
                        value={preregData.learners_reference_number}
                        required
                        onChange={ev => {
                          const value = ev.target.value.replace(/\D/g, '');
                          setPreregData({ ...preregData, learners_reference_number: value });}}
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
                    pattern="[A-Za-zñÑ -]+"
                    title="Input your Legal Last Name."
                    value={preregData.last_name}
                    maxLength={30}
                    required
                    onChange={ev => {
                      const value = ev.target.value.replace(/[^A-Za-zñÑ -]/g, '');
                      setPreregData({ ...preregData, last_name: value });
                    }}
                   />  
                   <img
                        src={info}
                        alt="info"
                        className="absolute right-3 top-[50%] h-6 w-6"
                        title="Input your Legal Last Name."
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
                        pattern="[A-Za-zñÑ .-]+"
                        title="Input your Legal Given Name/s with your Suffix, if applicable."
                        value={preregData.first_name}
                        maxLength={50}
                        required
                        onChange={ev => {
                          const value = ev.target.value.replace(/[^A-Za-zñÑ .-]/g, '');
                          setPreregData({ ...preregData, first_name: value });
                        }}
                      />
                      <img
                        src={info}
                        alt="info"
                        className="absolute right-3 top-[50%] h-6 w-6"
                        title="Input your Legal Given Name/s with your Suffix, if applicable."
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
                    pattern="[A-Za-zñÑ -]+"
                    title="Input your Legal Middle Name."
                    value={preregData.middle_name}
                    maxLength={30}
                    required
                    onChange={ev => {
                      const value = ev.target.value.replace(/[^A-Za-zñÑ -]/g, '');
                      setPreregData({ ...preregData, middle_name: value });
                    }}
                    />  
                     <img
                        src={info}
                        alt="info"
                        className="absolute right-3 top-[50%] h-6 w-6"
                        title="Input your Legal Middle Name."
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
                    //pattern="[A-Za-zñÑ .\\/-]+"
                    title="Input 'N/A' if not applicable."
                    value={preregData.maiden_name}
                    maxLength={30}
                    required
                    onChange={ev => {
                      const value = ev.target.value.replace(/[^A-Za-zñÑ .\/-]/g, '');
                      setPreregData({ ...preregData, maiden_name: value });
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
                    <label className="text-sm font-semibold">ACADEMIC CLASSIFICATION:</label>
                  </div>
                  
                  <div className="w-full px-3 md:mb-0 flex flex-wrap flex-row mb-2">
                    {/* Radio button for SHS graduate */}
                    <div className='mx-5 mt-2'>
                      <input
                        className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s]  dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                        type="radio"
                        name="typeofacadclass"
                        id="shsgraduate"
                        checked={preregData.academic_classification === 'SHS graduate'}
                        value="SHS graduate" 
                        onChange={ev => setPreregData({ ...preregData, academic_classification: ev.target.value })}
                        required
                      />
                      <label
                        className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                        htmlFor="continuing">Senior High School Graduate
                      </label>
                    </div>

                    {/* Radio button for HS graduate */}
                    <div className='mx-5 mt-2'>
                      <input
                        className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s]  dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                        type="radio"
                        name="typeofacadclass"
                        id="hsgraduate"
                        value="HS graduate"
                        checked={preregData.academic_classification === 'HS graduate'}
                        onChange={ev => setPreregData({ ...preregData, academic_classification: ev.target.value })}
                        required
                      />
                      <label
                        className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                        htmlFor="secondsem">High School Graduate
                      </label>
                    </div>

                    {/* Radio button for ALS completer */}
                    <div className='mx-5 mt-2'>
                      <input
                        className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s]  dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                        type="radio"
                        name="typeofacadclass"
                        id="alscompleter"
                        value="ALS completer"
                        checked={preregData.academic_classification === 'ALS completer'}
                        onChange={ev => setPreregData({ ...preregData, academic_classification: ev.target.value })}
                        required
                      />
                      <label
                        className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                        htmlFor="secondsem">Alternative Learning System (ALS) Completer
                      </label>
                    </div>
                  </div>
                </div>
                <hr />

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
                    pattern="[A-Za-zñÑ ]+"
                    title="Do not abbreviate."
                    value={preregData.last_school_attended}
                    required
                    onChange={ev => {
                      const value = ev.target.value.replace(/[^A-Za-zñÑ ]/g, '');
                      setPreregData({ ...preregData, last_school_attended: value });
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
                    value={preregData.address_of_school_attended}
                    required
                    onChange={ev => setPreregData({ ...preregData, address_of_school_attended: ev.target.value })}/>  
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
                      value={preregData.date_of_birth}
                      required
                      onChange={(ev) => {
                        const inputBdate = new Date(ev.target.value);
                        const currentDate = new Date();
                        const minDate = new Date(
                          currentDate.getFullYear() - 17,
                          currentDate.getMonth(),
                          currentDate.getDate()
                        );
                      
                        if (inputBdate > minDate) {
                          alert("Age must be 17 or above.");
                        } else {
                          setPreregData({ ...preregData, date_of_birth: ev.target.value });
                        }
                      }}
                      />

                    <div className="input-container relative">
                    <label className=" text-gray-700 text-xs font-bold mb-2" htmlFor="citizenship">
                      Citizenship :
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-nationality" 
                    type="text" 
                    placeholder=""
                    pattern="[A-Za-zñÑ ]+"
                    title="Input your Legal Citizenship. Example: Filipino"
                    value={preregData.citizenship}
                    required
                    onChange={ev => {
                      const value = ev.target.value.replace(/[^A-Za-zñÑ ]/g, '');
                      setPreregData({ ...preregData, citizenship: value });
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
                    //pattern="[A-Za-zñÑ ]+"
                    value={preregData.ethnicity}
                    title="Input your Ethnicity or Tribal Affilation. Example: Ilocano"
                    required
                    onChange={ev => {
                      const value = ev.target.value.replace(/[^A-Za-zñÑ ]/g, '');
                      setPreregData({ ...preregData, ethnicity: value });
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
                    required
                    value={preregData.contact_number}
                    onChange={ev => {
                        const value = ev.target.value.replace(/\D/g, '');
                        setPreregData({ ...preregData, contact_number: value });}}
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
                    value={preregData.place_of_birth}
                    required
                    onChange={ev => setPreregData({ ...preregData, place_of_birth: ev.target.value })}/>
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
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 mt-2">
                    <select  className='"appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"'
                      required
                      onChange={ev => setPreregData({ ...preregData, sex_at_birth: ev.target.value })} 
                      value={preregData.sex_at_birth}>
                      <option 
                        value="Male">
                          Male</option>
                      <option 
                        value="Female">
                          Female</option>
                    </select>
                  </div>
                  <img
                        src={info}
                        alt="info"
                        className="absolute right-[45%] top-[50%] h-6 w-6"
                        title="Select your Sex at Birth."
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
                    value={preregData.special_needs}
                    required
                    onChange={ev => setPreregData({ ...preregData, special_needs: ev.target.value })}/>
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
                    value={preregData.email_address}
                    required
                    onChange={ev => {
                      const value = ev.target.value;
                      setPreregData({ ...preregData, email_address: value }); // Update the state with the input value
                  
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
                    value={preregData.home_address}
                    required
                    onChange={ev => setPreregData({ ...preregData, home_address: ev.target.value })}/>
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
                    value={preregData.address_while_studying}
                    required
                    onChange={ev => setPreregData({ ...preregData, address_while_studying: ev.target.value })}/>
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
                    pattern="[A-Za-zñÑ .-]+"
                    title="Input the name of the person to be contacted in case of emergency using the format given. FORMAT: Given Name M.I. Last Name"
                    value={preregData.contact_person_name}
                    required
                    onChange={ev => {
                      const value = ev.target.value.replace(/[^A-Za-zñÑ .-]/g, '');
                      setPreregData({ ...preregData, contact_person_name: value });
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
                      value={preregData.contact_person_address}
                      required
                      onChange={ev => setPreregData({ ...preregData, contact_person_address: ev.target.value })}/>
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
                    value={preregData.contact_person_number}
                    required
                    onChange={ev => {
                      const value = ev.target.value.replace(/\D/g, '');
                      setPreregData({ ...preregData, contact_person_number: value });}}
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
                    value={preregData.contact_person_relationship}
                    required
                    onChange={ev => {
                      const value = ev.target.value.replace(/[^a-zA-Z\s/]/g, '');
                      setPreregData({ ...preregData, contact_person_relationship: value });
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
                    <label className="text-gray-700 text-xs font-bold mb-2">
                        Are you registered by a health facility with Phil Health or equivalent Medical Insurance that covers medical expenses: 
                    </label>
                    <div className="w-full px-3 md:mb-0 flex flex-wrap flex-row mb-2">
                        {/**Radio button for Yes registered */}
                        <div className='mx-5 mt-2'>
                            <input 
                                className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                type="radio"
                                name="healthregistered"
                                id="yesregister"
                                value='Yes' 
                                checked={preregData.health_facility_registered === 'Yes'}
                                onChange={ev => setPreregData({ ...preregData, health_facility_registered: ev.target.value })}
                                required
                            />
                            <label
                                className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                                htmlFor="yesregister">Yes
                            </label>
                        </div>
                        {/**Radio button for No registered */}
                        <div className='mx-5 mt-2'>
                            <input 
                                className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,                0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                type="radio"
                                name="healthregistered"
                                id="noregister"
                                value='No'
                                checked={preregData.health_facility_registered === 'No'}
                                onChange={ev => setPreregData({ ...preregData, health_facility_registered: ev.target.value })}
                                required
                            />
                            <label
                                className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                                htmlFor="noregister">No
                            </label>
                        </div>
                    </div>
                  </div>
                  {/*column2*/}
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 mt-2">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold py-4 mb-2">Covid-19 Vaccination Status :</label>
                    <select  className="appearance-none block w-[50%] bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      required
                      onChange={ev => setPreregData({ ...preregData, vaccination_status: ev.target.value })} 
                      value={preregData.vaccination_status}>
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
                      {/**Radio button for Yes dependent */}
                      <div className='mx-5 mt-2'>
                        <input 
                          className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                          type="radio"
                          name="healthdependent"
                          id="dependent_yes"
                          value="Yes" 
                          checked={preregData.parent_health_facility_dependent === 'Yes'}
                          onChange={ev => setPreregData({ ...preregData, parent_health_facility_dependent: ev.target.value })}
                          required
                        />
                        <label
                          className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                          htmlFor="dependent_yes">Yes
                        </label>
                      </div>

                      {/**Radio button for No dependent */}
                      <div className='mx-5 mt-2'>
                        <input 
                          className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                          type="radio"
                          name="healthdependent"
                          id="dependent_no"
                          value="No" 
                          checked={preregData.parent_health_facility_dependent === 'No'}
                          onChange={ev => setPreregData({ ...preregData, parent_health_facility_dependent: ev.target.value })}
                          required
                        />
                        <label
                          className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                          htmlFor="dependent_no">No
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

                  {/* column1 */}
                    <div className="w-full px-3 mb-6 md:mb-0 mt-2">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-category">
                        Category :
                      </label>
                      <div className="w-full px-3 md:mb-0 flex flex-wrap flex-col mb-2">
                        {/**Radio button for High level technology */}
                        <div className='mx-5 mt-2'>
                          <input 
                            className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                            type="radio"
                            name="category"
                            id="highlvl"
                            value="category1" 
                            checked={preregData.technology_level === 'category1'}
                            onChange={ev => setPreregData({ ...preregData, technology_level: ev.target.value })}
                            required
                          />
                          <label
                            className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                            htmlFor="highlvl">
                            <strong>High Level Technology: </strong>
                            <i>Availability of Devices-laptops, mobile phones, tablets, desktops, Internet connectivity-fast</i>
                          </label>
                        </div>
                        {/**Radio button for Medium level technology */}
                        <div className='mx-5 mt-2'>
                          <input 
                            className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                            type="radio"
                            name="category"
                            id="mediumlvl"
                            value="category2" 
                            checked={preregData.technology_level === 'category2'}
                            onChange={ev => setPreregData({ ...preregData, technology_level: ev.target.value })}
                            required
                          />
                          <label
                            className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                            htmlFor="mediumlvl">
                            <strong>Medium Level Technology: </strong>
                            <i>Availability of Devices-Mostly available phones, Internet connectivity-slow</i>
                          </label>
                        </div>
                        {/**Radio button for Low level technology */}
                        <div className='mx-5 mt-2'>
                          <input 
                            className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                            type="radio"
                            name="category"
                            id="lowlvl"
                            value="category3" 
                            checked={preregData.technology_level === 'category3'}
                            onChange={ev => setPreregData({ ...preregData, technology_level: ev.target.value })}
                            required
                          />
                          <label
                            className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                            htmlFor="lowlvl">
                            <strong>Low Level Technology: </strong>
                            <i>Availability of Devices-Some mobile phones or no technology, Internet connectivity-poor or no internet connection</i>
                          </label>
                        </div>
                      </div>                                         
                    </div>
                    <hr className='mt-2'/>

                  {/* Column 2 */}
                    <div className="w-full px-3 mb-6 md:mb-0 mt-2">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-lodl">
                        Level of Digital Literacy:
                      </label>
                      <div className="w-full px-3 md:mb-0 flex flex-wrap flex-row mb-2">
                        {/**Radio button for Proficient literacy */}
                        <div className='mx-5 mt-2'>
                          <input className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                            type="radio"
                            name="digital_literacy"
                            id="proficient"
                            value="lvl1" 
                            checked={preregData.digital_literacy === 'lvl1'}
                            required
                            onChange={ev => setPreregData({ ...preregData, digital_literacy: ev.target.value })}/>
                          <label
                            className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                            htmlFor="proficient">
                            Proficient
                          </label>
                        </div>
                        {/**Radio button for Advanced literacy */}
                        <div className='mx-5 mt-2'>
                          <input className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                            type="radio"
                            name="digital_literacy"
                            id="advanced"
                            value="lvl2" 
                            checked={preregData.digital_literacy === 'lvl2'}
                            required
                            onChange={ev => setPreregData({ ...preregData, digital_literacy: ev.target.value })}/>
                          <label
                            className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                            htmlFor="advanced">
                            Advanced
                          </label>
                        </div>
                        {/**Radio button for Beginner literacy */}
                        <div className='mx-5 mt-2'>
                          <input className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                            type="radio"
                            name="digital_literacy"
                            id="beginner"
                            value="lvl3" 
                            checked={preregData.digital_literacy === 'lvl3'}
                            required
                            onChange={ev => setPreregData({ ...preregData, digital_literacy: ev.target.value })}/>
                          <label
                            className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                            htmlFor="beginner">
                            Beginner
                          </label>
                        </div>
                      </div>                      
                    </div>
                    <hr />
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

                        {/* Column 2 */}
                          <div className="w-full md:w-[25%] px-3 mb-6 md:mb-0 mt-2">
                            <label className=" text-gray-700 text-xs font-bold mb-2">
                              Will you avail Free Higher Education? 
                            </label>
                            <div className="w-full px-3 md:mb-0 flex flex-wrap flex-row mb-2">
                              {/**Radio button for Yes registered */}
                              <div className='mx-5 mt-2'>
                                <input className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                  type="radio"
                                  name="avail"
                                  id="yesavail"
                                  value="YesAvail" 
                                  checked={preregData.avail_free_higher_education === 'YesAvail'}
                                  required
                                  onChange={ev => setPreregData({ ...preregData, avail_free_higher_education: ev.target.value })}
                                />
                                <label
                                  className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                                  htmlFor="yesavail">
                                  Yes
                                </label>
                              </div>
                              {/**Radio button for No registered */}
                              <div className='mx-5 mt-2'>
                                <input className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                  type="radio"
                                  name="avail"
                                  id="noavail"
                                  value="NoAvail" 
                                  checked={preregData.avail_free_higher_education === 'NoAvail'}
                                  required
                                  onChange={ev => setPreregData({ ...preregData, avail_free_higher_education: ev.target.value })}
                                />
                                <label
                                  className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                                  htmlFor="noavail">
                                  No
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
                                {/**Radio button for Yes contribute */}
                                  <div className='mx-5 mt-2'>
                                      <input 
                                          className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                          type="radio"
                                          name="contribute"
                                          id="yescontribute"
                                          value="YesContribute" 
                                          checked={preregData.voluntary_contribution === 'YesContribute'}
                                          required
                                          onChange={ev => {
                                              const newValue = ev.target.value;
                                              setPreregData(prevData => ({
                                                  ...prevData,
                                                  voluntary_contribution: newValue,
                                                  contribution_amount: newValue === 'YesContribute' ? "" : 0
                                              }));
                                          }}
                                      />
                                      <label
                                          className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                                          htmlFor="yescontribute">Yes
                                      </label>
                                  </div>
                                  {/**Radio button for No contribute */}
                                  <div className='mx-5 mt-2'>
                                      <input 
                                          className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                          type="radio"
                                          name="contribute"
                                          id="nocontribute"
                                          value="NoContribute" 
                                          checked={preregData.voluntary_contribution === 'NoContribute'}
                                          required
                                          onChange={ev => {
                                              const newValue = ev.target.value;
                                              setPreregData(prevData => ({
                                                  ...prevData,
                                                  voluntary_contribution: newValue,
                                                  contribution_amount: newValue === 'YesContribute' ? "" : 0
                                              }));
                                          }}
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
                    value={preregData.contribution_amount}
                    disabled={false}
                    required
                    onChange={ev => {
                      const value = ev.target.value.replace(/\D/g, '');
                      setPreregData({ ...preregData, contribution_amount: value });}}
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
    {disclaimer && (
        <div className="fixed top-0 left-0 w-full h-full overflow-y-auto bg-black bg-opacity-50">
        <div className="lg:w-3/4 px-4 py-1 shadow-lg w-[350px] h-fit bg-[#FFFFFF] rounded-xl mt-[10%] mx-auto p-5">
        <div className="w-full px-4 mx-auto mt-6">
            <div className="text-xl text-green-600 font-semibold my-3">
              
            <head>
              <title>Data Privacy Disclaimer</title>
            </head>
            <body>
              <h1 className='text-center'><strong>Disclaimer: Data Privacy for Student Pre-Registration</strong></h1>
              <p>This disclaimer is intended to inform users of the student portal about the handling of their personal data in compliance with the Data Privacy Act of 2012 (Republic Act No. 10173) and its implementing rules and regulations in the Philippines.</p>
              <br></br>
              <ol>
                <li><strong>1. Purpose of Data Collection:</strong> The personal data collected through the student portal is solely for educational and administrative purposes. This includes but is not limited to student enrollment, academic record management, communication with students and guardians, and other related activities necessary for the operation of the educational institution.</li>
                <li><strong>2. Data Protection Measures:</strong> We are committed to ensuring the security and confidentiality of the personal data entrusted to us. Appropriate technical, organizational, and physical measures are in place to safeguard against unauthorized access, disclosure, alteration, or destruction of personal data.</li>
                <li><strong>3. Data Usage and Disclosure:</strong> Personal data will only be used for the purposes stated above and will not be disclosed to third parties unless required by law or with explicit consent from the data subject. Access to personal data within the institution is restricted to authorized personnel who require such information for legitimate educational and administrative purposes.</li>
                <li><strong>4. Data Retention:</strong> Personal data will be retained only for as long as necessary to fulfill the purposes for which it was collected or as required by law. Upon graduation or withdrawal from the institution, personal data will be securely archived or disposed of in accordance with applicable regulations.</li>
                <li><strong>5. User Consent:</strong> By accessing and using the student portal, users consent to the collection, processing, and storage of their personal data as described in this disclaimer. Users also acknowledge their rights to access, correct, or request the deletion of their personal data in accordance with applicable data privacy laws.</li>
                <li><strong>6. Updates to Privacy Policy:</strong> This disclaimer and our privacy practices may be updated periodically to reflect changes in legal or regulatory requirements, technological advancements, or institutional policies. Users will be notified of any material changes to the privacy policy.</li>
                <li><strong>7. Contact Information:</strong> For inquiries, requests, or concerns regarding data privacy in the student portal, users may contact the institution's Data Protection Officer or designated privacy contact.</li>
              </ol>
              <br></br>
              <p>By accessing and using the student portal, users agree to abide by this disclaimer and consent to the collection, processing, and storage of their personal data for educational and administrative purposes in accordance with applicable data privacy laws in the Philippines.</p>
                <div className='text-center'>
                  <button
                    className="bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded-full" 
                    onClick={handleCloseDisclaimer}>I Understand</button>
                </div>
            </body>
            </div>
          </div>
        </div>
        
      </div>
      )}  
    </>
    
  )
}