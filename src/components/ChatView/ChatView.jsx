import React, {useState, useEffect} from 'react'
import { BsThreeDots } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { getPatients } from '../../services/api';
const ChatView = () => {

    const [patient, setPatient] = useState(null);

    useEffect(() => {
    getPatients()
        .then((res) => {
        // Show only Jessica Taylor
        const data = res.data;
        console.log(data);
        
        const jessica = data.find((p) => p.name === 'Jessica Taylor');
        setPatient(jessica);
        })
        .catch((err) => console.error(err));
    }, []);

    
  return (
    <div className='chat-wrapper bg-white p-3 rounded-xl'>
        <div className='wrapper flex flex-col gap-2 p-2'>
            <div className='flex justify-between items-center'>
                <h2 className='font-bold'>Patients</h2>
                <p><FaSearch /></p>
            </div>
            <div className='flex flex-col gap-2'>
                {patient && (
                <div className='flex justify-between p-1'>
                    <div className='flex items-center gap-2'>
                    <img src='/src/assets/profile.png' style={{ height: '40px' }} alt='dp' />
                    <div>
                        <h3 className='font-bold text-sm'>{patient.name}</h3>
                        <p className='text-xs'>{patient.gender}, {patient.age}</p>
                    </div>
                    </div>
                    <p><BsThreeDots /></p>
                </div>
                )}

            </div>
        </div>
        {/* <div style={{height: '60px'}}></div> */}
    </div>
  )
}

export default ChatView