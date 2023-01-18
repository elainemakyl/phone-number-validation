import React from 'react';
import { usePhoneNumbersContext } from '../../context/phone-numbers-context';
import { useNavigate } from 'react-router-dom';

const PhoneNumberResult = () => {
  const { phoneNums } = usePhoneNumbersContext();
  const navigate = useNavigate();

  const onGoBack = () => {
    navigate('/');
  }
  
  return (
    <>
      <table>
        <thead>
          <tr>
            <td>Area Code</td>
            <td>Phone Number</td>
            <td>Valid</td>
          </tr>
        </thead>
        <tbody>
          {phoneNums.map(({ dialCode, phone, isValid }, idx) => (
            <tr key={`${dialCode}${phone}_${idx}`}>
              <td>{dialCode}</td>
              <td>{phone}</td>
              <td>{isValid ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={onGoBack}>Go back</button>
    </>
  )
}

export default PhoneNumberResult;