import wretch from 'wretch'

export const validatePhoneNumber = async (dialCode = '', phoneNum = '') => {
  const url = `/validate-phone-number?dialCode=${dialCode}&phoneNum=${phoneNum}`
  try {
    const result = await wretch(url)
      .accept('applicaiton/json')
      .content('application/json')
      .get()
      .json()

    if (!result || !result?.res || result?.isValid === 'undefined') {
      throw new Error(result.err || 'Error occur while validating. Please try again.')
    }
    return { isValid: result.isValid }
  } catch (err) {
    return { err }
  }
}
