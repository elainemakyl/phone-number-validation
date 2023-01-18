import React from 'react'
import { render } from '@testing-library/react'
import PhoneNumberResult from '.'
import { PhoneNumbersProvider } from '../../context/phone-numbers-context'

const MOCK_PHONE_NUM_LIST = [
  {
    dialCode: '852',
    phone: '24114465',
    isValid: true
  }
]

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom')),
  useNavigate: () => ({
    navigate: jest.fn().mockImplementation(() => ({}))
  })
}))

describe('PhoneNumberResult', () => {
  test('should show No record when phone number list is empty', () => {
    const { getByText } = render(
      <PhoneNumbersProvider initPhoneNums={MOCK_PHONE_NUM_LIST}>
          <PhoneNumberResult />
      </PhoneNumbersProvider>
    )
    expect(getByText('24114465')).toBeInTheDocument()
  })
})
