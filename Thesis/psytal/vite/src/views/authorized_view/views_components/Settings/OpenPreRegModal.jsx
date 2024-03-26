import React, { useState, useEffect } from 'react';
import axiosClient from '../../../../axios';
import Feedback from '../../../feedback/Feedback';

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

  //For saving the Pre-Registration and Term Information to the database
  const onSubmit = async (ev) => {
    ev.preventDefault();
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

        // setTimeout(() => {
        //   setSuccessMessage(null);
        //   closeModal();
        //   window.location.reload();
        // }, 2000);
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
        setStartOfSchoolYear(res.data[0]); // Assuming res.data is an array
        setEndOfSchoolYear(res.data[1]);
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
  const handleClosePreReg = async (ev) => {
    axiosClient
      try {
        const response = await axiosClient.put(`/closeprereg/${id}`, {
          open_pre_reg: 0,
        });
        setSuccessMessage(response.data.message);
        setSuccessStatus(response.data.success);

        // setTimeout(() => {
        //   setSuccessMessage(null);
        //   closeModal();
        //   window.location.reload();
        // }, 2000);
      } catch (error) {
          setSuccessMessage(error.response.data.message)
          setSuccessStatus(false)
      }
  };

  return (
    <div>
      <Feedback isOpen={successMessage !== ''} onClose={() => setSuccessMessage('')} successMessage={successMessage} status={successStatus} refresh={false}/>
      <form onSubmit={onSubmit}>
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
              />
            </div>
          </div>
        </div>

        {/**For Semester */}
        <div className='grid grid-cols-2 items-center pt-5 gap-4'>
          <label className='pr-2 font-bold'>Semester</label>

          <div className='grid grid-cols-2 gap-4'>
            <div>
              <input
                id="semesterStart"
                type="text"
                placeholder="ex. 1st Semester"
                value={semester}
                onChange={(ev) => setSemester(ev.target.value)}
              />
            </div>
          </div>
        </div>

        {/**===========SUMBIT Button============= */}
        <div className="text-center items-center my-8">
          <button
            type='button'
            onClick={closeModal}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 mr-6 rounded-full">
            Cancel
          </button>
          <button
            type="submit"
            className="bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded-full">
            Open Pre-Registration
          </button>
          <button
            type='button'
            onClick={handleClosePreReg}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 ml-6 rounded-full">
            Close Pre-Registration
          </button>
        </div>
      </form>
    </div>
  );
}
