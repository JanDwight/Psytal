import React, { useState, useEffect } from 'react';
import axiosClient from '../../../../axios';
import Feedback from '../../../feedback/Feedback';
import ReactModal from 'react-modal';
import ClosePRPrompt from '../../prompts/ClosePRPrompt';
import OpenPRPrompt from '../../prompts/OpenPRPrompt';

export default function OpenPreRegModal({ closeModal }) {
  const [error, setError] = useState({ __html: '' });

  const [semesterInformation, setSemesterInformation] = useState('');

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
  const [showStatus, setShowStatus] = useState('');

  //<><><><><>
  const editprompt = (ev) => {
    ev.preventDefault();
    setShowOpen(true);
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
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

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
    axiosClient
      try {
        const response = await axiosClient.put(`/closeprereg/${id}`, {
          open_pre_reg: 0,
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

  return (
    <div>
      <div className='text-center'>
            <strong className="text-lg">Pre-Registration Information</strong>
      </div>
      <hr></hr>
      <Feedback isOpen={successMessage !== ''} onClose={() => setSuccessMessage('')} successMessage={successMessage} status={successStatus} refresh={false}/>
      <form onSubmit={editprompt} className='pt-3'>
        {/**For Pre-Registration */}
        <div className='grid grid-cols-2 items-center gap-4'>
          <label className='pr-2 font-bold'>Pre-Registration Schedule</label>

          <div className='grid grid-cols-2 gap-4'>
            {/* Start of Pre-Registration */}
            <div>
              <label className='font-bold block'>Start</label>
              <input
                id='preRegStart'
                type='date'
                value={startOfPreReg}
                onChange={handleStartChange}
                required
                disabled={showPRconfig}
              />
            </div>

            {/* End of Pre-Registration */}
            <div>
              <label className='font-bold block'>End</label>
              <input
                id='preRegEnd'
                type='date'
                placeholder='End of Pre-Registration'
                value={endOfPreReg}
                onChange={handleEndChange}
                required
                disabled={showPRconfig}
              />
            </div>
          </div>
        </div>


        {/**For Semester Schedule*/}
        <div className='grid grid-cols-2 items-center pt-5 gap-4'>
          {/* Use grid-cols-2 for a 2-column grid */}
          <label className='pr-2 font-bold'>Semester Schedule</label>

          <div className='grid grid-cols-2 gap-4'>
            {/* Use another grid for better alignment */}
            <div>
              <input
                id="semesterStart"
                type="date"
                placeholder="Start of Semester"
                value={startOfSemester}
                onChange={handleSemesterStartChange}
                required
                disabled={showPRconfig}
              />
            </div>

            <div>
              <input
                id="semesterEnd"
                type="date"
                placeholder="End of Semester"
                value={endOfSemester}
                onChange={handleSemesterEndChange}
                required
                disabled={showPRconfig}
              />
            </div>
          </div>
        </div>

        {/**For School Year*/}
        <div className='grid grid-cols-2 items-center pt-5 gap-4'>
          <label className='pr-2 font-bold'>School Year</label>

          <div className='grid grid-cols-2 gap-4'>
            <div>
              <input
                id="schoolYrStart"
                type="number"
                placeholder="Start of School Year"
                value={startOfSchoolYear}
                onChange={handleSchoolYearStartChange}
                min={1900} // Example min value
                max={2100} // Example max value
                required
                className='w-full'
                disabled={showPRconfig}
              />
            </div>

            <div>
              <input
                id="schoolYrEnd"
                type="number"
                placeholder="End of School Year"
                value={endOfSchoolYear}
                onChange={handleSchoolYearEndChange}
                min={1900} // Example min value
                max={2100} // Example max value
                required
                className='w-full'
                disabled={showPRconfig}
              />
            </div>
          </div>
        </div>

        {/**For Semester */}
        <div className='grid grid-cols-2 items-center pt-5 gap-4'>
          <label className='pr-2 font-bold'>Semester</label>

          <div className='grid grid-cols-2 gap-4'>
            <div>
            <select
              id="semesterStart"
              value={semester}
              onChange={(ev) => setSemester(ev.target.value)}
              required
              disabled={showPRconfig}
            >
              <option value="">Select Semester</option>
              <option value="1st Semester">1st Semester</option>
              <option value="2nd Semester">2nd Semester</option>
              <option value="Midyear">Midyear</option>
            </select>
            </div>
          </div>
        </div>
        <br></br>
        {/**===========SUMBIT Button============= */}
        <div hidden={!showPRconfig} className="text-center items-center">
          <button
            type="button"
            onClick={() => setShowPRconfig(!showPRconfig)}
            className="bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded-full">
            Edit Pre-Registration Information
          </button>
        </div>
        <div  hidden={showPRconfig} className="text-center items-center">
          <button hidden={showStatus}
            type="submit"
            className="bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded-full">
            Open Pre-Registration
          </button>
          <button hidden={showStatus}
            type="button"
            onClick={() => setShowPRconfig(!showPRconfig)}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 ml-5 mt-2 rounded-full">
            Cancel
          </button>
          <button hidden={!showStatus}
            type='button'
            onClick={() => setShowClose(true)}
            className="bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-4 mt-2 ml-6 rounded-full">
            Close Pre-Registration
          </button>
          <button hidden={!showStatus}
            type="button"
            onClick={() => setShowPRconfig(!showPRconfig)}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 ml-5 mt-2 rounded-full">
            Cancel
          </button>
        </div>
      </form>
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
    </div>
  );
}
