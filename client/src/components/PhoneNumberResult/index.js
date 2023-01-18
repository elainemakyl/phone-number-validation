import React from 'react'
import styled from 'styled-components'

import { usePhoneNumbersContext } from '../../context/phone-numbers-context'
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
  display:flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
  row-gap: 15px;
`

const Title = styled.p`
  margin: 0;
  padding: 0;
  font-size: 22px;
  font-weight: bold;
`

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 600px;
  height: 500px;
  overflow-y: scroll;
  
`

const Table = styled.table`
  width: 100%;
  max-height: 300px;
  border-spacing: 0px;
  border-radius: 10px;
  border: 1px solid #E9EDF5;
  
  & tr:nth-child(2n) {
    background-color: rgba(247, 249, 252, 0.8);
  }
`

const HeaderRow = styled.tr`
  height: 40px;
  background-color: #2F3C5B50;
  border-radius: 10px 10px 0 0 ;
`

const DataRow = styled.tr`
  height: 40px;
`

const GoBackButton = styled.button`
  max-width: 250px;
  padding: 10px 20px;
  border-radius: 8px;
  background-color: #2F3C5B;
  color: #76FBD6;
  font-size: 16px;
`

const PhoneNumberResult = () => {
  const { phoneNums } = usePhoneNumbersContext()
  const navigate = useNavigate()

  const onGoBack = () => {
    navigate('/')
  }

  return (
    <Container>
      <Title>Validation History</Title>
      <TableContainer>
        <Table>
          <thead>
            <HeaderRow>
              <td>Area Code</td>
              <td>Phone Number</td>
              <td>Valid</td>
            </HeaderRow>
          </thead>
          <tbody>
            {phoneNums.map(({ dialCode, phone, isValid }, idx) => (
              <DataRow key={`${dialCode}${phone}_${idx}`}>
                <td>{dialCode}</td>
                <td>{phone}</td>
                <td>{isValid ? 'Yes' : 'No'}</td>
              </DataRow>
            ))}
          </tbody>
        </Table>
      </TableContainer>
      <GoBackButton onClick={onGoBack}>Go back</GoBackButton>
    </Container>
  )
}

export default PhoneNumberResult
