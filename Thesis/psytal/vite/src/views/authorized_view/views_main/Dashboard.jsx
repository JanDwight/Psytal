import React, { useEffect, useState } from 'react';
import ShowLogs from "../views_components/ShowLogs";
import ShowArchives from "../views_components/ShowArchives";
import axiosClient from '../../../axios.js';

export default function Dashboard() {
  const [dash, setDash] = useState({
    totalStudents: 0,
    totalEmployees: 0,
    totalPosts: 0,
    totalLogins: 0
  });

  const [Archive_Data, setArchiveData] = useState([]); //connect later
  const [Logs_Data, setLogsData] = useState([]);

  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);

  const [semesterInformation, setSemesterInformation] = useState('');

  //For Ongoing Semester and School Year
  useEffect(() => {
    axiosClient
      .get('/getsemesterinformation')
      .then((res) => {
        setSemesterInformation(res.data);  // Assuming res.data is an array
        console.log(semesterInformation)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const openArchiveModal = () => {
    setIsArchiveModalOpen(true);
  };
  
  const closeArchiveModal = () => {
    setIsArchiveModalOpen(false);
  };

  const openLogModal = () => {
    setIsLogModalOpen(true);
  };
  
  const closeLogModal = () => {
    setIsLogModalOpen(false);
  };

  useEffect(() => {
    
    async function fetchData() {
      try {
        const [count_student, count_employee, count_posts, show_logs, show_archive] = await Promise.all([
          fetchDataCount('/count_students'),
          fetchDataCount('/count_employee'),
          fetchDataCount('/count_posts'),
          fetchTables('/show_logs'),
          fetchTables('/show_archives'),
        ]);
        
        const dashcountData = {
          totalStudents: count_student,
          totalEmployees: count_employee,
          totalPosts: count_posts,
          totalLogins: count_employee+count_student,
          
        };
        
        setDash(dashcountData);

        const Logs_Table = show_logs.map(log => ({
          action_taken: log.action_taken,
          user_name: log.user_name,
          user_role: log.user_role,
          location: log.location,
          date: log.date,
        }));

        setLogsData(Logs_Table);

        const Archives_Table = show_archive.map( archive => ({
          id: archive.id,
          item_name: archive.item_name,
          item_type: archive.item_type,
          origin_table: archive.origin_table,
          archiver_name: archive.archiver_name,
          archiver_role: archive.archiver_role,
          archived_at: archive.created_at,
        }));

        setArchiveData(Archives_Table);

      } catch (error) {
        // Handle any errors that occurred during the fetch
        console.error('Error in useEffect:', error);
      }
    }

     //fetch all data counts
      async function fetchDataCount(endpoint) {
        try {
          const response = await axiosClient.get(endpoint);
          return response.data;
        } catch (error) {
          console.error('Error fetching data from the database:', error);
        }
      }

      //fetch all tables
      async function fetchTables(endpoint) {
        try {
          const response = await axiosClient.get(endpoint);
          return response.data;
        } catch (error) {
          console.error('Error fetching data from the database:', error);
        }
      }

    fetchData();
  }, []);
  
  return (
    <div className="w-full h-[auto] px-4 mx-auto rounded-3xl bg-white shadow-2xl pt-5 pb-12">
      <div className="mt-5 mx-5 pb-5 border-b-2 border-black flex flex-row justify-between items-baseline">
      <div className="font-bold text-4xl lg:text-6xl text-[#525252]"> Dashboard</div>
      </div>
      <div className="w-full px-4 mx-auto mt-0">
        <div className="mt-2 mb-5"></div>
        {/**COL TOTAL S-L */}
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>

          {/**Total Student */}
          <div className='md:col-span-1 lg:col-span-1 block rounded-3xl bg-white text-center drop-shadow-xl'>
            {/**----Head----- */}
            <div className='flex flex-col rounded-t-3xl items-center bg-dash1 border border-gray-300 pb-5 pt-5'>
              <span className='text-white font-semibold'>Total Students</span>
            </div>
            {/**----Body----- */}
            <div className='p-7'>
              <span className="text-4xl font-semibold text-green-600 mt-2">{dash.totalStudents}</span>
            </div>
          </div>

          {/**Total Employees */}
          <div className='md:col-span-1 lg:col-span-1 block rounded-3xl bg-white text-center drop-shadow-xl '>
            {/**----Head---- */}
            <div className='flex flex-col rounded-t-3xl items-center bg-dash2 border border-gray-300 pb-5 pt-5'>
              <span className='text-white font-semibold'>Total Employees</span>
            </div>
            {/**----Body---- */}
            <div className='p-7'>
              <span className="text-4xl font-semibold text-green-600 mt-2">{dash.totalEmployees}</span>
            </div>
          </div>

          {/**Total Post */}
          <div className='md:col-span-1 lg:col-span-1 block rounded-3xl bg-white text-center drop-shadow-xl'>
            {/**----Head---- */}
            <div className='flex flex-col rounded-t-3xl items-center bg-dash3 border border-gray-300 pb-5 pt-5'>
              <span className='text-white font-semibold'>Total Posts</span>
            </div>
            {/**----Body---- */}
            <div className='p-7'>
              <span className="text-4xl font-semibold text-green-600 mt-2">{dash.totalPosts}</span>
            </div>
          </div>

          {/**Total Logins //replaced with total users because how do I count logins???
           * marked as pending IGNORE
          */}
          <div className='md:col-span-1 lg:col-span-1 block rounded-3xl bg-white text-center drop-shadow-xl'>
            {/**----Head---- */}
            <div className='flex flex-col rounded-t-3xl items-center bg-dash4 border border-gray-300 pb-5 pt-5'>
              <span className='text-white font-semibold'>Total Users</span>
            </div>
            {/**----Body---- */}
            <div className='p-7'>
              <span className="text-4xl font-semibold text-green-600 mt-2">{dash.totalLogins}</span>
            </div>
          </div>
        </div> 
      
        {/**For Ongoing Semester and School Year */}
        <div className='flex flex-col px-3 mt-5 w-full md:w-1/2'>
            <span className= "text-sm font-semibold">School Year : </span> <hr className="w-[40%]"/>
            <div className='mt-2'>
                <input className="bg-gray-50 border border-gray-300 mt-2 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 "
                    name="degree"
                    type='text'
                    placeholder=''
                    value={semesterInformation}
                    disabled readOnly/>
            </div>
        </div>
        
        {/**Archive: */}
        <h2 className="text-base font-semibold mt-8 mb-2">Recent Archives: </h2>
        <div>
          {Archive_Data.slice(0,3).map((archive_table, index) => (
            <div key={index} className="border p-2">
              <div className="text-sm ">
                {archive_table.item_type} {archive_table.item_name} has been archived from: {archive_table.origin_table} table by user: {archive_table.archiver_name} with role: {archive_table.archiver_role} on {archive_table.archived_at}
              </div>
            </div>
          ))}
          <div className="flex justify-between items-center">
            <button onClick={openArchiveModal} className="text-gray-500 hover:text-black text-sm p-2 rounded ml-auto">
              More Archives...
            </button>
          </div>
        </div>
        {/**LOGS */}
        <h2 className="text-base font-semibold mt-5 mb-2">Recent Logs: </h2>
        <div>
        {Logs_Data.slice(0, 3).map((logs_table, index) => (
          <div key={index} className="border p-2">
            <div className="text-sm ">
              {logs_table.action_taken} at {logs_table.date} by {logs_table.user_name} with role {logs_table.user_role} in {logs_table.location} table
            </div>
          </div>
        ))}
          <div className="flex justify-between items-center">
            <button onClick={openLogModal} className="text-gray-500 hover:text-black text-sm p-2 rounded ml-auto">
              More Logs...
            </button>
          </div>
        </div>
    </div>
      {/* Show Modals */}
      <ShowArchives
            showModal={isArchiveModalOpen}
            onClose={closeArchiveModal}
            dataTable = {Archive_Data}
      />
      <ShowLogs
            showModal={isLogModalOpen}
            onClose={closeLogModal}
            dataTable = {Logs_Data}
      />
   </div>
  );
}
