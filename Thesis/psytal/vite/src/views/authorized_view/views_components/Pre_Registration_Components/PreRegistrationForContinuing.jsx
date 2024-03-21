import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import schoolLogo from "@assets/BSUlogo.png";
import info from "@assets/info.png";
import date from "@assets/calendar.png";
import axiosClient from '../../../../axios';
import { PDFDocument } from 'pdf-lib'
import download from 'downloadjs';
import preregContinuingForm from '../../../../assets/FINAL_PRE-REG_FORM-_CONTINUING_STUDENT-FILLABLE_1.pdf';

export default function PreRegistrationForContinuing(prereg) {

    const [successMessage, setSuccessMessage] = useState(null);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState({__html: ""});
    const onhandleChange = (event) => {
        setSelectedValue(event.target.value);
      }

  //-----
  const [disclaimer, setDisclaimer] = useState(false);

  //variables for the user inputs
  // const [startOfSchoolYear, setStartOfSchoolYear] = useState('');
  // const [endOfSchoolYear, setEndOfSchoolYear] = useState('');   
  // const [studentSchoolId, setStudentSchoolId] = useState(''); 
  // const [learnersReferenceNumber, setLearnersReferenceNumber] = useState(0);
  // const [lastName, setLastName] = useState('');
  // const [firstName, setFirstName] = useState('');
  // const [middleName, setMiddleName] = useState('');
  // const [maidenName, setMaidenName] = useState('');
  // const [yearLevel, setYearLevel] = useState('');
  // const [major, setMajor] = useState('');
  // const [section, setSection] = useState('B');
  // const [endOfTermToFinishDegree, setendOfTermToFinishDegree] = useState('');
  // const [lastOfTermTofinishDegree, setLastOfTermTofinishDegree] = useState('');
  // const [academicClassification, setAcademicClassification] = useState('');
  // const [lastSchoolAttended, setLastSchoolAttended] = useState('');
  // const [addressOfSchoolAttended, setAddressOfSchoolAttended] = useState('');
  // const [degree, setDegree] = useState('Bachelor of Science in Psychology');
  // const [dateOfBirth, setDateOfBirth] = useState('');
  // const [citizenship, setCitizenship] = useState('');
  // const [ethnicity, setEthnicity] = useState('');
  // const [contactNumber, setContactNumber] = useState('');
  // const [placeOfBirth, setPlaceOfBirth] = useState('');
  // const [sexAtBirth, setSexAtBirth] = useState('');
  // const [specialNeeds, setSpecialNeeds] = useState('');
  // const [email, setEmail] = useState('');
  // const [homeAddress, setHomeAddress] = useState('');
  // const [addressWhileStudyingAtBsu, setAddressWhileStudyingAtBsu] = useState('');
  // const [emergencyContactName, setEmergencyContactName] = useState('');
  // const [emergencyContactAddress, setEmergencyContactAddress] = useState('');
  // const [emergencyContactNumber, setEmergencyContactNumber] = useState('');
  // const [relationship, setRelationship] = useState('');
  // const [healthfacilityregistered, sethealthfacilityregistered] = useState('');
  // const [parenthealthfacilitydependent, setparenthealthfacilitydependent] = useState('');
  // const [vaccinationstatus, setvaccinationstatus] = useState('Not Vaccinated');
  // const [technologylevel, settechnologylevel] = useState('');
  // const [digitalliteracy, setdigitalliteracy] = useState('');
  // const [availfreehighereducation, setavailfreehighereducation] = useState('');
  // const [voluntarycontribution, setvoluntarycontribution] = useState('');
  // const [contributionamount, setcontributionamount] = useState('');
  // const [compliedtoadmissionpolicy, setcompliedtoadmissionpolicy] = useState('NO');
  // const [typeofstudent, setTypeOfStudent] = useState('Continuing');
  // const [candidateForGraduadtion, setCandidateForGraduadtion] = useState('');
  // const [semester, setSemester] = useState('');
  // const [studentStatus, setStudentStatus] = useState('');
  // const [userId, setUserId] = useState(0);

  const [preregData, setPreregData] = useState( {
    user_id: '',
    start_of_school_year: '',   
    end_of_school_year: '',
    student_school_id: '',      
    // learners_reference_number: '',
    last_name: '',              
    first_name: '',
    middle_name: '',            
    maiden_name: '',
    // academic_classification: '',
    // last_school_attended: '',
    // address_of_school_attended: '',
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
    complied_to_admission_policy: 'no',
    pre_reg_status: 'Pending',
    type_of_student: 'Continuing',
    student_status: 'Regular',
    year_level: '',
    semester: '1st Semester',
    major: '',
    candidate_for_graduation: '',
    end_of_term_to_finnish_degree: '',
    last_of_term_to_finnish_degree: '',
    section: 'b',
  });


  useEffect(() => {
    setDisclaimer(true); // Set showModal to true when the component mounts
  }, []); 

  const handleCloseDisclaimer = () => {
    setDisclaimer(false);
  };

  const onPrint =() => {
    // PDF modification code======================================================================
    //for new incoming first years
    const fetchPdf = async () => {
    // Extract the first character of the middle name as the middle initial
    const middleInitial = preregData.middle_name ? preregData.middle_name.charAt(0) + '.' : '';

    // Combine last name, first name, and middle initial with comma and dot
    const fullName = `${preregData.last_name}, ${preregData.first_name} ${middleInitial}`;

    // Convert the integer term to text
    // Combine two terms start and End
    const integerstartOfSchoolYear = preregData.start_of_school_year;
    const textstartOfSchoolYear = integerstartOfSchoolYear.toString();
    const integerendOfSchoolYear = preregData.end_of_school_year;
    const textendOfSchoolYear = integerendOfSchoolYear.toString();
    const fullTerm = 'First Semester, ' + textstartOfSchoolYear + ' - ' + textendOfSchoolYear;

    // Convert the integer to text before assigning TO FIX!!
    const integerstudentSchoolId = preregData.student_school_id;
    const textstudentSchoolId = integerstudentSchoolId.toString();

    const integerValuecontactnumber = preregData.contact_number;
    const textcontactnumber = integerValuecontactnumber.toString();

    const integerValuecontactPersonNumber = preregData.contact_person_number;
    const textcontactPersonNumber = integerValuecontactPersonNumber.toString();

    const integerValuecontactPersonAddress = preregData.contact_person_address;
    const textcontactPersonAddress = integerValuecontactPersonAddress.toString();

    const integerValuecontributionAmount = preregData.contribution_amount;
    const textcontributionAmount = integerValuecontributionAmount.toString();


    try {
    const pdfBytes = await fetch(preregContinuingForm).then((res) => res.arrayBuffer()); 
    const pdfDoc = await PDFDocument.load(pdfBytes);

    const form = pdfDoc.getForm();


    const dateField = form.getTextField('text_c_date_applied');
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
    console.error("Field 'text_c_date_applied' not found");
    }


    const Term = form.getTextField('text_c_term');
    Term.setText(fullTerm);


    const studentSchoolId = form.getTextField('text_c_student_ID');
    if (studentSchoolId) {
    studentSchoolId.setText(textstudentSchoolId);
    } else {
    console.error(`Field ${studentSchoolId} not found`);
    }
    const name = form.getTextField('text_c_student_name');
    const maidenName = form.getTextField('text_c_student_maiden');

    const candidate_for_graduation = form.getTextField('text_c_candidate');
    if (preregData.candidate_for_graduation === 'YesCandidate') {
    candidate_for_graduation.setText('Yes');
    } else if(preregData.candidate_for_graduation === 'NoCandidate'){
    candidate_for_graduation.setText('No');
    }
    else {
    console.error(`Field ${candidate_for_graduation} not found`);
    }
    const student_status = form.getTextField('text_10bwea'); //Unedited PDF form, still working
    const degreeProgram = form.getTextField('text_c_degree');
    const major = form.getTextField('text_c_major');
    const end_of_term_to_finnish_degree = form.getTextField('text_c_endTerm');
    const last_of_term_to_finnish_degree = form.getTextField('text_c_lastTerm');
    const dateOfBirth = form.getTextField('text_c_date_birth');
    const citizenship = form.getTextField('text_c_citizenship');
    const ethnicity = form.getTextField('text_c_ethnicity');
    const placeOfBirth = form.getTextField('text_c_birth_place');
    const sexAtBirth = form.getTextField('text_c_student_sex');
    const specialNeeds = form.getTextField('text_c_special_needs');
    const emailAddress = form.getTextField('text_c_student_email');

    const contactNumber = form.getTextField('text_c_student_contact_num');
    if (contactNumber) {
    contactNumber.setText(textcontactnumber);
    } else {
    console.error(`Field ${contactNumber} not found`);
    }

    const permanentAddress = form.getTextField('text_c_pAddress');
    const addressWhileStudying = form.getTextField('text_c_wsAddress');
    const year_level = form.getTextField('text_c_year_level');

    //person to contact in case of emergency
    const contactPersonName = form.getTextField('text_c_em_name');
    const contactPersonAddress = form.getTextField('text_c_em_address'); 
    if (contactPersonAddress) {
    contactPersonAddress.setText(textcontactPersonAddress);
    } else {
    console.error(`Field ${contactPersonAddress} not found`);
    }

    const contactPersonNumber = form.getTextField('text_c_em_number');
    if (contactPersonNumber) {
    contactPersonNumber.setText(textcontactPersonNumber);
    } else {
    console.error(`Field ${contactPersonNumber} not found`);
    }
    const contactPersonRelationship = form.getTextField('text_c_em_relationship');
    const healthfacilityregistered = form.getTextField('text_c_ic_registered');
    const parentHealthFacilityDependent = form.getTextField('text_c_ic_dependent');
    const vaccinationStatus = form.getTextField('text_c_ic_vax_stat');

    const txttechnologyLevel = preregData.technology_level;
    const technologylevel = form.getTextField('text_c_dcl_level');
    if (txttechnologyLevel === 'category1') {
    technologylevel.setText('Proficient');
    } else if (txttechnologyLevel === 'category2') {
    technologylevel.setText('Advanced');
    } else if (txttechnologyLevel === 'category3') {
    technologylevel.setText('Beginner');
    } else {
    console.error(`Field ${technologylevel} not found`);
    }

    const txttype_of_student = preregData.type_of_student;
    const checkbox_c_continuing = form.getCheckBox('checkbox_c_continuing');
    if (txttype_of_student === 'Continuing') {
    checkbox_c_continuing.check();
    } else {
    checkbox_c_continuing.check();
    console.log("checkbox", txttype_of_student);
    }

    const txtdigitalLiteracy = preregData.digital_literacy;
    const digitalLiteracy = form.getTextField('text_c_dcl_category');
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
    const checkboxfheavailyes = form.getCheckBox('checkbox_c_fhe_avail_yes');
    const checkboxfheavailno = form.getCheckBox('checkbox_c_fhe_avail_no');
    if (availFreeHigherEducation === 'YesAvail') {
    checkboxfheavailyes.check();
    checkboxfheavailno.uncheck();
    console.log("checkbox", availFreeHigherEducation);
    } else {
    checkboxfheavailyes.uncheck();
    checkboxfheavailno.check();
    console.log("checkbox", availFreeHigherEducation);
    }

    const contributionAmount = form.getTextField('text_c_fhe_amount');
    if (contributionAmount) {
    contributionAmount.setText(textcontributionAmount);
    } else {
    console.error(`Field ${contributionAmount} not found`);
    }

    const voluntaryContribution = preregData.voluntary_contribution;
    const checkboxYesContribute = form.getCheckBox('checkbox_c_fhe_con_yes');
    const checkboxNoContribute = form.getCheckBox('checkbox_c_fhe_con_no');
    if (voluntaryContribution === 'YesContribute') {
    checkboxYesContribute.check();
    checkboxNoContribute.uncheck();
    console.log("checkbox", voluntaryContribution);
    } else {
    checkboxYesContribute.uncheck();
    checkboxNoContribute.check();
    console.log("checkbox", voluntaryContribution);
    }

    name.setText(fullName)
    maidenName.setText(preregData.maiden_name);
    degreeProgram.setText(preregData.degree);
    major.setText(preregData.major);
    end_of_term_to_finnish_degree.setText(preregData.end_of_term_to_finnish_degree);
    last_of_term_to_finnish_degree.setText(preregData.last_of_term_to_finnish_degree);
    dateOfBirth.setText(preregData.date_of_birth);
    citizenship.setText(preregData.citizenship);
    ethnicity.setText(preregData.ethnicity);
    placeOfBirth.setText(preregData.place_of_birth);
    sexAtBirth.setText(preregData.sex_at_birth);
    specialNeeds.setText(preregData.special_needs);
    emailAddress.setText(preregData.email_address);
    permanentAddress.setText(preregData.home_address);
    addressWhileStudying.setText(preregData.address_while_studying);
    year_level.setText(preregData.year_level);
    contactPersonName.setText(preregData.contact_person_name);
    contactPersonRelationship.setText(preregData.contact_person_relationship);
    healthfacilityregistered.setText(preregData.health_facility_registered);
    parentHealthFacilityDependent.setText(preregData.parent_health_facility_dependent);
    vaccinationStatus.setText(preregData.vaccination_status);
    student_status.setText(preregData.student_status);

    const finalPDF = await pdfDoc.save();

    download(finalPDF, 'Student_Continuing.pdf', 'application/pdf');
    } catch (error) {
    console.error('Error loading PDF:', error);
    }
    };

    // Call the fetchPdf function directly in your component code
    fetchPdf();

    }

    const handleClear = () => {
      console.log("Inside handleClear function");
      window.location.reload();
    setPreregData(prevData => ({
    ...prevData,
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
    semester: '',
    end_of_term_to_finnish_degree: '',
    last_of_term_to_finnish_degree: '',
    major: '',
    year_level: ''
    }));
    console.log("Closing modal");
    setShowModal(false);
    }

    //On submit axios
      const onSubmit = (ev) => {
        ev.preventDefault();
        setError({ __html: "" });
        console.log(preregData);
            
        axiosClient
        .post('/preregcontinuingtmp', {
          user_id: 1,
          student_school_id: preregData.student_school_id,
          start_of_school_year: parseInt(preregData.start_of_school_year),
          end_of_school_year: parseInt(preregData.end_of_school_year),
          // learners_reference_number: parseInt(preregData.learners_reference_number),
          last_name: preregData.last_name,
          first_name: preregData.first_name,
          middle_name: preregData.middle_name,
          maiden_name: preregData.maiden_name,
          //  academic_classification: preregData.academic_classification,
           last_school_attended: preregData.last_school_attended,
           address_of_school_attended: preregData.address_of_school_attended,
          degree: 'Bachelor of Science in Psychology',
          date_of_birth: preregData.date_of_birth,
          place_of_birth: preregData.place_of_birth,
          citizenship: preregData.citizenship,
          sex_at_birth: preregData.sex_at_birth,
          ethnicity: preregData.ethnicity,
          special_needs: preregData.special_needs,
          contact_number: parseInt(preregData.contact_number),
          email_address: preregData.email_address,
          home_address: preregData.home_address,
          address_while_studying: preregData.address_while_studying,
          contact_person_name: preregData.contact_person_name,
          contact_person_number: parseInt(preregData.contact_person_number), 
          contact_person_address: preregData.contact_person_address,
          contact_person_relationship: preregData.contact_person_relationship,
          year_level: preregData.year_level,
          pre_reg_status: preregData.pre_reg_status,
          type_of_student: 'Continuing',
          major: preregData.major,
          candidate_for_graduation: preregData.candidate_for_graduation,
          end_of_term_to_finnish_degree: preregData.end_of_term_to_finnish_degree,
          last_of_term_to_finnish_degree: preregData.last_of_term_to_finnish_degree,
          health_facility_registered: preregData.health_facility_registered,
          parent_health_facility_dependent: preregData.parent_health_facility_dependent,
          vaccination_status: preregData.vaccination_status,
          technology_level: preregData.technology_level,
          digital_literacy: preregData.digital_literacy,
          avail_free_higher_education: preregData.avail_free_higher_education,
          voluntary_contribution: preregData.voluntary_contribution,
          contribution_amount: preregData.contribution_amount,
          complied_to_admission_policy: preregData.complied_to_admission_policy,
          section: preregData.section,
          student_status: preregData.student_status,
        }).then(({ data }) => {
          onPrint();
          //setFamilyName(data.family_name)
          setSuccessMessage({
            message: 'Congratulations! You have finished your pre-registration. Here is a pdf copy of your form. Print and show this to the admission officer for further instructions.',
          });
    
          setTimeout(() => {
            setSuccessMessage(null);
            handleClear();
            // closeModal();
          }, 5000);
        })
        .catch(( error ) => 
        
        {setSuccessMessage({
          message: 'Missing Data or invalid email, please double check.',
        });
  
        setTimeout(() => {
          setSuccessMessage(null);
          // closeModal();
        }, 3000);

          if (error.response) {
            const finalErrors = Object.values(error.response.data.errors).reduce((accum, next) => [...accum,...next], [])
            setError({__html: finalErrors.join('<br>')})
            setSuccessMessage({
              message: 'Please Fill in ALL of the NECESSARY details.',
            });
            setTimeout(() => {
              setSuccessMessage(null);
              // closeModal();
            }, 3000);
          }
            console.error(error)
        });
      };
      

    

      //clearing the input fields using the reset button
   

  return (
    <>
    <main className="w-[100%] h-[100%]">
        <div className="lg:w-8/12 px-4 container mx-auto">          
            <div className="rounded-t bg-grayGreen mb-0 px-6 py-9 items-center  "> {/**BOX  with contents*/}
                <section style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div className="">
                    <img src={schoolLogo}
                        className="object-cover btn- h-20 w-20 rounded-full bg-gray-300" alt="BSU Logo" />
                    </div>
                    <div className="flex flex-col justify-between pl-10">
                    <span className="text-sm font-bold">PRE-REGISTRATION FORM</span> 
                    <span className="text-sm">(UG RETURNEE OR CONTINUING STUDENT)</span>
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
                        {/**=========================== Shoolyear - Date ==========================*/}  
                        <div className="flex flex-wrap flex-row px-3 -mx-3 mb-3">               
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 mt-5">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mt-2 mb-2" htmlFor="grid-schoolyear">
                              Semester :
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            value={preregData.semester}
                            onChange={(ev) => setPreregData({ ...preregData, semester: ev.target.value })}
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
                                        min={new Date().getFullYear()} // Set minimum year to current year
                                        max={new Date().getFullYear() + 5} // Set maximum year to 5 years after current year
                                        step="1" // Year step
                                        maxLength={4}
                                        value={preregData.start_of_school_year}
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
                                        min={new Date().getFullYear()} // Set minimum year to current year
                                        max={new Date().getFullYear() + 5} // Set maximum year to 5 years after current year
                                        step="1" // Year step
                                        value={preregData.end_of_school_year}
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

                        {/**=========================== Last Name - Maiden Name ==========================*/} 
                        <div className="flex flex-wrap flex-row -mx-3 mb-2">
                            {/**SCHOOL ID */}
                            <div className="w-full px-3 mb-6 md:mb-0 mt-2">
                            <div className="input-container relative">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-studentMaidenname">
                                    Student ID No:
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                id="grid-`  `" 
                                type="text"
                                pattern="\d{0,7}"
                                title="Input numeric characters only. (0 to 9)"
                                inputmode="numeric"
                                maxLength={7}
                                value={preregData.student_school_id}
                                onChange={(ev) => setPreregData({ ...preregData, student_school_id: ev.target.value })} 
                                />          
                                <img
                                  src={info}
                                  alt="info"
                                  className="absolute right-3 top-[50%] h-6 w-6"
                                  title="Input numeric characters only. (0 to 9)"
                                />
                                </div>
                            </div>
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
                                value={preregData.lastName}
                                maxLength={30}
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
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-studentFirstname">
                                    First Name :
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                id="grid-studentFirstname" 
                                type="text"
                                pattern="[A-Za-zñÑ .-]+"
                                title="Input your Legal Given Name/s, with your Suffix, if applicable."
                                value={preregData.firstName}
                                maxLength={50}
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
                                title="Input your Legal Middle Name. Leave blank if not applicable."
                                value={preregData.middleName}
                                maxLength={30}
                                onChange={ev => {
                                  const value = ev.target.value.replace(/[^A-Za-zñÑ -]/g, '');
                                  setPreregData({ ...preregData, middle_name: value });
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
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-studentMaidenname">
                                    Maiden Name :
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                id="grid-studentMaidenname" 
                                type="text" 
                                //pattern="[A-Za-zñÑ .\\/-]+"
                                title="Input 'N/A' if not applicable."
                                value={preregData.maidenName}
                                maxLength={30}
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

                        {/**=========================== Type of Student - Year Level ========================== */}
                        <div className="flex flex-wrap flex-row mx-0 mb-2">
                            

                            {/**Year Level */}
                            <div className='flex flex-col w-full md:w-1/2 px-3 mt-5'>
                            <div className="input-container relative">
                                <span className= "text-sm font-semibold">Year Level : </span> <hr className="w-[40%]"/>
                                <div className='mt-2'>
                                    <input name="yearlevel"
                                            className="bg-gray-50 border border-gray-300 mt-2 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 "
                                            type="text"
                                            pattern="^[1-4]$"
                                            title="Input numeric characters only. (1 to 4)"
                                            inputmode="numeric"
                                            maxLength={1}
                                            value={preregData.yearLevel}
                                            onChange={(ev) => {
                                              setPreregData({ ...preregData, year_level: ev.target.value })
                                              // Check if the input matches the pattern or if it's an empty string (allowing backspace and delete)
                                              if (/^[1-4]*$/.test(value)) {
                                                // Update the state with the valid input
                                                setYearLevel(value);
                                              }
                                            }}
                                            />
                                            <img
                                              src={info}
                                              alt="info"
                                              className="absolute right-3 top-[50%] h-6 w-6"
                                              title="Input numeric characters only. (1 to 4)"
                                            />
                                </div> 
                                </div>                            
                            </div>
                        </div> <hr/>

                        {/**=========================== Degree - Major ========================== */}
                        <div className="flex flex-wrap flex-row mx-0 mb-3">
                            {/**Degree */}
                            <div className='flex flex-col px-3 mt-5 w-full md:w-1/2'>
                                <span className= "text-sm font-semibold">Degree : </span> <hr className="w-[40%]"/>
                                <div className='mt-2'>
                                    <input className="bg-gray-50 border border-gray-300 mt-2 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 "
                                        name="degree"
                                        type='text'
                                        placeholder=''
                                        value="Bachelor of Science in Psychology"
                                        disabled readOnly/>
                                </div>
                            </div>

                            {/**Major */}
                            <div className='flex flex-col px-3 mt-5 w-full md:w-1/2'>
                            <div className="input-container relative">
                                <span className= "text-sm font-semibold">Major if Applicable : </span> <hr className="w-[40%]"/>
                                <div className='mt-2'>
                                    <input className="bg-gray-50 border border-gray-300 mt-2 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 "
                                        name="major"
                                        type='text'
                                        placeholder='(optional)'
                                        title="Leave blank if not applicable."
                                        value={preregData.major}
                                        onChange={(ev) => setPreregData({ ...preregData, major: ev.target.value })}
                                    />
                                    <img
                                      src={info}
                                      alt="info"
                                      className="absolute right-3 top-[50%] h-6 w-6"
                                      title="Leave blank if not applicable."
                                    />
                                </div>
                                </div>
                            </div>
                        </div> <hr />

                        {/**=========================== Candidate for Graduation - End of term ========================== */}
                        <div className="flex flex-wrap flex-row mx-0 mb-3">
                            {/**Candidate */}
                            <div className='flex flex-col px-3 mt-5 w-full md:w-1/2'>
                                <span className= "text-sm font-semibold">Candidate for Graduation this semester? : </span> <hr className="w-[40%]"/>
                                <div className="flex flex- row justify-left mx-6 ">
                                    {/**Radio buttion for Yes */}
                                    <div className='mx-5 mt-2'>
                                        <input className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                            type="radio"
                                            name="candidateofgraduation"
                                            id="yes"
                                            value='YesCandidate' 
                                            checked={preregData.candidate_for_graduation === 'YesCandidate'}
                                            onChange={(ev) => setPreregData({ ...preregData, candidate_for_graduation: ev.target.value })}
                                            />
                                            
                                        <label
                                            className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                                            htmlFor="candidateforgrad">Yes
                                        </label>
                                    </div>
                                    {/**Radio buttion for No */}
                                    <div className='mx-5 mt-2'>
                                        <input
                                            className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] "
                                            type="radio"
                                            name="candidateofgraduation"
                                            id="no"
                                            value="NoCandidate"
                                            checked={preregData.candidate_for_graduation === 'NoCandidate'}
                                            onChange={(ev) => setPreregData({ ...preregData, candidate_for_graduation: ev.target.value })}
                                            />
                                            
                                        <label
                                            className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                                            htmlFor="candidateforgrad">No
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/**End of term */}
                            <div className='flex flex-col px-3 mt-5 w-full md:w-1/2'>
                            <div className="input-container relative">
                                <span className= "text-sm font-semibold">End of Term/Semester to Finish Degree Program : </span> <hr className="w-[40%]"/>
                                <div className='mt-2'>
                                    <input className="bg-gray-50 border border-gray-300 mt-2 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 "
                                        name="major"
                                        type='text'
                                        placeholder='(eg. 2nd Semester, SY: 2026-2027)'
                                        title="Input the end of term using the format given. FORMAT eg.: 2nd Semester, SY: 2026-2027"
                                        value={preregData.end_of_term_to_finnish_degree}
                                        onChange={(ev) => setPreregData({ ...preregData, end_of_term_to_finnish_degree: ev.target.value })}
                                    />
                                    <img
                                      src={info}
                                      alt="info"
                                      className="absolute right-3 top-[65%] h-6 w-6"
                                      title="Input the end of term using the format given. FORMAT eg.: 2nd Semester, SY: 2026-2027"
                                    />
                                </div>
                                </div>
                            </div>
                        </div> <hr />

                        {/**=========================== Status - Last of term ========================== */}
                        <div className="flex flex-wrap flex-row mx-0 mb-3">
                            {/**Status */}
                            <div className='flex flex-col px-3 mt-5 w-full md:w-1/2'>
                                <span className= "text-sm font-semibold">Status : </span> <hr className="w-[40%]"/>
                                <div className="flex flex- row justify-left mx-6 ">
                                    {/**Radio buttion for Regular */}
                                    <div className='mx-5 mt-2'>
                                        <input className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                            type="radio"
                                            name="studentstatus"
                                            id="yes"
                                            value="Regular" 
                                            checked={preregData.student_status === 'Regular'}
                                            onChange={(ev) => setPreregData({ ...preregData, student_status: ev.target.value })}
                                            />
                                        <label
                                            className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                                            htmlFor="studentstatus">Regular
                                        </label>
                                    </div>
                                    {/**Radio buttion for Irregular */}
                                    <div className='mx-5 mt-2'>
                                        <input
                                            className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                            type="radio"
                                            name="studentstatus"
                                            id="no"
                                            value="Irregular"
                                            checked={preregData.student_status === 'Irregular'}
                                            onChange={(ev) => setPreregData({ ...preregData, student_status: ev.target.value })}
                                            />
                                        <label
                                            className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                                            htmlFor="studentstatus">Irregular
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/**End of term */}
                            <div className='flex flex-col px-3 mt-5 w-full md:w-1/2'>
                            <div className="input-container relative">
                                <span className= "text-sm font-semibold">Last Term/ Semester of Enrollment Degree Program : </span> <hr className="w-[40%]"/>
                                <div className='mt-2'>
                                    <input className="bg-gray-50 border border-gray-300 mt-2 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 "
                                        name="major"
                                        type='text'
                                        title="Input the last term enrolled using the format given. FORMAT eg.: 2nd Semester, SY: 2022-2023"
                                        placeholder='(eg. 2nd Semester, SY: 2022-2023)'
                                        value={preregData.last_of_term_to_finnish_degree}
                                        onChange={(ev) => setPreregData({ ...preregData, last_of_term_to_finnish_degree: ev.target.value })}
                                    />
                                    <img
                                      src={info}
                                      alt="info"
                                      className="absolute right-3 top-[65%] h-6 w-6"
                                      title="Input the last term enrolled using the format given. FORMAT eg.: 2nd Semester, SY: 2022-2023"
                                    />
                                  </div>
                                </div>
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
                                value={preregData.date_of_birth}
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
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-emailaddress" 
                            type="text" 
                            pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                            placeholder=""
                            value={preregData.email_address}
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
                            <label className=" text-gray-700 text-xs font-bold mb-2" htmlFor="grid-homeaddress">Permanent Address :</label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-homeaddress" 
                            type="text" 
                            title="Input your home address using the format given. FORMAT: Bldg No., Street, Barangay, City/Municipality"
                            placeholder="Bldg No., Street, Barangay, City/Municipality"
                            value={preregData.home_address}
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
                        
                        {/**=========================== Emergy Contact ==========================*/} 
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
                          checked={preregData.health_facility_registered === 'Yes'}
                          onChange={(ev) => setPreregData({ ...preregData, health_facility_registered: ev.target.value })}
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
                          checked={preregData.health_facility_registered === 'No'}
                          onChange={(ev) => setPreregData({ ...preregData, health_facility_registered: ev.target.value })}
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
                      onChange={(ev) => setPreregData({ ...preregData, vaccination_status: ev.target.value })} 
                      value={preregData.vaccination_status}>
                      <option 
                        value="Not Vaccinated">
                          Not Vaccinated</option>
                      <option 
                        value="Fully Vaccinated">
                          Fully Vaccinated</option>
                      <option 
                        value="Not Fully Vaccinated">
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
                          checked={preregData.parent_health_facility_dependent === 'Yes'}
                          onChange={(ev) => setPreregData({ ...preregData, parent_health_facility_dependent: ev.target.value })}
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
                          checked={preregData.parent_health_facility_dependent === 'No'}
                          onChange={(ev) => setPreregData({ ...preregData, parent_health_facility_dependent: ev.target.value })}
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
                                checked={preregData.technology_level === 'category1'}
                                onChange={(ev) => setPreregData({ ...preregData, technology_level: ev.target.value })}
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
                                checked={preregData.technology_level === 'category2'}
                                onChange={(ev) => setPreregData({ ...preregData, technology_level: ev.target.value })}
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
                                checked={preregData.technology_level === 'category3'}
                                onChange={(ev) => setPreregData({ ...preregData, technology_level: ev.target.value })}
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
                              checked={preregData.digital_literacy === 'lvl1'}
                              onChange={(ev) => setPreregData({ ...preregData, digital_literacy: ev.target.value })}
                              />
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
                              checked={preregData.digital_literacy === 'lvl2'}
                              onChange={(ev) => setPreregData({ ...preregData, digital_literacy: ev.target.value })}
                              />
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
                              checked={preregData.digital_literacy === 'lvl3'}
                              onChange={(ev) => setPreregData({ ...preregData, digital_literacy: ev.target.value })}
                              />
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
                                    checked={preregData.avail_free_higher_education === 'YesAvail'}
                                    onChange={(ev) => setPreregData({ ...preregData, avail_free_higher_education: ev.target.value })}
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
                                    checked={preregData.avail_free_higher_education === 'NoAvail'}
                                    onChange={(ev) => setPreregData({ ...preregData, avail_free_higher_education: ev.target.value })}
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
                                {/**Radio buttion for Yes registered */}
                                <div className='mx-5 mt-2'>
                                    <input className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                        type="radio"
                                        name="yescontribute"
                                        id="yescontribute"
                                        value="YesContribute" 
                                        checked={preregData.voluntary_contribution === 'YesContribute'}
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
                                {/**Radio buttion for No registered */}
                                <div className='mx-5 mt-2'>
                                    <input className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                        type="radio"
                                        name="nocontribute"
                                        id="nocontribute"
                                        value="NoContribute" 
                                        checked={preregData.voluntary_contribution === 'NoContribute'}
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
        {/*moved 'section/course(s) to be enrolled' to formviews*/}
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
    {disclaimer && (
        <div className="fixed top-0 left-0 w-full h-full overflow-y-auto bg-black bg-opacity-50">
        <div className="lg:w-3/4 px-4 py-1 shadow-lg w-[20%] h-fit bg-[#FFFFFF] rounded-xl mt-[10%] mx-auto p-5">
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