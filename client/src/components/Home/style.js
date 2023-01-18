import styled from 'styled-components'

export const Container = styled.div`
  display:flex;
  flex-direction: column;
  align-items: center;
  row-gap: 20px;
  padding: 50px;
`

export const Image = styled.img
  .attrs({
    src: './phone-icon.png'
  })`
  width:15rem;
  height: 15rem;
  display: inline-block;
  margin: 0 auto;
`

export const Title = styled.p`
  margin: 0;
  padding: 0;
  font-size: 22px;
  font-weight: bold;
`

export const FormContainer = styled.div`
  border: 1px solid #2F3C5B;  
  border-radius: 10px;
  width: 600px;
  padding: 30px 50px;
  box-sizing: border-box;
  display: grid;
  flex-direction: column;
  justify-items: center;
  row-gap: 30px;
`

export const FieldWrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 7fr;
  justify-content: center;
  column-gap: 20px;
  align-items: center;
`

export const FieldLabel = styled.label`
  text-align: end;
`

export const PhoneNumberInput = styled.input`
  min-height: 40px;
  width: 300px;
  box-sizing: border-box;
  border-radius: 5px;
  border-width: 1px;

  &:focus {
    outline: #76FBD6 solid 1px;
    border: 1px solid #76FBD6;
    box-shadow: 0 0 5px #719ECE;
  }
`

export const Status = styled.p`
  color: #E23568;
  background-color: #E2356822;
  padding: 15px 20px;
  border-radius: 5px;
  margin: 0 30px;
  box-sizing: border-box;
  width: 100%;
  max-width: 500px;
`

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  column-gap: 20px;
`

export const ValidateButton = styled.button`
  max-width: 250px;
  padding: 10px 20px;
  border-radius: 8px;
  background-color: #2F3C5B;
  color: #76FBD6;
  font-size: 16px;
`

export const ResetButton = styled.button`
  text-decoration: underline;
  border: none;
  background: none;
  color: #1f81b4;
  font-size: 16px;

  &:hover {
    cursor: pointer;
  }
`
