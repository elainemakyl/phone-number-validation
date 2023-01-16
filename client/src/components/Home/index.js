import React, { useState } from 'react';
import styled from "styled-components"

import { useMediaQuery } from 'react-responsive';

import Input from './Input';
import AreaCodeDropdown from './SearchableDropDown';
import Button from './Button';


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
  align-item: center;
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

const Home = () => {
  const isMobile = useMediaQuery({ query: '(min-width: 639px)' });
  const [areaCode, setAreaCode] = useState(DEFAULT_AREA_CODE);

  const onSelectChange = (option) => {
    setAreaCode(option);
  }

  return (
    <Container>
      <Image />
      <p>Phone Number Validation Tool</p>
      <AreaCodeDropdown
        label={'Area Code'}
        options={COUNTRY_CODES}
        onSelectChange={(option) => onSelectChange(option)}
        selected={areaCode} />
      <Input />
      <Button />
    </Container>
  )
}
export default Home;