import React, { Component } from 'react';
import edit from "@assets/icons8createpost.png";
import archive from "@assets/delete.png"
import EditUsers2 from '../views_components/EditUsers2.jsx';
import ArchiveUsers from '../views_components/ArchiveUsers.jsx';
import axiosClient from '../../../axios.js';2

class EmployeeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isArchiveUsersOpen: false, // the custom modal for archiving users is closed
      isEditUsersOpen: false, // the custom modal for editing users is closed
      selectedEmployee: null, // store the selected employee for the modals
      selectedEmployeeRole: null, // store selected employee's role for modals
    };
  }

  componentDidMount() {
    //<><><>
    axiosClient.get('/employeeprofile')
      .then((response) => {
        const data = response.data;

        this.setState({ data: data   });

      })
      .catch((error) => {
        console.error('Error fetching data from the database:', error);
      });
  }

  //<><><> Open ArchiveUsers modal
  handleArchiveClick = (employee) => {
    console.log('Archive Window Open');
    this.setState({
      selectedEmployee: employee,
      isArchiveUsersOpen: true,
    });
  };

  //<><><> Close ArchiveUsers modal
  handleCloseArchiveUsers = () => {
    console.log('Archive Cancel Pressed');
    this.setState({
      isArchiveUsersOpen: false,
    });
    this.componentDidMount();
  };

  //<><><> Open EditUsers modal
  handleEditUsersClick = (employee) => {
    console.log('Edit Window Open');
    this.setState({
      selectedEmployee: employee,
      isEditUsersOpen: true,
    });
  };

  //<><><> Close EditUsers modal
  handleCloseEditUsers = () => {
    console.log('Edit Cancel Pressed');
    this.setState({
      isEditUsersOpen: false,
    });
    this.componentDidMount();
  };

  render() {

    const getRoleText = (role) => {
      switch (role) {
        case 1:
          return 'Admin';
        case 2:
          return 'Staff';
        case 3:
          return 'Instructor';
        default:
          return 'Unknown Role';
      }
    };
    
    const { data, selectedEmployee } = this.state;
    const { filterText } = this.props;

      // Apply filtering for searchbar
      const filteredData = data.filter((employee) => {
        const roleText = getRoleText(employee.role).toLowerCase(); //Used to filter text values instead of numeric value 1,2,3

        
        return (
          employee.employee_id.toString().includes(filterText) || // Filter by ID
          employee.full_name.toLowerCase().includes(filterText.toLowerCase()) ||
          employee.username.toLowerCase().includes(filterText.toLowerCase()) ||
          employee.email_address.toLowerCase().includes(filterText.toLowerCase()) ||
          roleText.includes(filterText.toLowerCase()) //returns the text values of the role 
        );
      });

      

    return (
      <>
      <div>
        <table className="table w-full table-striped text-gray-700">
          <thead>
            <tr>
              <th className="text-left bg-gray-200 p-2" style={{ width: "10%" }}>Employee ID</th>
              <th className="bg-gray-200 text-left p-2" style={{ width: "10%" }}>Name</th>
              <th className="bg-gray-200 text-left p-2" style={{ width: "10%" }}>Username</th>
              <th className="bg-gray-200 text-left p-2" style={{ width: "10%" }}>Email</th>
              <th className="bg-gray-200 text-left p-2" style={{ width: "10%" }}>Role</th>
              <th className="bg-gray-200 text-left p-2" style={{ width: "10%" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((employee, index) => (
              <tr key={index} className={index % 2 === 0 ? 'odd:bg-green-100' : ''}>
                <td className="text-left p-2" style={{ width: "10%" }}>{employee.employee_id}</td>
                <td className="text-left p-2" style={{ width: "10%" }}>{employee.full_name}</td>
                <td className="text-left p-2" style={{ width: "10%" }}>{employee.username}</td>
                <td className="text-left p-2" style={{ width: "10%" }}>{employee.email_address}</td>
                <td className="text-left p-2" style={{ width: "10%" }}>{getRoleText(employee.role)}</td>
                <td className="text-left p-2" style={{ width: "10%" }}>
                <div className="flex items-center">
                  <img
                    src={edit} 
                    alt='edit'
                    className='h-5 w-5 cursor-pointer transform transition-transform hover:scale-125'
                    onClick={() => this.handleEditUsersClick(employee)}
                  />
                  <img
                    src={archive} 
                    alt='archive'
                    className='h-7 w-7 cursor-pointer transform transition-transform hover:scale-125'
                    onClick={() => this.handleArchiveClick(employee)}
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
            user={selectedEmployee} // Pass the selected employee to EditUsers
            // Add other props/functions as needed for archiving
          />
        )}

        {this.state.isEditUsersOpen && (
          <EditUsers2
            showModal={this.state.isEditUsersOpen}
            onClose={this.handleCloseEditUsers}
            user={selectedEmployee} // Pass the selected employee to EditUsers
          />
        )}

      </div>
      </>
    );
  }
}

export default EmployeeList;
