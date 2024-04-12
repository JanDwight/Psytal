import React, {useEffect, useState} from 'react'
import schoolLogo from "@assets/BSUlogo.png";
import date from "@assets/calendar.png";
import axiosClient from '../../../../axios';
import { Navigate } from 'react-router-dom';
import { PDFDocument } from 'pdf-lib'
import download from 'downloadjs';
import preregContinuingForm from '../../../../assets/FINAL_PRE-REG_FORM-_CONTINUING_STUDENT-FILLABLE_1.pdf';
import ReactModal from 'react-modal';
import Feedback from '../../../feedback/Feedback';
import AcceptPrompt from '../../prompts/AcceptPrompt';
import DeclinePrompt from '../../prompts/DeclinePrompt';


export default function PreRegistrationForContinuingView({prereg}) {
    const oldprereg = prereg;
    const [error, setError] = useState({__html: ""});

    const [subjectData, setSubjectData] = useState([]); //<><><><><>
    const [studentCheckList, setStudentCheckList] = useState([]);
    const [totalUnits, setTotalUnits] = useState(0); //<><><><><>

    const [successMessage, setSuccessMessage] = useState('');
    const [successStatus, setSuccessStatus] = useState('');

    const [allowEdit, setAllowEdit] = useState(''); // auto=editable, auto=not editable\
    const [showPromptA, setShowPromptA] = useState(false);
    const [showPromptD, setShowPromptD] = useState(false);
    const [promptMessage, setPromptMessage] = useState('');
    const [action, setAction] = useState('');

    const [semesterInformation, setSemesterInformation] = useState('');
  //<><><><><>

  function checkAccept() {
    if (oldprereg.pre_reg_status === 'Accepted'){
      setAllowEdit('none');
    } else if (oldprereg.pre_reg_status === 'Pending') {
      setAllowEdit('auto');
    } else if (oldprereg.pre_reg_status === 'Declined'){
      setAllowEdit('none');
    } else {
      setAllowEdit('auto');
    }
  }

  //semesterinfo
  function fetchSemester() {
    axiosClient
      .get('/getsemesterinformation')
      .then((res) => {
        setSemesterInformation(res.data.semester);  // Assuming res.data is an array
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    checkAccept(); // Call the fetchData function
    fetchSemester();
  }, []);

  //<><><><><>
  const promptAccept = (ev) => {
    ev.preventDefault();
    const concatmessage = 'This pre-registration for "' + oldprereg.full_name + '" will be accepted. Do you wish to proceed?';
    setAction('Confirm Accept Pre-registration');
    setPromptMessage(concatmessage);
    setShowPromptA(true);
  }

  //<><><><><>
  const promptDecline = (ev) => {
    ev.preventDefault();
    const concatmessage = 'This pre-registration for "' + oldprereg.full_name + '" will be declined. Do you wish to proceed?';
    setAction('Confirm Decline Pre-registration');
    setPromptMessage(concatmessage);
    setShowPromptD(true);
  }

    const [selectedClassYear, setSelectedClassYear] = useState('All');

    const uniqueClassYears = ['Class Year', '1st', '2nd', '3rd', '4th'];

    const allowChange = () => {
      setAllowEdit('auto');
      console.log('Edit Status: ', allowEdit);
    }
  
    const noChange = () => {
      setAllowEdit('none');
      console.log('Edit Status: ', allowEdit);
    }

      //variable for inputs
      const [preregData, setPreregData] = useState(prereg, {
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
        degree: '',
        major:'',
        //section here
        //end of term here
        end_of_term_to_finnish_degree: '',
        last_of_term_to_finnish_degree: '',
        date_of_birth: '',
        place_of_birth: '',
        citizenship: '',
        sex_at_birth: '',
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
        type_of_student: 'Continuing',
        year_level: '',
        student_status: 'Regular',
        candidate_for_graduation: '',
      });


      //auto fill dropdown
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axiosClient.get('/getstudentclassesadmin', {params: {last_name: prereg.last_name, first_name: prereg.first_name, middle_name: prereg.middle_name}});
        const classData = response.data; 
        setStudentCheckList(classData); // Set the data in the state
      } catch (error) {
        console.error('Error fetching data from the database:', error);
      }
    }
  
    fetchData(); // Call the fetchData function
  }, []);

  const [inputFields, setInputFields] = useState([
    { class_id: '', classCode: '', courseCode: '', units: '', bcac: 'N/A' }
  ]);


    //calling the Form in the adding of classes
    const handleSubmitCourseUnits = (e) => {
        e.preventDefault();
        console.log("InputFields", inputFields);
      };
    //Changing the input fields
    // Changing the input fields
    const handleChangeInput = (index, event) => {
      const { name, value } = event.target;
      const updatedInputFields = [...inputFields];
    
      // Update the input field based on the name
      updatedInputFields[index] = {
        ...updatedInputFields[index],
        [name]: value,
      };
    
      // If the changed field is Class Code, update Course Code and Unit/s
      if (name === 'classCode') {
        const [classId, classCode] = value.split('-');
    
        // Find the selected subject data based on classId
        const selectedSubject = subjectData.find(item => item.class_id === parseInt(classId, 10));
    
        // Update Course Code and Unit/s
        updatedInputFields[index] = {
          ...updatedInputFields[index],
          class_id: selectedSubject ? selectedSubject.class_id : '',
          courseCode: selectedSubject ? selectedSubject.course_code : '',
          units: selectedSubject ? selectedSubject.units : '',
        };
      }
    
      setInputFields(updatedInputFields);
    };
    //For Adding
    const handleAddFields = () => {
        setInputFields([...inputFields, { classCode: '', courseCode: '', units: '', bcac: '' }])
      }
    //For removing
    const handleRemoveFields = (index) => {
        const values  = [...inputFields];
        values.splice(index, 1);
        setInputFields(values);
      }
      const onDecline = () => {
       
        
        setSuccessMessage('Loading...');
        setSuccessStatus('Loading');

        axiosClient
        // create Update function for preregincommingtmp
        .put(`/preregcheck/${preregData.id}`, {
          pre_reg_status: 'Declined'
        })
        .then(({ data }) => {
         
          //for sending emails============================================================================
          // Assuming formData is your FormData object
          let formData = new FormData();
    
          // Append some data to the FormData object
          formData.append('email', preregData.email_address);
          // Convert FormData to an object
          let formDataObject = Array.from(formData.entries()).reduce((obj, [key, value]) => {
            obj[key] = value;
            return obj;
          }, {});
          axiosClient
            .get('/senddeclineemail', {
              params: formDataObject
            })
            .then((response) => {
              setSuccessMessage(response.data.message);
              setSuccessStatus(response.data.success);
          })
        })
      }
    
    
    //units calc
    const handleChangeUnits = (index, value) => {
        // Calculate the unit difference
        const oldUnits = parseInt(inputFields[index].units || 0, 10);
        const newUnits = parseInt(value || 0, 10);
        const unitDifference = newUnits - oldUnits;
      
        // Update the total units by adding the unit difference
        setTotalUnits(totalUnits + unitDifference);
      
        // Update the input fields with the new "units" value
        const fields = [...inputFields];
        fields[index] = { ...fields[index], units: value };
        setInputFields(fields);
      };

        //auto fill dropdown
        useEffect(() => {
          async function fetchData() {
            try {
              const response = await axiosClient.get('/classes');
              const classData = response.data; // Set the data in the state
              setSubjectData(classData); // Set the data in the state
            } catch (error) {
              console.error('Error fetching data from the database:', error);
            }
          }
        
          fetchData(); // Call the fetchData function
        }, []);

        //<><><><><>
        const onSaveChanges = () =>{
          axiosClient
            .put(`/preregcheck/${preregData.id}`, {
              start_of_school_year: parseInt(preregData.start_of_school_year),
              end_of_school_year: parseInt(preregData.end_of_school_year),
              student_school_id: parseInt(preregData.student_school_id),
              // learners_reference_number: parseInt(preregData.learners_reference_number),
              last_name: preregData.last_name,
              first_name: preregData.first_name,
              middle_name: preregData.middle_name,
              maiden_name: preregData.maiden_name,
              // academic_classification: preregData.academic_classification,
              // last_school_attended: preregData.last_school_attended,
              // address_of_school_attended: preregData.address_of_school_attended,
              degree: preregData.degree,
              major: preregData.major,
              //section here
              end_of_term_to_finnish_degree: preregData.end_of_term_to_finnish_degree,
              last_of_term_to_finnish_degree: preregData.last_of_term_to_finnish_degree,
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
              contact_person_number: preregData.contact_person_number, 
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
              candidate_for_graduation: preregData.candidate_for_graduation,
              pre_reg_status: 'Accepted',
              type_of_student: preregData.type_of_student,
              year_level: preregData.year_level,
              student_status: preregData.student_status,
              semester: preregData.semester
            }).then((response)=> {
              setSuccessMessage(response.data.message);
              setSuccessStatus(response.data.success);
            })
        }

       //On Accept Click
        const onClickAccept = (ev) => {
          // ev.preventDefault();
          setSuccessMessage('Loading...');
          setSuccessStatus('Loading');
          
          setError({ __html: "" });
        //--------------------------// <><><><><>
        axiosClient.post('/student_subject', {
          studentData: preregData,
          subjectData: inputFields, // Exclude the last element
          yearLevel: preregData.year_level, //unknown how to approach
          term: semesterInformation,
        }).then()
        //--------------------------// <><><><><>
    
        //prereg update===============================================================================
            axiosClient
            .put(`/preregcheck/${preregData.id}`, {
              start_of_school_year: parseInt(preregData.start_of_school_year),
              end_of_school_year: parseInt(preregData.end_of_school_year),
              student_school_id: parseInt(preregData.student_school_id),
              // learners_reference_number: parseInt(preregData.learners_reference_number),
              last_name: preregData.last_name,
              first_name: preregData.first_name,
              middle_name: preregData.middle_name,
              maiden_name: preregData.maiden_name,
              // academic_classification: preregData.academic_classification,
              // last_school_attended: preregData.last_school_attended,
              // address_of_school_attended: preregData.address_of_school_attended,
              degree: preregData.degree,
              major: preregData.major,
              //section here
              end_of_term_to_finnish_degree: preregData.end_of_term_to_finnish_degree,
              last_of_term_to_finnish_degree: preregData.last_of_term_to_finnish_degree,
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
              contact_person_number: preregData.contact_person_number, 
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
              candidate_for_graduation: preregData.candidate_for_graduation,
              pre_reg_status: 'Accepted',
              type_of_student: preregData.type_of_student,
              year_level: preregData.year_level,
              student_status: preregData.student_status
            })
              //for sending emails============================================================================
              // Assuming formData is your FormData object
              let formData = new FormData();

              const fullName = `${preregData.last_name}, ${preregData.first_name} ${preregData.middle_name.charAt(0)}.`;
              
              // Append some data to the FormData object
              formData.append('fullName', fullName);
              formData.append('email', preregData.email_address);
              formData.append('role', '4')

              // Convert FormData to an object
              let formDataObject = Array.from(formData.entries()).reduce((obj, [key, value]) => {
                obj[key] = value;
                return obj;
              }, {});
            
              axiosClient
              .get('/preRegContinuingAccepted', {
                params: formDataObject
              })
                .then((response) => {
                  setSuccessMessage(response.data.message);
                  setSuccessStatus(response.data.success);
                })
              
              .catch(( error ) => {
                console.log('error 1: ', error);
                  console.error(error)
              });
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
         } if(preregData.candidate_for_graduation === 'NoCandidate'){
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
    fetchPdf()
    }

  return (
    <>
    <Feedback isOpen={successMessage !== ''} onClose={() => setSuccessMessage('')} successMessage={successMessage} status={successStatus} refresh={false}/>
    <main id="preRegTop">
        
    <form onSubmit={promptAccept} action="#" method="POST" /*style={{pointerEvents:allowEdit}}*/>   
        <div style={{pointerEvents:allowEdit}} className="w-full lg:w-8/12 px-4 container mx-auto">    
            <div className="rounded-t bg-grayGreen mb-0 px-6 py-9 items-center  "> {/**BOX  with contents*/}
                <section style={{ display: "flex", justifyContent: "center", alignItems: "center" }} className='flex-col sm:flex-row'>
                    <div className="">
                    <img src={schoolLogo}
                        className="object-cover btn- h-20 w-20 rounded-full bg-gray-300" alt="BSU Logo" />
                    </div>
                    <div className="flex flex-col justify-between pl-10">
                    <span className="text-sm font-bold">PRE-REGISTRATION FORM</span> 
                    <span className="text-sm">(UG RETURNEE OR CONTINUING STUDENT)</span>
                    <p className="text-sm font-semibold">Instructions: </p>
                    <p className="text-sm italic"> Please fill out the form in</p>
                    </div> 
                </section>             
            </div>          
        </div>

        {/**STUDENT DETAILS */}
        <div style={{pointerEvents:allowEdit}} className="w-full lg:w-8/12 px-4 mx-auto mt-6">  
                <div className="text-center flex justify-between">
                    <h6 className="text-blueGray-700 text-sm">
                        STUDENT DETAILS
                    </h6>
                    <h6  className="text-red-500 text-sm" hidden={allowEdit === 'none'}>
                      <b>*Editing has been enabled.</b>
                    </h6>
                </div>         
        </div>

        {/**=========================== 2 ==========================*/}      
        {/**Start of Filling the FORM */}
        <div style={{pointerEvents:allowEdit}} className="w-full lg:w-8/12 px-4 container mx-auto">
                <div className='relative flex flex-col min-w-0 break-words w-full shadow-md rounded-t-lg px-4 py-5 bg-white border-0'>
                    <div className="flex-auto px-4 lg:px-10 py-5 pt-0 mt-1">
                        {/**=========================== Shoolyear - Date ==========================*/}  
                        <div className="flex flex-wrap flex-row px-3 -mx-3 mb-3">               
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 mt-5">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mt-2 mb-2" htmlFor="grid-schoolyear">
                                    School year :
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                  value={preregData.semester}
                                  required
                                  onChange={(ev) => setPreregData({ ...preregData, semester: ev.target.value })}
                                />
                            </div>
                            
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 mt-5">
                                <div className="flex items-center mt-2 pl-3">
                                    <div className="relative w-fit">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <img src={date} className='h-5 w-5'/>
                                    </div>
                                    
                                    <input //Update this to automatically set the min to current year and max to 5 yeas after for better user experience
                                        name="start"
                                        type="number" 
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                                        placeholder="20-"
                                        min="2000" // Minimum year
                                        max="2099" // Maximum year
                                        step="1" // Year step
                                        value={preregData.start_of_school_year}
                                        required
                                        onChange={(ev) => setPreregData({ ...preregData, start_of_school_year: ev.target.value })}
                                        />
                                    </div>
                                    <span className="mx-4 text-gray-500">to</span>
                                    <div className="relative w-fit">
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
                                        value={preregData.end_of_school_year}
                                        required
                                        onChange={(ev) => setPreregData({ ...preregData, end_of_school_year: ev.target.value })}                                                              />
                                    </div>
                                </div>
                            </div>                 
                        </div> <hr />

                        {/**=========================== Last Name - Madain Name ==========================*/} 
                        <div className="flex flex-wrap flex-row -mx-3 mb-2">
                          {/**SCHOOL ID */}
                            <div className="w-full px-3 mb-6 md:mb-0 mt-2">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-studentMaidenname">
                                    Student ID No:
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                id="grid-studentSchoolID" 
                                type="number" 
                                placeholder=""
                                value={preregData.student_school_id}
                                required
                                onChange={(ev) => setPreregData({ ...preregData, student_school_id: ev.target.value })} 
                                />  
                            </div>
                            {/**column1 */}
                            <div className="w-full md:w-[33.33%] px-3 mb-6 md:mb-0 mt-2">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-studentLastname">
                                    Last Name :
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                id="grid-studentLastname"
                                type="text"
                                placeholder=""
                                value={preregData.last_name}
                                required
                                onChange={(ev) => setPreregData({ ...preregData, last_name: ev.target.value })}                       
                                />  
                            </div>
                            {/**column2 */}
                            <div className="w-full md:w-[33.33%] px-3 mb-6 md:mb-0 mt-2">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-studentFirstname">
                                    First Name :
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                id="grid-studentFirstname" 
                                type="text" 
                                placeholder=""
                                value={preregData.first_name}
                                required
                                onChange={(ev) => setPreregData({ ...preregData, last_name: ev.target.value })}
                                />  
                            </div>
                            {/**column3 */}
                            <div className="w-full md:w-[33.33%] px-3 mb-6 md:mb-0 mt-2">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-studentMiddlename">
                                    Middle Name :
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                id="grid-studentMiddlename" 
                                type="text" 
                                placeholder=""
                                value={preregData.middle_name}
                                required
                                onChange={(ev) => setPreregData({ ...preregData, middle_name: ev.target.value })}
                                />  
                            </div>
                            {/** */}
                            <div className="w-full px-3 mb-6 md:mb-0 mt-2">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-studentMaidenname">
                                    Maiden Name :
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                id="grid-studentMaidenname" 
                                type="text" 
                                placeholder=""
                                value={preregData.maiden_name}
                                required
                                onChange={(ev) => setPreregData({ ...preregData, maiden_name: ev.target.value })}
                                />  
                            </div>
                        </div> <hr />

                        {/**=========================== Type of Student - Year Level ========================== */}
                        <div className="flex flex-wrap flex-row mx-0 mb-2">
                            

                            {/**Year Level */}
                            <div className='flex flex-col w-full md:w-1/2 px-3 mt-5'>
                                <span className= "text-sm font-semibold">Year Level : </span> <hr className="w-[40%]"/>
                                <div className='mt-2'>
                                <select
                                    name="yearlevel"
                                    className="bg-gray-50 border border-gray-300 mt-2 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                                    value={preregData.year_level}
                                    required
                                    onChange={(ev) => setPreregData({ ...preregData, year_level: ev.target.value })}
                                >
                                    <option value="1st">1st</option>
                                    <option value="2nd">2nd</option>
                                    <option value="3rd">3rd</option>
                                    <option value="4th">4th</option>
                                </select>
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
                                <span className= "text-sm font-semibold">Major if Applicable : </span> <hr className="w-[40%]"/>
                                <div className='mt-2'>
                                    <input className="bg-gray-50 border border-gray-300 mt-2 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 "
                                        name="major"
                                        type='text'
                                        placeholder='(optional)'
                                        value={preregData.major}
                                        required
                                        onChange={(ev) => setPreregData({ ...preregData, major: ev.target.value })}
                                    />
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
                                            required
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
                                            required
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
                                <span className= "text-sm font-semibold">End of Term/Semester to Finish Degree Program : </span> <hr className="w-[40%]"/>
                                <div className='mt-2'>
                                    <input className="bg-gray-50 border border-gray-300 mt-2 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 "
                                        name="major"
                                        type='text'
                                        placeholder=''
                                        value={preregData.end_of_term_to_finnish_degree}
                                        required
                                        onChange={(ev) => setPreregData({ ...preregData, end_of_term_to_finnish_degree: ev.target.value })}
                                    />
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
                                            required
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
                                            className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] "
                                            type="radio"
                                            name="studentstatus"
                                            id="no"
                                            value="Irregular"
                                            checked={preregData.student_status === 'Irregular'}
                                            required
                                            onChange={(ev) => setPreregData({ ...preregData, student_status: ev.target.value })}
                                            />
                                        <label
                                            className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                                            htmlFor="student status">Irregular
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/**End of term */}
                            <div className='flex flex-col px-3 mt-5 w-full md:w-1/2'>
                                <span className= "text-sm font-semibold">Last Term/ Semester of Enrollment Degree Program : </span> <hr className="w-[40%]"/>
                                <div className='mt-2'>
                                    <input className="bg-gray-50 border border-gray-300 mt-2 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 "
                                        name="major"
                                        type='text'
                                        placeholder=''
                                        value={preregData.last_of_term_to_finnish_degree}
                                        required
                                        onChange={(ev) => setPreregData({ ...preregData, last_of_term_to_finnish_degree: ev.target.value })}
                                    />
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
                                required
                                onChange={(ev) => setPreregData({ ...preregData, date_of_birth: ev.target.value })}
                                />

                            <label className=" text-gray-700 text-xs font-bold mb-2" htmlFor="citizenship">
                                Citizenship :
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-nationality" 
                            type="text" 
                            placeholder=""
                            value={preregData.citizenship}
                            required
                            onChange={(ev) => setPreregData({ ...preregData, citizenship: ev.target.value })}
                            />

                            <label className=" text-gray-700 text-xs font-bold mb-2" htmlFor="ethnicity">
                                Ethnicity/Tribal Affilation :
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-ethnicity" 
                            type="text" 
                            placeholder=""
                            value={preregData.ethnicity}
                            required
                            onChange={(ev) => setPreregData({ ...preregData, ethnicity: ev.target.value })}
                            />
                                                    
                            <label className=" text-gray-700 text-xs font-bold mb-2" htmlFor="grid-contactnumber">Contact Number :</label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-contactnumber" 
                            type="text" 
                            pattern="^09[0-9]{9}$"
                            maxLength={11}
                            placeholder=""
                            value={preregData.contact_number}
                            required
                            onChange={(ev) => {
                              const value = ev.target.value.replace(/\D/g, '');
                              setPreregData({ ...preregData, contact_number:  value });}}
                            />                    
                            </div>

                            {/*column2*/}
                            <div className="w-full md:w-1/2 px-3 mb-3 md:mb-0 mt-2">                 
                            <label className=" text-gray-700 text-xs font-bold mb-2" htmlFor="placeofbirth">
                                Place of Birth :
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-placeofbirth" 
                            type="text" 
                            placeholder=""
                            value={preregData.place_of_birth}
                            required
                            onChange={(ev) => setPreregData({ ...preregData, place_of_birth: ev.target.value })}
                            />
                                
                            <label className=" text-gray-700 text-xs font-bold mb-2" htmlFor="sexatbirth">
                                Sex at Birth :
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                id="grid-sexatbirth" 
                                type="text" 
                                placeholder=""
                                value={preregData.sex_at_birth}
                                required
                                onChange={(ev) => setPreregData({ ...preregData, sex_at_birth: ev.target.value })}
                                />

                            <label className=" text-gray-700 text-xs font-bold mb-2" htmlFor="speacialneeds">
                                Special Need/s :
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-studyaddress" 
                            type="text" 
                            placeholder=""
                            value={preregData.special_needs}
                            required
                            onChange={(ev) => setPreregData({ ...preregData, special_needs: ev.target.value })}
                            />
                                
                            <label className=" text-gray-700 text-xs font-bold mb-2" htmlFor="emailaddress">
                                Email Address :
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-emailaddress" 
                            type="text" 
                            placeholder=""
                            value={preregData.email_address}
                            required
                            onChange={(ev) => setPreregData({ ...preregData, email_address: ev.target.value })}
                            />
                            </div>
                        </div> <hr />

                        {/**=========================== Filling the Adresses ==========================*/} 
                        <div className="flex flex-wrap -mx-3 mb-2">
                            <div className="w-full px-3 mb-3 md:mb-0 mt-2">
                            <label className=" text-gray-700 text-xs font-bold mb-2" htmlFor="grid-homeaddress">Permanent Address :</label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-homeaddress" 
                            type="text" 
                            placeholder=""
                            value={preregData.home_address}
                            required
                            onChange={(ev) => setPreregData({ ...preregData, home_address: ev.target.value })}
                            />
                            </div>
                            <div className="w-full px-3 mb-3 md:mb-0 mt-2">
                            <label className=" text-gray-700 text-xs font-bold mb-2" htmlFor="studyaddress">
                                Address while studying at BSU :
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-studyaddress" 
                            type="text" 
                            placeholder=""
                            value={preregData.address_while_studying}
                            required
                            onChange={(ev) => setPreregData({ ...preregData, address_while_studying: ev.target.value })}
                            />
                            </div>
                        </div> <hr />
                        
                        {/**=========================== Emergy Contact ==========================*/} 
                        <div className="text-normal font-medium text-center mt-2">EMERGENCY CONTACT (Person to be contacted in case of emergency)</div> <hr className='mt-2'/>
                            <div className="flex flex-wrap -mx-3 mb-2"> 
                            
                            {/*column1*/}
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 mt-2">
                                <label className=" text-gray-700 text-xs font-bold mb-2" htmlFor="grid-contactname">Complete Name :</label>
                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-contactname" 
                                type="text" 
                                placeholder=""
                                value={preregData.contact_person_name}
                                required
                                onChange={(ev) => setPreregData({ ...preregData, contact_person_name: ev.target.value })}
                                />
                                
                                <label className=" text-gray-700 text-xs font-bold mb-2" htmlFor="grid-address">Address :</label>
                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                id="grid-address" 
                                type="text" 
                                placeholder=""
                                value={preregData.contact_person_address}
                                required
                                onChange={(ev) => setPreregData({ ...preregData, contact_person_address: ev.target.value })}
                                />
                            </div>

                            {/*column2*/}
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 mt-2">
                                <label className=" text-gray-700 text-xs font-bold mb-2" htmlFor="grid-contactnum">
                                Contact Number :
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-contactnum" 
                                type="text" 
                                pattern="^09[0-9]{9}$"
                                maxLength={11}
                                placeholder=""
                                value={preregData.contact_person_number}
                                required
                                onChange={(ev) => {
                                  const value = ev.target.value.replace(/\D/g, '');
                                  setPreregData({ ...preregData, contact_person_number: value });}}
                                />
                                    
                                <label className=" text-gray-700 text-xs font-bold mb-2" htmlFor="grid-relationship">
                                Relationship :
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-relationship" 
                                type="text" 
                                placeholder=""
                                value={preregData.contact_person_relationship}
                                required
                                onChange={(ev) => setPreregData({ ...preregData, contact_person_relationship: ev.target.value })}
                                />
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
                          name="register"
                          id="yesregister"
                          value='Yes' 
                          checked={preregData.health_facility_registered === 'Yes'}
                          required
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
                          name="register"
                          id="noregister"
                          value='No'
                          checked={preregData.health_facility_registered === 'No'}
                          required
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
                      required
                      onChange={ev => setvaccinationstatus(ev.target.value)}
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
                          required
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
                          required
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
          <div style={{pointerEvents:allowEdit}} className="w-full container mx-auto">
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
                                name="lvl"
                                id="highlvl"
                                value="High Level" 
                                checked={preregData.technology_level === 'category1'}
                                required
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
                                name="lvl"
                                id="mediumlvl"
                                value="Medium Level" 
                                checked={preregData.technology_level === 'category2'}
                                required
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
                                name="lvl"
                                id="lowlvl"
                                value="Low Level" 
                                checked={preregData.technology_level === 'category3'}
                                required
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
                              name="digital_literacy"
                              id="proficient"
                              value="Proficient" 
                              checked={preregData.digital_literacy === 'lvl1'}
                              required
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
                              name="digital_literacy"
                              id="advanced"
                              value="Advanced" 
                              checked={preregData.digital_literacy === 'lvl2'}
                              required
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
                              name="digital_literacy"
                              id="beginner"
                              value="Beginner" 
                              checked={preregData.digital_literacy === 'lvl3'}
                              required
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
        <div style={{pointerEvents:allowEdit}} className="w-full container mx-auto">
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
                                    name="avail"
                                    id="yesavail"
                                    value="Yes" 
                                    checked={preregData.avail_free_higher_education === 'YesAvail'}
                                    required
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
                                    name="avail"
                                    id="noavail"
                                    value="No" 
                                    checked={preregData.avail_free_higher_education === 'NoAvail'}
                                    required
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
                                        name="contribute"
                                        id="yescontribute"
                                        value="Yes" 
                                        checked={preregData.voluntary_contribution === 'YesContribute'}
                                        required
                                        onChange={(ev) => setPreregData({ ...preregData, voluntary_contribution: ev.target.value })}
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
                                        name="contribute"
                                        id="nocontribute"
                                        value="No" 
                                        checked={preregData.voluntary_contribution === 'NoContribute'}
                                        required
                                        onChange={(ev) => setPreregData({ ...preregData, voluntary_contribution: ev.target.value })}
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
                    <label className=" text-gray-700 text-xs font-bold mb-2">
                      AMOUNT <em>(If YES, indicate amount)</em>
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                    id="grid-amtcontibute" 
                    type="text" 
                    placeholder=""
                    value={preregData.contribution_amount}
                    required
                    onChange={(ev) => setPreregData({ ...preregData, contribution_amount: ev.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap flex-row -mx-3 mb-2">
                  {/*column1*/}
                  <div className="w-full md:w-[15%] px-3  py-2 mb-6 md:mb-0 mt-2">
                    <label className=" text-gray-700 text-sm font-bold mb-2">
                        COLLEGE
                    </label>
                  </div>
                  {/*column2*/}
                  <div className="w-full md:w-[50%] px-3 mb-6 md:mb-0 mt-2">
                    <div>
                      <label className=" text-gray-700 text-xs font-bold mb-2">
                        Did the Student complied with the Admission Policy
                      </label>
                      <label className=" text-gray-700 text-xs font-bold mb-2">
                        If No, not eligible to Avail Free Higher Education for the current Semester/Term
                      </label>
                    </div>                                                
                  </div>
                  {/**column3 */}
                  <div className="w-full md:w-[20%] px-3 mb-6 md:mb-0 mt-2">
                    <div className="w-full px-3 md:mb-0 flex flex-wrap flex-row mb-2">
                      {/**Radio buttion for Yes compiled */}
                      <div className='mx-5 mt-2'>
                        <input
                          className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                          type="radio"
                          name="complied"
                          id="yescomplied"
                          value="Yes"
                          required
                          onChange={(ev) => setPreregData({ ...preregData, complied_to_admission_policy: ev.target.value })}
                        />
                        <label
                          className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                          htmlFor="yescomplied">Yes
                        </label>
                      </div>
                      {/**Radio button for No Compiled */}
                      <div className='mx-5 mt-2'>
                        <input
                          className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                          type="radio"
                          name="complied"
                          id="nocomplied"
                          value="No"
                          required
                          onChange={ev => setcompliedtoadmissionpolicy(ev.target.value)}
                        />
                        <label
                          className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                          htmlFor="nocomplied">No
                        </label>
                      </div>
                  </div>  
                </div>
              </div>
                </div>
                </div>
            </div>

     {/**=========================== 4 ==========================*/}      
        {/**Start of Filling the FORM for CLASS CODES UNITS*/}
        <div className="w-full lg:w-8/12 px-4 container mx-auto">   
            <div className='relative flex flex-col min-w-0 break-words w-full shadow-md rounded-t-lg px-4 py-5 bg-white border-0 mt-3'>
                    <div style={{pointerEvents:allowEdit}} className="flex-auto px-4 lg:px-10 py-5 pt-0 mt-1">
                        <div className="text-normal font-medium text-center mt-2">
                            SECTION/COURSE(S) TO BE ENROLLED : FOR IRREGULAR STUDENT
                        </div> <hr className='mt-2'/>
                        <div className="flex items-center">
                            <p> <label className='font-semibold'>Note: </label>
                                <label> If the course you are enrolling is a <a className='font-semibold'>back course/ subject </a>
                                        write <a className='font-semibold'>BC, </a> and if it is an <a className='font-semibold'>advanced subject/ course </a>
                                        write <a className='font-semibold'>AC.</a> Else, select <b>N/A</b>.
                                </label>
                            </p>   
                        </div><hr className='mt-2'/>

                        { inputFields.map((inputField, index) => (
                            <div key={index} className="flex flex-wrap flex-row px-3 -mx-3 mt-3 mb-3">
                                {/**Class code */}
                                <div className="w-full md:w-[25%] pr-1">
                                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor={`grid-classcode`}>
                                    Class Code
                                  </label>
                                  <select
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    name="classCode"
                                    value={inputField.classCode}
                                    //required
                                    required={preregData.student_status === 'Irregular'}
                                    onChange={event => handleChangeInput(index, event)}
                                  >
                                    <option value="" disabled selected>
                                      Class Code
                                    </option>
                                    {subjectData.map(item => (
                                      <option key={item.id} value={item.class_id + '-' + item.class_code}>
                                        {item.class_code + ' - ' + item.course_code}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                                {/**Course code */}
                                <div className="w-full md:w-[25%] pr-1">
                                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor={`grid-coursecode`}>
                                    Course Code
                                  </label>
                                  <select
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    name="courseCode"
                                    value={inputField.courseCode}
                                    //required
                                    required={preregData.student_status === 'Irregular'}
                                    onChange={event => handleChangeInput(index, event)}
                                  >
                                    <option value="" disabled selected>
                                      Course Code
                                    </option>
                                    {subjectData.map(item => (
                                      <option key={item.id} value={item.course_code}>
                                        {item.course_code + ' - ' + item.course_title}
                                      </option>
                                    ))}
                                  </select>
                                </div>

                                {/**Units */}
                                <div className="w-full md:w-[15%] pr-1">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor={`grid-coursecode`}>Unit/s</label>
                                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                      type="number"
                                      name="units"
                                      label="Units"
                                      variant="filled"
                                      placeholder="Units"
                                      value={inputField.units}
                                      //required
                                      required={preregData.student_status === 'Irregular'}
                                      onChange={(event) => {
                                        handleChangeUnits(index, event.target.value); // working
                                        handleChangeInput(index, event); // may not work pls test
                                      }}
                                    />
                                </div>

                                {/**BC or AC */}
                                <div className="w-full md:w-[20%] pr-1">
                                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor={`grid-coursecode`}>
                                    BC / AC
                                  </label>
                                  <select
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    name="bcac"
                                    value={inputField.bcac}
                                    onChange={event => handleChangeInput(index, event)}
                                    //required
                                    required={preregData.student_status === 'Irregular'}
                                  >
                                    <option value="N/A">N/A</option>
                                    <option value="BC">BC</option>
                                    <option value="AC">AC</option>
                                  </select>
                                </div>

                                {/**Buttons for Adding and Removing row */}
                                <div className='w-full md:w-[10%] flex items-center justify-center mx-0 mt-4"'>
                                    <button type="button"
                                            className="ml-2 text-red-600 hover:bg-red-300 hover:text-black font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center border border-gray-600 hover:border-red-800 hover:cursor-pointer"
                                            disabled={inputFields.length === 1} onClick={() => {
                                              handleChangeUnits(index, event.target.value);
                                              handleRemoveFields(index);
                                            }}>
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
                                    <button type="button"
                                            className="text-gray-600 border border-gray-600 hover:bg-gray-800 hover:text-white rounded-full p-2.5 text-center inline-flex items-center"
                                            onClick={handleAddFields}
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
                                
                                
                            </div>
                            )) }
                            {/**Total Unit */}
                            <div className="flex flex-row w-full md:w-[50%] px-5">
                                <div className='w-full mx-5 mt-2'>
                                    <label
                                        className="text-gray-700 text-lg font-bold mb-2 block"
                                        htmlFor="grid-totalunits"
                                    >
                                        Total Units :
                                    </label>
                                </div>

                                <div className='mx-5 mt-2'>
                                    <input
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="grid-totalunits"
                                        type="number"
                                        placeholder="0"
                                        value={totalUnits}
                                    />
                                </div>
                                                               
                            </div> 
                    </div>
                    <div className="overflow-x-auto overflow-y-auto max-h-[500px]">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead>
                              <tr>
                                  <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 uppercase tracking-wider">Class Code</th>
                                  <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 uppercase tracking-wider">
                                    <div className="flex relative">
                                      <p className="px-1 py-3 bg-gray-50 text-left text-xs leading-4 uppercase tracking-wider">
                                        Year Level:
                                      </p>
                                      <select
                                        id="classYearFilter"
                                        name="classYearFilter"
                                        className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        value={selectedClassYear}
                                        onChange={e => setSelectedClassYear(e.target.value)}
                                      >
                                          <option value={'All'}>All</option>
                                          <option value={'1st'}>1st</option>
                                          <option value={'2nd'}>2nd</option>
                                          <option value={'3rd'}>3rd</option>
                                          <option value={'4th'}>4th</option>
                                      </select>
                                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        </svg>
                                      </div>
                                    </div>
                                  </th>
                                  <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 uppercase tracking-wider">Semester</th>
                                  <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 uppercase tracking-wider">Course Title</th>
                                  <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 uppercase tracking-wider">Grade</th>
                              </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {studentCheckList.some(item => (selectedClassYear === 'All' || item.yrlevel === selectedClassYear) && item.grade !== '0') ? (
                              studentCheckList.map((item, index) => (
                                (selectedClassYear === 'All' || item.yrlevel === selectedClassYear) && item.grade !== '0' && (
                                  <tr key={index}>
                                    <td className="px-6 py-4 whitespace-no-wrap">{item.class_code}</td>
                                    <td className="px-6 py-4 whitespace-no-wrap">{item.yrlevel}</td>
                                    <td className="px-6 py-4 whitespace-no-wrap">{item.term}</td>
                                    <td className="px-6 py-4 whitespace-no-wrap">{item.course_title}</td>
                                    <td className="px-6 py-4 whitespace-no-wrap">{item.grade}</td>
                                  </tr>
                                )
                              ))
                            ) : (
                              <tr>
                                <td colSpan="5" className="px-6 py-4 whitespace-no-wrap text-center">Nothing to show</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                    </div>
                </div>
        </div>
      {/**=====================================================*/}
        {/**===========SUMBIT Button============= */}
        {prereg.pre_reg_status !== 'Accepted' && (
            <div className="text-center flex justify-end my-8">
            {prereg.pre_reg_status === 'Pending' && (
              <button onClick={promptDecline} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 mr-6 rounded-full">
                Decline
              </button>
            )}
              <button type="submit" className="bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded-full">
                Accept
              </button>
          </div>
          )}
      </form>

      {/**=====================================================*/}   
      {prereg.pre_reg_status === 'Accepted' && (
            <div className="text-center flex justify-end my-8 mr-20">
              <div className='space-x-3'>
                <a href="#preRegTop">
                  <button hidden={allowEdit === 'auto'} onClick={allowChange} type="button" className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full">
                    Allow Edit
                  </button> {/*after enabled move screen to top and promp form is now editable again*/}
                </a>
                <button hidden={allowEdit === 'auto'} onClick={onPrint} type="submit" className="bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded-full">
                  Print
                </button>
              </div>
              <div className='space-x-3'>
                <button hidden={allowEdit === 'none'} onClick={onSaveChanges} type="button" className="bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded-full">
                    Save Changes
                </button>
                <button hidden={allowEdit === 'none'} onClick={() => {noChange(); setPreregData(oldprereg);}} type="button" className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
                    Cancel
                </button>
              </div>
            </div>
          )}
    </main>
      <ReactModal
              isOpen={showPromptA}
              onRequestClose={() => setShowPromptA(false)}
              className="md:w-[1%]"
            >
              <div>
                  <AcceptPrompt
                      closeModal={() => setShowPromptA(false)}
                      handleSave={onClickAccept}
                      action={action}
                      promptMessage={promptMessage}
                  />
              </div>
      </ReactModal>

      <ReactModal
              isOpen={showPromptD}
              onRequestClose={() => setShowPromptD(false)}
              className="md:w-[1%]"
            >
              <div>
                  <DeclinePrompt
                      closeModal={() => setShowPromptD(false)}
                      handleSave={onDecline}
                      action={action}
                      promptMessage={promptMessage}
                  />
              </div>
      </ReactModal>
    </>
  )
}
