import React, { useState } from 'react';
import styled from "styled-components"
// import Input from './Input';
// import Button from './Button';
import AreaCodeDropdown from './SearchableDropDown';

import { validatePhoneNumber } from './services';

import { useMediaQuery } from 'react-responsive';
import { usePhoneNumbersContext } from '../../context/phone-numbers-context';
import { useNavigate } from 'react-router-dom';

import COUNTRY_CODES from './data/country-code.json';
const DEFAULT_AREA_CODE = {
  "name": "Hong Kong",
  "flag": "🇭🇰",
  "code": "HK",
  "dial_code": "+852"
};

const Container = styled.div`
  display:flex;
  flex-direction: column;
  align-items: center;
`;

const Image = styled.img
  .attrs({
    src: './phone-icon.png'
  })`
width:15rem;
height: 15rem;
display: inline-block;
margin: 0 auto;
`;

const FormContainer = styled.div`
  border: 1px solid #000;  
  width: 600px;
  padding: 30px 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 30px;
`

const FieldWrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 7fr;
  justify-content: center;
  column-gap: 20px;
`

const FieldLabel = styled.label`
  text-align: end;
`

const PhoneNumberInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const PhoneNumberInput = styled.input`
  height: 40px;
  min-width: 300px;
  box-sizing: border-box;
  border-radius: 5px;
`;

const Status = styled.p`
  margin: 0;
  padding: 0;
  color: red;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  column-gap: 20px;
`;

const ValidateButton = styled.button`
  max-width: 250px;
  padding: 10px 10px;
  border-radius: 8px;
  background-color: #2F3C5B;
  color: #76FBD6;
  font-size: 16px;

  &:hover {
    cursor: pointer;
    transition: opacity .5s ease-out,color .5s ease-out,opacity .5s ease-out,background-color .5s ease-out
  }
`

const ResetButton = styled.button`
  text-decoration: underline;
  border: none;
  background: none;
  color: #1f81b4;
  font-size: 16px;

  &:hover {
    cursor: pointer;
  }
`

const Home = () => {
  const isMobile = useMediaQuery({ query: '(min-width: 639px)' });
  const [areaCode, setAreaCode] = useState(DEFAULT_AREA_CODE);
  const [phoneNum, setPhoneNum] = useState('');
  const [status, setStatus] = useState('');
  const { updatePhoneNums } = usePhoneNumbersContext();
  const navigate = useNavigate();

  const onAreaCodeChange = (option) => {
    setAreaCode(option);
    setStatus('');
  }

  const onPhoneChange = (e) => {
    const newPhoneNum = e?.target?.value || '';
    const filteredPhoneNum = newPhoneNum.replace(/[^0-9]+/gi, '');
    setPhoneNum(filteredPhoneNum);
  }

  const onValidatePhoneNum = async () => {
    if(!phoneNum) {
      setStatus('Please enter a phone number');
      return;
    }
    const dialCode = areaCode?.dial_code?.replace(/\D/g, '');
    const isValid = await validatePhoneNumber(dialCode, phoneNum) 
    if(!isValid) {
      setStatus(`Phone number +${dialCode} ${phoneNum} is not valid, please try another phone number.`);
      updatePhoneNums(dialCode, phoneNum, isValid);
    }else {
      setStatus(`Phone number +${dialCode} ${phoneNum} is a valid phone number.`);
      updatePhoneNums(dialCode, phoneNum, isValid);
      navigate('/result')
    }

  }

  const onReset = () => {
    setAreaCode(DEFAULT_AREA_CODE);
    setPhoneNum('');
    setStatus('');
  }

  return (
    <Container>
      <Image />
      <FormContainer>
        <p>Phone Number Validation Tool</p>
        <FieldWrapper>
          <FieldLabel>Area Code</FieldLabel>
          <AreaCodeDropdown
            options={COUNTRY_CODES}
            onSelectChange={(option) => onAreaCodeChange(option)}
            selected={areaCode} />
        </FieldWrapper>

        <FieldWrapper>
          <FieldLabel>Phone number</FieldLabel>
          <PhoneNumberInputWrapper>
            <PhoneNumberInput type='text' value={phoneNum} onChange={onPhoneChange} />
            {status && (<Status>{status}</Status>)}
          </PhoneNumberInputWrapper>
        </FieldWrapper>

        <ButtonWrapper>
          <ValidateButton onClick={onValidatePhoneNum}>Check My Number</ValidateButton>
          <ResetButton onClick={onReset}>Reset</ResetButton>
        </ButtonWrapper>
   
      </FormContainer>
    </Container>
  )
}
export default Home;