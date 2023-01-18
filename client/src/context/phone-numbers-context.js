/* eslint-disable react/prop-types */
import React, { useContext, createContext, useState } from 'react'

const PhoneNumbersContext = createContext()
PhoneNumbersContext.displayName = 'PhoneNumbersContext'

const usePhoneNumbersContext = () => {
  const context = useContext(PhoneNumbersContext)
  if (context === undefined) {
    throw new Error('usePhoneNumbersContext must be used within a usePhoneNumberProvider')
  }
  return context
}

const PhoneNumbersProvider = ({ children }) => {
  const [phoneNums, setPhoneNums] = useState([])
  const updatePhoneNums = (dialCode, phone, isValid) => {
    const newPhoneNums = [...phoneNums, {
      dialCode,
      phone,
      isValid
    }]
    setPhoneNums(newPhoneNums)
  }

  return (
    <PhoneNumbersContext.Provider
      value={{
        phoneNums,
        updatePhoneNums
      }}>
      {children}
    </PhoneNumbersContext.Provider>
  )
}

export { usePhoneNumbersContext, PhoneNumbersProvider }
