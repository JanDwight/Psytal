import React, { Component } from 'react';
import edit from "@assets/icons8createpost.png";
import archive from "@assets/delete.png"
import EditClasses from '../views_components/EditClasses.jsx';
import ArchiveClasses from '../views_components/ArchiveClasses.jsx';
import ClassPopUp from '../views_components/ClassPopUp.jsx';
import axiosClient from '../../../axios.js';

class ClassList extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data: [],
        isArchiveClassesOpen: false,
        isEditClassesOpen: false,
        selectedClass: null,
        isClassPopUpOpen:false,
      };
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = () =>{

    // Fetch data from the Laravel API endpoint
    axiosClient.get('/classes') // Replace with your actual API endpoint
        .then((response) => {
          // Set the retrieved data in the component state
          this.setState({ data: response.data });
          //this.fetchData(); this line will update the page real-time but will start in infinite loop of fetch
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        }); // Empty dependency array to fetch data only once on component mount

  }

  // open class pop-up modal <><><><><>
  handleOpenPopUp = (subject) => {
    console.log('selected row: ', subject);
    this.setState({
      selectedClass: subject,
      isClassPopUpOpen: true,
    });
  };
  handleCloseClassPopUp = () => {
    this.setState({
      isClassPopUpOpen: false,
    });
  };

  //<><><> Open ArchiveClasses modal
  handleArchiveClick = (subject) => {
    console.log('Archive Window Open');
    this.setState({
      selectedClass: subject,
      isArchiveClassesOpen: true,
    });
  };

   //<><><> Close ArchiveClasses modal
   handleCloseArchiveClasses = () => {
    this.setState({
      isArchiveClassesOpen: false,
    });
  };

  //<><><> Open EditClasses modal
  handleEditClassesClick = (selected_subject) => {
    this.setState({
      selectedClass: selected_subject,
      isEditClassesOpen: true,
      
    });
  };

//<><><> Close EditClasses modal
handleCloseEditClasses = () => {
  this.setState({
    isEditClassesOpen: false,
  });
};

handleSaveClassChanges = () => {
  // saving
  this.setState({
    isEditClassesOpen: false,
  });
  console.log('Class Changes Saved:');
};

  //for search
  render() {
    const { data, selectedClass } = this.state;
    const { filterText } = this.props; // Receive filterText from parent component
    
    // Apply filtering for searchbar
    const filteredData = data.filter(
      (classes) =>
        classes.course_code.toString().includes(filterText) || // Filter by ID
        classes.class_code.toString().toLowerCase().includes(filterText.toLowerCase()) ||
        classes.course_title.toLowerCase().includes(filterText.toLowerCase()) ||
        classes.class_year.toLowerCase().includes(filterText.toLowerCase()) ||
        classes.class_section.toLowerCase().includes(filterText.toLowerCase()) ||
        classes.semester.toLowerCase().includes(filterText.toLowerCase()) ||
        classes.instructor_name.toLowerCase().includes(filterText.toLowerCase())
    );

    return (
      <div className="w-full h-[auto] px-4 mx-auto rounded-b-3xl bg-white shadow-2xl max-h-[400px] overflow-y-auto">
      
          <tbody className="">{filteredData.map((subject, index) => (
                <tr key={index} className='odd:bg-green-100 cursor-pointer'>
                <td className="text-left p-2" onClick={() => this.handleOpenPopUp(subject)}>{subject.class_code}</td>
                <td className="text-left p-2" onClick={() => this.handleOpenPopUp(subject)}>{subject.course_code}</td>
                <td className="text-left p-2" onClick={() => this.handleOpenPopUp(subject)}>{subject.course_title}</td>
                <td className="text-left p-2" onClick={() => this.handleOpenPopUp(subject)}>{subject.semester}</td>
                <td className="text-left p-2" onClick={() => this.handleOpenPopUp(subject)}>{subject.class_year}</td>
                <td className="text-left p-2" onClick={() => this.handleOpenPopUp(subject)}>{subject.class_section}</td>
                <td className="text-left p-2" onClick={() => this.handleOpenPopUp(subject)}>{subject.instructor_name}</td>
                <td className="text-left p-2">
                  <div className="flex items-center">
                    <img
                      src={edit}
                      alt='Edit'
                      className='h-5 w-5 cursor-pointer transform transition-transform hover:scale-125'
                      onClick={() => this.handleEditClassesClick(subject)}
                    />
                    <img
                      src={archive} 
                      alt='Archive'
                      className='h-7 w-7 cursor-pointer transform transition-transform hover:scale-125' 
                      onClick={() => this.handleArchiveClick(subject)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        
        {this.state.isArchiveClassesOpen && (
          <ArchiveClasses
            showModal={this.state.isArchiveClassesOpen}
            onClose={this.handleCloseArchiveClasses}
            subject={selectedClass}
            //  other props/functions as needed for archiving
          />
        )}
        {this.state.isEditClassesOpen && (
          <EditClasses
            showModal={this.state.isEditClassesOpen}
            onClose={this.handleCloseEditClasses}
            subject={selectedClass} 
            onSave={this.handleSaveClassChanges}
          />
        )}
        {this.state.isClassPopUpOpen && (
          <ClassPopUp
            showModal={this.state.isClassPopUpOpen}
            onClose={this.handleCloseClassPopUp}
            subject={selectedClass}
          />
        )}
      </div>
      
    );
  }
}

export default ClassList;