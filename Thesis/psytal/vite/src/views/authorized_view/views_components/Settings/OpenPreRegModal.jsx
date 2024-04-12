import React, { useState, useEffect } from 'react';
import axiosClient from '../../../../axios';
import Feedback from '../../../feedback/Feedback';
import ReactModal from 'react-modal';
import ClosePRPrompt from '../../prompts/ClosePRPrompt';
import OpenPRPrompt from '../../prompts/OpenPRPrompt';
import ClosePreRegValidation from '../../prompts/ClosePreRegValidation';
import CreatePrompt from '../../prompts/CreatePrompt';

export default function OpenPreRegModal({ closeModal }) {
  const [error, setError] = useState({ __html: '' });

  const [startOfPreReg, setStartOfPreReg] = useState('');
  const [endOfPreReg, setEndOfPreReg] = useState('');
  const [startOfSemester, setStartOfSemester] = useState('');
  const [endOfSemester, setEndOfSemester] = useState('');
  const [startOfSchoolYear, setStartOfSchoolYear] = useState('');
  const [endOfSchoolYear, setEndOfSchoolYear] = useState('');
  const [semester, setSemester] = useState('');
  const id = 1;

  const [successMessage, setSuccessMessage] = useState('');
  const [successStatus, setSuccessStatus] = useState('');

  const [showOpen, setShowOpen] = useState(false);
  const [showClose, setShowClose] = useState(false);
  const [showPRconfig, setShowPRconfig] = useState(true)
  const [allowedit, setAllowedit] = useState('false');
  const [showStatus, setShowStatus] = useState(null);
  const [closePreRegValidation, setClosePreRegValidation] = useState(false);

  const [showPrompt, setShowPrompt] = useState(false);
  const [promptMessage, setPromptMessage] = useState('');
  const action = "Confirm Update Semester Information";

  const [oldSemester, setOldsemester] = useState('');
  const [oldStartyr, setOldStartyr] = useState('');
  const [oldEndyr, setOldEndyr] = useState('');

  //<><><><><>
  const editprompt = (ev) => {
    ev.preventDefault();
    setShowOpen(true);
  }

  //<><><><><>
  const updateprompt = (ev) => {
    ev.preventDefault();
    const concatmessage = 'Changes to the semester information for ' + oldSemester + ', SY: ' + oldStartyr + '-' + oldEndyr + ' will be saved. Do you wish to proceed?';
    setPromptMessage(concatmessage);
    setShowPrompt(true);
  }

  //For saving the Pre-Registration and Term Information to the database
  const onSubmit = async () => {
    setError({ __html: '' });

    axiosClient
      try {
        const response = await axiosClient.post('/addsemesterinformation', {
          start_of_prereg: startOfPreReg,
          end_of_prereg: endOfPreReg,
          start_of_semester: startOfSemester,
          end_of_semester: endOfSemester,
          start_of_school_year: startOfSchoolYear,
          end_of_school_year: endOfSchoolYear,
          semester: semester,
          open_pre_reg: true,
        });
        setSuccessMessage(response.data.message);
        setSuccessStatus(response.data.success);

        setTimeout(() => {
        setSuccessMessage(null);
        closeModal();
        }, 2000);
      } catch (error) {
          setSuccessMessage(error.response.data.message)
          setSuccessStatus(false)
      }
  };

  //For GET School Year
  useEffect(() => {
    fetchSemester();
  }, []);

  //<><><><><>
  const fetchSemester = () => {
    axiosClient
      .get('/getschoolyear')
      .then((res) => {
        setStartOfPreReg(res.data.start_of_prereg);
        setEndOfPreReg(res.data.end_of_prereg);
        setStartOfSemester(res.data.start_of_semester);
        setEndOfSemester(res.data.end_of_semester);
        setStartOfSchoolYear(res.data.start_of_school_year); // Assuming res.data is an array
        setEndOfSchoolYear(res.data.end_of_school_year);
        setSemester(res.data.semester);
        setShowStatus(res.data.open_pre_reg);

        //old data
        setOldsemester(res.data.semester);
        setOldStartyr(res.data.start_of_school_year)
        setOldEndyr(res.data.end_of_school_year);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  //Ensures that preRegEnd is not set earlier than preRegStart========================================
  const handleStartChange = (ev) => {
    const newStartDate = ev.target.value;
    setStartOfPreReg(newStartDate);

    // Check if end date is earlier than the new start date, adjust if necessary
    if (endOfPreReg < newStartDate) {
      setEndOfPreReg(newStartDate);
    }
  };

  const handleEndChange = (ev) => {
    const newEndDate = ev.target.value;

    // Check if end date is earlier than start date, prevent update if so
    if (newEndDate >= startOfPreReg) {
      setEndOfPreReg(newEndDate);
    }
  };
  //==================================================================================================

  //Ensures that endOfSemester is not set earlier than startOfSemester
  const handleSemesterStartChange = (ev) => {
    const newStartDate = ev.target.value;
    setStartOfSemester(newStartDate);

    // Check if end date is earlier than the new start date, adjust if necessary
    if (endOfSemester < newStartDate) {
      setEndOfSemester(newStartDate);
    }
  };

  const handleSemesterEndChange = (ev) => {
    const newEndDate = ev.target.value;

    // Check if end date is earlier than start date, prevent update if so
    if (newEndDate >= startOfSemester) {
      setEndOfSemester(newEndDate);
    }
  };
  //==================================================================================================

  //Ensures that endOfSchoolYear is not set earlier than startOfSchoolYear
  const handleSchoolYearStartChange = (ev) => {
    const newStartDate = ev.target.value;
    setStartOfSchoolYear(newStartDate);

    // Calculate the next year and set it as endOfSchoolYear
    const nextYear = parseInt(newStartDate) + 1;
    setEndOfSchoolYear(nextYear.toString());

    // Check if end date is earlier than the new start date, adjust if necessary
    if (endOfSchoolYear < newStartDate) {
      setEndOfSchoolYear(newStartDate);
    }
  };

  const handleSchoolYearEndChange = (ev) => {
    const newEndDate = ev.target.value;

    // Check if end date is earlier than start date, prevent update if so
    if (newEndDate > startOfSchoolYear) {
      setEndOfSchoolYear(newEndDate);
    }
  };

  //for closing the pre-reg
  const handleClosePreReg = async () => {
    setClosePreRegValidation(true);
  };

  //update pre-reg information
  const handleEditPreReg = async () => {
    axiosClient
      try {
        const response = await axiosClient.put('/updatesemesterinformation', {
          start_of_prereg: startOfPreReg,
          end_of_prereg: endOfPreReg,
          start_of_semester: startOfSemester,
          end_of_semester: endOfSemester,
          start_of_school_year: startOfSchoolYear,
          end_of_school_year: endOfSchoolYear,
          semester: semester,
          open_pre_reg: true,
        });
        setSuccessMessage(response.data.message);
        setSuccessStatus(response.data.success);

        setTimeout(() => {
        setSuccessMessage(null);
        closeModal();
        }, 2000);
      } catch (error) {
          setSuccessMessage(error.response.data.message)
          setSuccessStatus(false)
      }
  }

  return (
    <div>
      <div className='text-center mt-1 mb-5'>
            <strong className="text-lg">Pre-Registration Information</strong>
      </div>
      <hr></hr>
      <Feedback isOpen={successMessage !== ''} onClose={() => setSuccessMessage('')} successMessage={successMessage} status={successStatus} refresh={false}/>
      <div className='mt-2 flex justify-between'>
        <div>
          <strong>Pre-Registration Status:  </strong>
          <strong className={
              showStatus === 1 ? 'text-green-500' : 
              (showStatus === 0 ? 'text-red-500' : 
              (showStatus === null ? 'text-gray-500' : 'text-gray-500'))
          }>
              {showStatus === 1 ? 'OPEN' : 
              (showStatus === 0 ? 'CLOSED' : 
              (showStatus === null ? 'Loading...' : 'No Semester Information Found'))}
          </strong>
        </div>
        <div>
          <strong hidden={showPRconfig} >
            *Editing is now Enabled
          </strong> 
        </div>
      </div>
      <form onSubmit={editprompt} className='p-3'>
        {/**For Pre-Registration */}
        <div className='border border-gray-200'>
          <table className="table-auto w-full">
            <thead className="border border-gray-200">
              <tr className='bg-gray-200'>
                <th className="px-4 py-2"></th>
                <th className="px-4 py-2">Start</th>
                <th className="px-4 py-2">End</th>
              </tr>
            </thead>
            <tbody>
              <tr className='bg-green-100'>
                <td className="px-4 py-2 font-bold">Pre-Registration Schedule</td>
                <td className="px-4 py-2">
                  <input
                    id='preRegStart'
                    type='date'
                    value={startOfPreReg}
                    onChange={handleStartChange}
                    required
                    disabled={showPRconfig}
                    className='rounded-md'
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    id='preRegEnd'
                    type='date'
                    placeholder='End of Pre-Registration'
                    value={endOfPreReg}
                    onChange={handleEndChange}
                    required
                    disabled={showPRconfig}
                    className='rounded-md'
                  />
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-bold">Semester Schedule</td>
                <td className="px-4 py-2">
                  <input
                    id="semesterStart"
                    type="date"
                    placeholder="Start of Semester"
                    value={startOfSemester}
                    onChange={handleSemesterStartChange}
                    required
                    disabled={showPRconfig}
                    className='rounded-md'
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    id="semesterEnd"
                    type="date"
                    placeholder="End of Semester"
                    value={endOfSemester}
                    onChange={handleSemesterEndChange}
                    required
                    disabled={showPRconfig}
                    className='rounded-md'
                  />
                </td>
              </tr>
              <tr className='bg-green-100'>
                <td className="px-4 py-2 font-bold">School Year</td>
                <td className="px-4 py-2">
                  <input
                    id="schoolYrStart"
                    type="number"
                    placeholder="Start of School Year"
                    value={startOfSchoolYear}
                    onChange={handleSchoolYearStartChange}
                    min={1900} // Example min value
                    max={2100} // Example max value
                    required
                    className='w-full rounded-md'
                    disabled={showPRconfig}
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    id="schoolYrEnd"
                    type="number"
                    placeholder="End of School Year"
                    value={endOfSchoolYear}
                    onChange={handleSchoolYearEndChange}
                    min={1900} // Example min value
                    max={2100} // Example max value
                    required
                    className='w-full rounded-md'
                    disabled={showPRconfig}
                  />
                </td>
              </tr>
              <tr className=''>
                <td className="px-4 py-2 font-bold">Semester</td>
                <td colSpan="1" className="px-4 py-2 text-center">
                  <select
                    id="semesterStart"
                    value={semester}
                    onChange={(ev) => setSemester(ev.target.value)}
                    required
                    disabled={showPRconfig}
                    className='rounded-md w-full'
                  >
                    <option value="">Select Semester</option>
                    <option value="1st Semester">1st Semester</option>
                    <option value="2nd Semester">2nd Semester</option>
                    <option value="Midyear">Midyear</option>
                  </select>
                </td>
                <td className="px-4 py-2">

                <button
                  hidden={showStatus}
                  disabled={showPRconfig}
                  type="submit"
                  className={`bg-lime-600 text-white font-bold py-2 px-4 rounded-md w-full ${
                    showPRconfig ? 'disabled:opacity-50 cursor-not-allowed' : 'hover:bg-lime-700'
                  }`}>
                  Open Pre-Reg
                </button>

                <button
                  hidden={!showStatus}
                  disabled={showPRconfig}
                  type='button'
                  onClick={() => setShowClose(true)}
                  className={`bg-lime-600 text-white font-bold py-2 px-4 rounded-md w-full ${
                    showPRconfig ? 'disabled:opacity-50 cursor-not-allowed' : 'hover:bg-lime-700'
                  }`}>
                  Close Pre-Reg
                </button>

                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <br></br>
        {/**===========SUMBIT Button============= */}
        <div className="text-center items-center">
           
          <div hidden={!showPRconfig}>
            <button
              type="button"
              onClick={() => {setShowPRconfig(!showPRconfig); setAllowedit(!allowedit);}}
              className="bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded-full">
              Edit Pre-Registration Information
            </button>
          </div>
          <div hidden={allowedit}>
            <button hidden={allowedit}
              type='button'
              onClick={updateprompt}
              className="bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-4 ml-6 rounded-full">
              Save Changes
            </button>
            <button hidden={allowedit}
              type="button"
              onClick={() => {setShowPRconfig(!showPRconfig); fetchSemester(); setAllowedit(!allowedit);}}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 ml-5 rounded-full">
              Cancel
            </button>
          </div>
        </div>
      </form>
      <ReactModal
            isOpen={showPrompt}
            onRequestClose={() => setShowPrompt(false)}
            className="md:w-[1%]"
          >
            <div>
                <CreatePrompt
                    closeModal={() => setShowPrompt(false)}
                    handleSave={handleEditPreReg}
                    action={action}
                    promptMessage={promptMessage}
                />
            </div>
      </ReactModal>

      <ReactModal
            isOpen={showClose}
            onRequestClose={() => setShowClose(false)}
            className="md:w-[1%]"
          >
            <div>
                <ClosePRPrompt
                    closeModal={() => setShowClose(false)}
                    handleSave={handleClosePreReg}
                    startOfSchoolYear = {startOfSchoolYear}
                    endOfSchoolYear = {endOfSchoolYear}
                    semester = {semester}
                />
            </div>
      </ReactModal>

      <ReactModal
            isOpen={showOpen}
            onRequestClose={() => setShowOpen(false)}
            className="md:w-[1%]"
          >
            <div>
                <OpenPRPrompt
                    closeModal={() => setShowOpen(false)}
                    handleSave={onSubmit}
                    startOfPreReg = {startOfPreReg}
                    endOfPreReg = {endOfPreReg}
                    startOfSchoolYear = {startOfSchoolYear}
                    endOfSchoolYear = {endOfSchoolYear}
                    semester = {semester}
                />
            </div>
      </ReactModal>

      <ReactModal
        isOpen={closePreRegValidation}
        onRequestClose={() => setClosePreRegValidation(false)}
        className="w-[100%] md:w-[30%] h-fit bg-white rounded-3xl ring-1 ring-black shadow-2xl mt-[10%] mx-auto p-2"
      >
            <ClosePreRegValidation
              closeModal={() => setClosePreRegValidation(false)}
            />
      </ReactModal>
    </div>
  );
}
