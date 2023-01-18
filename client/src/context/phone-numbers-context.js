import React, { useContext, createContext, useState } from "react";

const PhoneNumbersContext = createContext();
PhoneNumbersContext.displayName = 'PhoneNumbersContext';

const FAKE_DATA = [
  {
    "dialCode": "852",
    "phone": "3",
    "isValid": false
  },
  {
    "dialCode": "852",
    "phone": "57034688",
    "isValid": true
  },
  {
    "dialCode": "1684",
    "phone": "55364467",
    "isValid": true
  },
  {
    "dialCode": "86",
    "phone": "18659340222",
    "isValid": true
  },
  {
    "dialCode": "852",
    "phone": "3",
    "isValid": false
  },
  {
    "dialCode": "852",
    "phone": "57034688",
    "isValid": true
  },
  {
    "dialCode": "1684",
    "phone": "55364467",
    "isValid": true
  },
  {
    "dialCode": "86",
    "phone": "18659340222",
    "isValid": true
  },
  {
    "dialCode": "852",
    "phone": "3",
    "isValid": false
  },
  {
    "dialCode": "852",
    "phone": "57034688",
    "isValid": true
  },
  {
    "dialCode": "1684",
    "phone": "55364467",
    "isValid": true
  },
  {
    "dialCode": "86",
    "phone": "18659340222",
    "isValid": true
  },
  {
    "dialCode": "852",
    "phone": "3",
    "isValid": false
  },
  {
    "dialCode": "852",
    "phone": "57034688",
    "isValid": true
  },
  {
    "dialCode": "1684",
    "phone": "55364467",
    "isValid": true
  },
  {
    "dialCode": "86",
    "phone": "18659340222",
    "isValid": true
  },
  {
    "dialCode": "852",
    "phone": "3",
    "isValid": false
  },
  {
    "dialCode": "852",
    "phone": "57034688",
    "isValid": true
  },
  {
    "dialCode": "1684",
    "phone": "55364467",
    "isValid": true
  },
  {
    "dialCode": "86",
    "phone": "18659340222",
    "isValid": true
  }
]
const usePhoneNumbersContext = () => {
  const context = useContext(PhoneNumbersContext);
  if (context === undefined) {
    throw new Error('usePhoneNumbersContext must be used within a usePhoneNumberProvider');
  }
  return context;
}

const PhoneNumbersProvider = ({ children }) => {
  const [phoneNums, setPhoneNums] = useState([]);
  const updatePhoneNums = (dialCode, phone, isValid) => {
    console.log('updatePhoneNums called!');
    const newPhoneNums = [...phoneNums, {
      dialCode,
      phone,
      isValid
    }];
    setPhoneNums(newPhoneNums);
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

export { usePhoneNumbersContext, PhoneNumbersProvider };