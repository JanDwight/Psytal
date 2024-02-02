import React, { useState, useEffect } from 'react'
import axiosClient from '../../../../axios';

export default function OpenPreRegModal({closeModal}) {
  const [error, setError] = useState({__html: ""});

  const [semesterInformation, setSemesterInformation] = useState('')

  const [startOfPreReg, setStartOfPreReg] = useState('')
  const [endOfPreReg, setEndOfPreReg] = useState('')
  const [startOfSemester, setStartOfSemester] = useState('')
  const [endOfSemester, setEndOfSemester] = useState('')
  const [startOfSchoolYear, setStartOfSchoolYear] = useState('')
  const [endOfSchoolYear, setEndOfSchoolYearr] = useState('')
  const [semester, setSemester] = useState('')
  const id = 1;

  //For saving the Pre-Registration and Term Information to the data base
  const onSubmit = (ev) => {
    ev.preventDefault();
    setError({ __html: "" });
    
    axiosClient
    .post('/addsemesterinformation', {
      start_of_prereg: (startOfPreReg),
      end_of_prereg: (endOfPreReg),
      start_of_semester: (startOfSemester),
      end_of_semester: (endOfSemester),
      start_of_school_year: (startOfSchoolYear),
      end_of_school_year: (endOfSchoolYear),
      semester: (semester),
      open_pre_reg: true
    })
    .then(({ data }) => {
    })
  }

  //For GET School Year
  useEffect(() => {
    axiosClient
      .get('/getschoolyear')
      .then((res) => {
            setStartOfSchoolYear(res.data[0]);  // Assuming res.data is an array
            setEndOfSchoolYearr(res.data[1]);
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
    if (newEndDate >= startOfPreReg) {
        setEndOfSemester(newEndDate);
    }
  };
  //==================================================================================================

  //Ensures that endOfSchoolYear is not set earlier than startOfSchoolYear
  const handleSchoolYearStartChange = (ev) => {
    const newStartDate = ev.target.value;
    setStartOfSchoolYear(newStartDate);

    // Check if end date is earlier than the new start date, adjust if necessary
    if (endOfSchoolYear < newStartDate) {
        setEndOfSchoolYearr(newStartDate);
    }
  };

  const handleSchoolYearEndChange = (ev) => {
    const newEndDate = ev.target.value;
    
    // Check if end date is earlier than start date, prevent update if so
    if (newEndDate >= startOfSchoolYear) {
        setEndOfSchoolYearr(newEndDate);
    }
  };

  const handleClosePreReg = (ev) => {
    axiosClient
    // create Update function for updating open_pre_reg
    .put(`/closeprereg/${id}`, {
        open_pre_reg: 0
      })
    .then(({ data }) => {
        console.log( data )
    })
  };

  return (
    <>
        <div className='grid justify-items-end'>
          <form onSubmit={onSubmit}>
              {/**For Pre-Registration */}
              <div className='grid grid-cols-2 items-center'> {/* Use grid-cols-2 for a 2-column grid */}
                  <label className='pr-2'>
                      Pre-Registration Schedule
                  </label>

                  <div>
                      <input 
                          id="preRegStart"
                          type="date" 
                          placeholder="Start of Pre-Registration"
                          value={startOfPreReg}
                          onChange={handleStartChange}
                      />

                      <label className='p-2'>
                          -
                      </label>

                      <input 
                          id="preRegEnd"
                          type="date" 
                          placeholder="End of Pre-Registration"
                          value={endOfPreReg}
                          onChange={handleEndChange}
                      />
                  </div>
              </div>                

              {/**For Semester Schedule*/}
              <div className='grid grid-cols-2 items-center pt-5'> {/* Use grid-cols-2 for a 2-column grid */}
                  <label className='pr-2'>
                      Semester Schedule
                  </label>

                  <div>
                      <input 
                          id="semesterStart"
                          type="date" 
                          placeholder="Start of Semester"
                          value={startOfSemester}
                          onChange={handleSemesterStartChange}
                      />

                      <label className='p-2'>
                          -
                      </label>

                      <input 
                          id="semesterEnd"
                          type="date" 
                          placeholder="End of Semester"
                          value={endOfSemester}
                          onChange={handleSemesterEndChange}
                      />
                  </div>
              </div>    

              {/**For School Year*/}
              <div className='grid grid-cols-2 items-center pt-5'> {/* Use grid-cols-2 for a 2-column grid */}
                  <label className='pr-2'>
                      School Year
                  </label>

                  <div>
                      <input 
                          id="semesterStart"
                          type="date" 
                          placeholder="Start of Scool Year"
                          value={startOfSchoolYear}
                          onChange={handleSchoolYearStartChange}
                      />

                      <label className='p-2'>
                          -
                      </label>

                      <input 
                          id="semesterEnd"
                          type="date" 
                          placeholder="End of School Year"
                          value={endOfSchoolYear}
                          onChange={handleSchoolYearEndChange}
                      />
                  </div>
              </div>       

                {/**For Semester */}
              <div className='grid grid-cols-2 items-center pt-5'> {/* Use grid-cols-2 for a 2-column grid */}
                  <label className='pr-2'>
                      Semester
                  </label>

                  <div>
                      <input 
                          id="semesterStart"
                          type="text" 
                          placeholder="ex. 1st Semester"
                          value={semester}
                          onChange={ev => setSemester(ev.target.value)}
                      />
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

        
    </>
  )
}
