import React, {useState, useEffect} from 'react'
import { FaDownload } from "react-icons/fa6";
import { getPatients } from '../../services/api';

const Profile = () => {

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
    <div className='profile-wrapper flex flex-col gap-4 '>
      {patient && (
        <div className='profile p-3 flex flex-col rounded-xl bg-white gap-3'>
          <div className='flex flex-col justify-center'>
            <img style={{height: '200px', width: '200px', margin: '0 auto',}} src={patient.profile_picture}/>
            <h2 className='font-bold text-center my-2'>{patient.name}</h2>
          </div>
          <div className= "flex gap-2 items-center">
            <div style={{height: '40px', width: '40px', borderRadius: '50%'}}>
              <img src='/src/assets/BirthIcon.svg' alt='card'/>
            </div>
            <div>
              <h3 className='text-sm'>Date Of Birth</h3>
              <p className="text-sm font-bold">{patient.date_of_birth}</p>
            </div>
          </div>

          <div className= "flex gap-2 items-center">
            <div style={{height: '40px', width: '40px', borderRadius: '50%'}}>
              <img src='/src/assets/BirthIcon.svg' alt='card'/>

            </div>
            <div>
              <h3 className='text-sm'>Gender</h3>
              <p className="text-sm font-bold">{patient.gender}</p>
            </div>
          </div>
          <div className= "flex gap-2 items-center">
            <div style={{height: '40px', width: '40px', borderRadius: '50%'}}>
              <img src='/src/assets/PhoneIcon.svg' alt='card'/>

            </div>
            <div>
              <h3 className='text-sm'>Contact Info</h3>
              <p className="text-sm font-bold">{patient.phone_number}</p>
            </div>
          </div>
          <div className= "flex gap-2 items-center">
            <div style={{height: '40px', width: '40px', borderRadius: '50%'}}>
              <img src='/src/assets/PhoneIcon.svg' alt='card'/>
            </div>
            <div>
              <h3 className='text-sm'>Emergency Contacts</h3>
              <p className="text-sm font-bold">{patient.emergency_contact}</p>
            </div>
          </div>
          <div className= "flex gap-2 items-center">
            <div style={{height: '40px', width: '40px', borderRadius: '50%'}}>
              <img src='/src/assets/InsuranceIcon.svg' alt='card'/>
            </div>
            <div>
              <h3 className='text-sm'>Insurance Provider</h3>
              <p className="text-sm font-bold">{patient.insurance_type}</p>
            </div>
          </div>
          <button className='btn p-2 bg-[#01F0D0] rounded-xl text-xs font-bold mt-2'>Show All Information</button>


        </div>
      )}
      {patient && (
      <div className='results bg-white p-3 mb-4 flex flex-col gap-2 rounded-xl'>
        <h3 className='font-bold'>Lab Results</h3>
        <ul>
          {patient.lab_results.map((results, i) => (
            <li key={i} className="hover:bg-gray-100 cursor-pointer p-2 flex justify-between items-center rounded">
              <p>{results}</p>
              <FaDownload />
            </li>
          ))}
        </ul>
      </div>
      )}



      <div style={{height: '60px'}}></div>

    </div>
  )
}

export default Profile