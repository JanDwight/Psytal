import React, { Component } from 'react';
import edit from "@assets/icons8createpost.png";
import archive from "@assets/delete.png"
import EditUsers from '../views_components/EditUsers.jsx'; //<-- Import EditUsers component
import ArchiveUsers from '../views_components/ArchiveUsers.jsx';
import axiosClient from '../../../axios.js';

class StudentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [], // Initialize with an empty array
      isArchiveUsersOpen: false, // Initially, the custom modal for archiving users is closed
      isEditUsersOpen: false, // Initially, the custom modal for editing users is closed
      selectedStudent: null, // Store the selected student for the modals
    };
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = () =>{
    //<><><> try function componentDidMount the use useEffect for axios
    axiosClient.get('/studentprofile')
    .then((response) => {
      const data = response.data;

      this.setState({ data: data });
      //this.fetchData();

    })
    .catch((error) => {
      console.error('Error fetching data from the database:', error);
    });
  }

  //<><><> Open ArchiveUsers modal
  handleArchiveClick = (student) => {
    console.log('Archive Window Open');
    this.setState({
      selectedStudent: student,
      isArchiveUsersOpen: true,
    });
  };

  //<><><> Open EditUsers modal
  handleEditUsersClick = (student) => {
    console.log('Edit Window Open');
    this.setState({
      selectedStudent: student,
      isEditUsersOpen: true,
    });
  };

  //<><><> Close ArchiveUsers modal
  handleCloseArchiveUsers = () => {
    console.log('Archive User Closed');
    this.setState({
      isArchiveUsersOpen: false,
    });
    this.fetchData();
  };

  //<><><> Close EditUsers modal
  handleCloseEditUsers = () => {
    console.log('Edit User Closed');
    this.setState({
      isEditUsersOpen: false,
    });
    this.fetchData();
  };

  render() {
    const { data, selectedStudent } = this.state;
    const { filterText } = this.props;

    // Apply filtering for search bar
    const filteredData = data.filter(
      (student) =>
        student.student_school_id.toString().includes(filterText) || // Filter by ID
        student.full_name.toLowerCase().includes(filterText.toLowerCase()) ||
        student.email.toLowerCase().includes(filterText.toLowerCase()) ||
        student.yrsection.toLowerCase().includes(filterText.toLowerCase()) 
    );

    return (
      <div>
       <table className="table w-full table-striped text-gray-700">
          <thead>
            <tr>
              <th className="text-left bg-gray-200 p-2" style={{ width: "10%" }}>School ID</th>
              <th className="text-left bg-gray-200 p-2" style={{ width: "10%" }}>Name</th>
              <th className="text-left bg-gray-200 p-2" style={{ width: "10%" }}>Email</th>
              <th className="text-left bg-gray-200 p-2" style={{ width: "10%" }}>Year & Section</th>
              <th className="text-left bg-gray-200 p-2" style={{ width: "10%" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((student, index) => (
              <tr key={index} className={index % 2 === 0 ? 'odd:bg-green-100' : ''}>
                <td className="text-left p-2" style={{ width: "10%" }}>{student.student_school_id}</td>
                <td className="text-left p-2" style={{ width: "10%" }}>{student.full_name}</td>
                <td className="text-left p-2" style={{ width: "10%" }}>{student.email}</td>
                <td className="text-left p-2" style={{ width: "10%" }}>{student.yrsection}</td>
                <td className="text-left p-2" style={{ width: "10%" }}>
                <div className="flex items-center">
                  <img
                    src={edit} 
                    alt='edit'
                    className='h-5 w-5 cursor-pointer transform transition-transform hover:scale-125' 
                    onClick={() => this.handleEditUsersClick(student)}
                  />
                  <img
                    src={archive} 
                    alt='archive'
                    className='h-7 w-7 cursor-pointer transform transition-transform hover:scale-125' 
                    onClick={() => this.handleArchiveClick(student)}
                  />
                </div>
              </td>
              </tr>
            ))}
          </tbody>
        </table>

        {this.state.isArchiveUsersOpen && (
          <ArchiveUsers
            showModal={this.state.isArchiveUsersOpen}
            onClose={this.handleCloseArchiveUsers}
            user={selectedStudent} // Pass the selected student to EditUsers
            // Add other props/functions as needed for archiving
          />
        )} 
        {this.state.isEditUsersOpen && (
          <EditUsers
            showModal={this.state.isEditUsersOpen}
            onClose={this.handleCloseEditUsers}
            user={selectedStudent} // Pass the selected student to EditUsers
          />
        )}
        
      </div>
    );
  }
}

export default StudentList;
