import React, { useState, useEffect } from 'react'
import axiosClient from '../../../../axios';
import edit from "@assets/icons8createpost.png";
import archive from "@assets/delete.png"
import ReactModal from 'react-modal';
import EditEmailDomain from './EditEmailDomain';
import DeleteEmailDomainModal from './DeleteEmailDomainModal';

export default function EmailDomainModal({closeModal}) {
    const [error, setError] = useState({__html: ""});
    const [successMessage, setSuccessMessage] = useState(null);

    const [emailDomain, setEmailDomain] = useState('');
    const [emailDomainList, setEmailDomainList] = useState([]);

    const [showEditEmailDomainModal, setShowEditEmailDomainModal] = useState(false);
    const [selectedEmailDomain, setSelectedEmailDomain] = useState('');

    const [existingEmailDomains, setExistingEmailDomains] = useState([]);

    const [showDeleteEmailDomainModal, setShowDeleteEmailDomainModal] = useState(false);
    // const [selectedEmailDomain, setSelectedEmailDomain] = useState(null); // Assuming selectedEmailDomain should be of type object


    // Fetch all existing email domains from your data source
    useEffect(() => {
      axiosClient.get(`/getallemaildomains`)
        .then(({ data }) => {
          setExistingEmailDomains(data);          
        })
        .catch((error) => {
          console.error('Error fetching existing email domains:', error);
        });
    }, []);


    //For fetching the list of the saved Email Domain from the Database
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axiosClient.get('/emaildomainindex');
            setEmailDomainList(response.data[0]);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchData();
      }, []);    

    //For saving the Email Domain to the data base
    const onSubmit = (ev) => {
        ev.preventDefault();
        setError({ __html: "" });

         // Check if the updated email domain already exists
         const isDuplicate = existingEmailDomains.some(domain => domain.email_domains === emailDomain);

         if (isDuplicate) {
             setSuccessMessage({ message: "Email Domain Already Exists." });
             setTimeout(() => {
                 setSuccessMessage(null); 
               }, 1500);
             return; // Exit the function 
         }
        
        axiosClient
        .post('/addemaildomains', {
            email_domains: (emailDomain)
        })
        .then(({ data }) => {
          // Handle success, e.g., show a success message
          console.log(data);
    
          setSuccessMessage({
            message: 'Email domain added successfully!',
          });
          
          // Assuming the server response contains the newly added email domain
          const updatedEmailDomains = [...existingEmailDomains, {
            id: data.id,
            email_domains: data.email_domains,
            created_at: data.created_at,
            updated_at: data.updated_at,
            
          }]; console.log(updatedEmailDomains);//NOT WORKING

        //   setExistingEmailDomains(prevEmailDomains => [
        //     ...prevEmailDomains,
        //     {
        //         id: data.id,
        //         email_domains: data.email_domains,
        //         created_at: data.created_at,
        //         updated_at: data.updated_at,
        //         deleted_at: data.deleted_at,
        //     }
        // ]);

          

          setTimeout(() => {
            setSuccessMessage(null);
            setExistingEmailDomains(updatedEmailDomains);
          }, 2000);
        })
        .catch((error) => {
          // Handle errors, including validation errors
          console.error('Error sending data:', error);
          
        });
    };

    //For Updating Email Domains
    const handleEditClick = (item) => {
        setShowEditEmailDomainModal(true);
        setSelectedEmailDomain(item);
    };

    //For Deleting Email Domains
    const handleDeleteClick = (item) => {
      setShowDeleteEmailDomainModal(true);
      setSelectedEmailDomain(item);
  };

  return (
    <>
        <div>
            <form onSubmit={onSubmit}>
                <label className='pr-2'>
                    Email Domain: 
                </label>

                <input 
                    id="emailDomain"
                    type="text" 
                    placeholder="@example.com"
                    value={emailDomain}
                    onChange={ev => setEmailDomain(ev.target.value)}
                />

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
                          Submit
                    </button>
                </div>  
            </form>
        </div>

        <div className="pt-2  table-container overflow-x-auto max-h-[400px] overflow-y-auto">
            <table className="table w-full table-striped ">
                <tbody>
                    {emailDomainList.map((item, index) => (
                        <tr 
                            key={index} 
                            className={`${index % 2 === 0 ? 'bg-green-100' : 'bg-white'}`}
                        >
                            <td className="text-left p-2">
                                <div className="m-2">{item.email_domains}</div>
                            </td>

                            <td className= "flex items-center p-2">
                              <button onClick={() => handleEditClick(item)}>
                                <img src={edit} alt='edit' className='h-5 w-5 cursor-pointer transform transition-transform hover:scale-125'/>
                              </button>
                              <button onClick={() => handleDeleteClick(item)}>
                                <img src={archive} alt='archive' className='h-7 w-7 cursor-pointer transform transition-transform hover:scale-125'/>
                              </button>      
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table> 
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
        </div>

        <ReactModal
            isOpen={showEditEmailDomainModal}
            onRequestClose={() => setShowEditEmailDomainModal(false)}
            className="w-full md:w-[30%] h-fit bg-[#FFFFFF] rounded-3xl ring-1 ring-black shadow-2xl mt-[10%] mx-auto p-5"
        >
            <div>
                <EditEmailDomain
                    closeModal={() => setShowEditEmailDomainModal(false)}
                    selectedEmailDomain={selectedEmailDomain}
                />
            </div>
        </ReactModal>
        
        {showDeleteEmailDomainModal && (
                <ReactModal
                isOpen={showDeleteEmailDomainModal}
                onRequestClose={() => setShowDeleteEmailDomainModal(false)}
                className="w-full md:w-[30%] h-fit bg-[#FFFFFF] rounded-3xl ring-1 ring-black shadow-2xl mt-[10%] mx-auto p-5"
              >
                <DeleteEmailDomainModal
                  closeModal={() => setShowDeleteEmailDomainModal(false)}
                  emailDomain={selectedEmailDomain}
                  onDelete={() => {
                    // You can implement a fetch or any logic to refresh the email domain list after deletion
                    // For simplicity, I'm just calling the existing useEffect that fetches email domains
                    setEmailDomainList([]);
                  }}
                />
              </ReactModal>
            )}
    </>
  )
}
