import React, { useState } from 'react';
import { useForm, useStep } from "react-hooks-helper";
import { Redirect } from 'react-router-dom';

import './SignUp.css';
import PersonalInfo from './mutipage/PersonalInfo';
import CurriculumInfo from './mutipage/CurriculumInfo';
import Submit from './mutipage/Submit';

const defaultData = {
  userName: '',
  email: '',
  password: '',
  aaddharNo: '',
  mobileNo: '',
  standard: '',
  stream: '',
  giNo: '',
  prnNo: '',
  date: '',
}

const steps = [
  {id: 'personalInfo'},
  {id: 'curriculumInfo'},
  {id: 'submit'},
]

function SignUp(property) {
  let { history, user } = property

  const [profileImg, setProfileImg] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setForm] = useForm(defaultData);
  const { step, navigation } = useStep({
    steps,
    initialStep: 0,
  })

  const props = { formData, setForm, navigation }
  const submitPorps = { errorMessage, setErrorMessage, profileImg, setProfileImg }

  const handleKeyPress = (e) => {
    let charCode = (e.which) ? e.which : e.keyCode
    if(charCode > 31 && (charCode < 48 || charCode > 57)) {
      e.preventDefault();
    }
  }

  if(user) {
   return (
     <><Redirect to="/" /></>
   )
  }
  switch(step.id) {
    case 'personalInfo':
    return (
      <div className="container">
        <div className="signup">
          <PersonalInfo { ...props } handleKeyPress={handleKeyPress}/>
        </div>
      </div>
    )
    case 'curriculumInfo':
    return (
      <div className="container">
        <div className="signup">
          <CurriculumInfo { ...props } handleKeyPress={handleKeyPress}/>
        </div>
      </div>
    )
    case 'submit':
    return (
      <div className="container">
        <div className="signup">
          <Submit { ...props } {...submitPorps} history={history} />
        </div>
      </div>
    )
    default:
      return null
  }

}

export default SignUp
