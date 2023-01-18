import React, { useState } from 'react'

import AreaCodeDropdown from './AreaCodeDropdown'

import { validatePhoneNumber } from './data/services'

import { usePhoneNumbersContext } from '../../context/phone-numbers-context'
import { useNavigate } from 'react-router-dom'

import COUNTRY_CODES from './data/country-code.json'
import {
  Container, Image, Title, FormContainer, FieldWrapper, FieldLabel, PhoneNumberInput, Status, ButtonWrapper, ValidateButton, ResetButton
} from './style'

const DEFAULT_AREA_CODE = {
  name: 'Hong Kong',
  flag: '🇭🇰',
  code: 'HK',
  dial_code: '+852'
}

const Home = () => {
  const [areaCode, setAreaCode] = useState(DEFAULT_AREA_CODE)
  const [phoneNum, setPhoneNum] = useState('')
  const [status, setStatus] = useState('')
  const { updatePhoneNums } = usePhoneNumbersContext()
  const navigate = useNavigate()

  const onAreaCodeChange = (option) => {
    setAreaCode(option)
    setStatus('')
  }

  const onPhoneChange = (e) => {
    const newPhoneNum = e?.target?.value || ''
    const filteredPhoneNum = newPhoneNum.replace(/[^0-9]+/gi, '')
    setPhoneNum(filteredPhoneNum)
  }

  const onValidatePhoneNum = async () => {
    if (!phoneNum) {
      setStatus('Please enter a phone number')
      return
    }
    const dialCode = areaCode?.dial_code?.replace(/\D/g, '')
    const result = await validatePhoneNumber(dialCode, phoneNum)
    if (result.err) {
      setStatus('Error while fetching, please try again')
    } else if (!result?.isValid) {
      setStatus(`Phone number +${dialCode} ${phoneNum} is not valid, please try another phone number.`)
      updatePhoneNums(dialCode, phoneNum, false)
    } else {
      setStatus(`Phone number +${dialCode} ${phoneNum} is a valid phone number.`)
      updatePhoneNums(dialCode, phoneNum, true)
      navigate('/result')
    }
  }

  const onReset = () => {
    setAreaCode(DEFAULT_AREA_CODE)
    setPhoneNum('')
    setStatus('')
  }

  return (
    <Container>
      <Image />
      <FormContainer>
        <Title>Phone Number Validation Tool</Title>
        <FieldWrapper>
          <FieldLabel>Area Code</FieldLabel>
          <AreaCodeDropdown
            options={COUNTRY_CODES}
            onSelectChange={(option) => onAreaCodeChange(option)}
            selected={areaCode} />
        </FieldWrapper>

        <FieldWrapper>
          <FieldLabel>Phone number</FieldLabel>
            <PhoneNumberInput type='text' value={phoneNum} onChange={onPhoneChange} />
        </FieldWrapper>

        {status && (<Status>{status}</Status>)}

        <ButtonWrapper>
          <ValidateButton onClick={onValidatePhoneNum}>Check My Number</ValidateButton>
          <ResetButton onClick={onReset}>Reset</ResetButton>
        </ButtonWrapper>

      </FormContainer>
    </Container>
  )
}
export default Home
