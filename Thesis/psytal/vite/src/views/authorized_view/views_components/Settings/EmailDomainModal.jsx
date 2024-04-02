import React, { useState, useEffect } from 'react'
import axiosClient from '../../../../axios';
import edit from "@assets/icons8createpost.png";
import archive from "@assets/delete.png"
import ReactModal from 'react-modal';
import EditEmailDomain from './EditEmailDomain';
import DeleteEmailDomainModal from './DeleteEmailDomainModal';
import Feedback from '../../../feedback/Feedback';
import CreatePrompt from '../../prompts/CreatePrompt';

export default function EmailDomainModal({closeModal}) {
    const [error, setError] = useState({__html: ""});
    const [successMessage, setSuccessMessage] = useState('');
    const [successStatus, setSuccessStatus] = useState('');
    const [emailDomain, setEmailDomain] = useState('');
    const [emailDomainList, setEmailDomainList] = useState([]);
    const [showEditEmailDomainModal, setShowEditEmailDomainModal] = useState(false);
    const [selectedEmailDomain, setSelectedEmailDomain] = useState('');
    const [showDeleteEmailDomainModal, setShowDeleteEmailDomainModal] = useState(false);
    const [showAddEmail, setShowAddEmail] = useState(true);
    const [showPrompt, setShowPrompt] = useState(false);
    const [promptMessage, setPromptMessage] = useState('');
    const action = "Confirm Add New Email Domain";

    const fetchData = async () => {
      try {
        const response = await axiosClient.get('/emaildomainindex');
        setEmailDomainList(response.data[0]);
      } catch (error) {
        console.error(error);
      }
    };

    //For fetching the list of the saved Email Domain from the Database
    useEffect(() => {
        
        fetchData();
      }, []);    

    //For saving the Email Domain to the data base
    const onSubmit = async () => {
        setError({ __html: "" });
     
         try {
          const response = await axiosClient.post('/addemaildomains', {email_domains: (emailDomain)});
          setSuccessMessage(response.data.message);
          setSuccessStatus(response.data.success);

          fetchData();
          setEmailDomain('');
        } catch (error) {
            setSuccessMessage(response.data.message)
            setSuccessStatus(false)
        }
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

  //<><><><><><>
  const addprompt = (ev) => {
    ev.preventDefault();
    const concatmessage = 'New email domain: "' + emailDomain + '" will be created. Do you wish to proceed?';
    setPromptMessage(concatmessage);
    setShowPrompt(true);
  }

  return (
    <>
      <div className='overflow-auto'>
      <Feedback isOpen={successMessage !== ''} onClose={() => setSuccessMessage('')} successMessage={successMessage} status={successStatus} refresh={false}/>
        <div>
          <div className='text-center'>
            <strong className="text-lg">Configure Email Domains</strong>
          </div>
          <hr></hr>
          
        </div>
        <div className="pt-3 table-container overflow-x-auto max-h-[400px] ">
            <table className="table w-full table-striped border border-gray-300">
                <thead className='bg-gray-200'>
                  <tr>
                    <th>Email Domains</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                    {emailDomainList.map((item, index) => (
                        <tr key={index} className={`${index % 2 === 0 ? 'bg-green-100' : 'bg-white'}`}>
                            <td className="text-center px-2">{item.email_domains}</td>
                            <td className= "flex text-center px-2">
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
            <br></br>
            <div className="text-center">
              <div hidden={!showAddEmail}>
                <button onClick={() => setShowAddEmail(false)} className="bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded-2xl">
                  Add New
                </button>
              </div>
                <form onSubmit={addprompt} hidden={showAddEmail}>
                    <label className='pr-2'>
                        Email Domain: 
                    </label>
                    <input 
                        id="emailDomain"
                        type="text" 
                        placeholder="@example.com"
                        value={emailDomain}
                        onChange={ev => setEmailDomain(ev.target.value)}
                        required
                        className='mr-1'
                    />
                    {/**===========SUMBIT Button============= */}
                        <button type='submit' className="bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded-2xl mr-1">
                          Submit
                        </button>
                        <button type='button' onClick={() => setShowAddEmail(true)} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-2xl mr-1">
                          Cancel
                        </button>
                </form>
            </div>
        </div>

        <ReactModal
            isOpen={showPrompt}
            onRequestClose={() => setShowPrompt(false)}
            className="md:w-[1%]"
          >
            <div>
                <CreatePrompt
                    closeModal={() => setShowPrompt(false)}
                    handleSave={onSubmit}
                    action={action}
                    promptMessage={promptMessage}
                />
            </div>
        </ReactModal>

        <ReactModal
            isOpen={showEditEmailDomainModal}
            onRequestClose={() => setShowEditEmailDomainModal(false)}
            className="w-full md:w-[30%] h-fit bg-[#FFFFFF] rounded-3xl ring-1 ring-black shadow-2xl mt-[10%] mx-auto p-5"
        >
            <div>
                <EditEmailDomain
                    closeModal={() => {
                      setShowEditEmailDomainModal(false);
                      fetchData();
                    }}
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
                  onDelete={() => {fetchData()}}
                />
              </ReactModal>
            )}
      </div>
    </>
  )
}
