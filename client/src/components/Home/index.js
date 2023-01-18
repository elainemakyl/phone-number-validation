import React, { useState } from 'react';
import styled from "styled-components"

import { useMediaQuery } from 'react-responsive';

// import Input from './Input';
import AreaCodeDropdown from './SearchableDropDown';
// import Button from './Button';


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

const PhoneNumberInput = styled.input`
  height: 40px;
  min-width: 300px;
  box-sizing: border-box;
`;

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

  const onSelectChange = (option) => {
    setAreaCode(option);
  }

  const onPhoneChange = (e) => {
    const newPhoneNum = e?.target?.value || '';
    const filteredPhoneNum = newPhoneNum.replace(/[^0-9]+/gi, '');
    setPhoneNum(filteredPhoneNum);
  }

  const onReset = () => {
    setAreaCode(DEFAULT_AREA_CODE);
    setPhoneNum('');
  }

  console.log(phoneNum);
  return (
    <Container>
      <Image />
      <FormContainer>
        <p>Phone Number Validation Tool</p>
        <FieldWrapper>
          <FieldLabel>Area Code</FieldLabel>
          <AreaCodeDropdown
            options={COUNTRY_CODES}
            onSelectChange={(option) => onSelectChange(option)}
            selected={areaCode} />
        </FieldWrapper>
      
        <FieldWrapper>
          <FieldLabel>Phone number</FieldLabel>
          <PhoneNumberInput type='text' value={phoneNum} onChange={onPhoneChange}/>
        </FieldWrapper>

        <ButtonWrapper>
          <ValidateButton>Check My Number</ValidateButton>
          <ResetButton onClick={onReset}>Reset</ResetButton>
        </ButtonWrapper>
   
      </FormContainer>
    
    </Container>
  )
}
export default Home;