import wretch from 'wretch'

export const validatePhoneNumber = async (dialCode = '', phoneNum = '') => {
  const url = `/validate-phone-number?dialCode=${dialCode}&phoneNum=${phoneNum}`
  try{
    const result = await wretch(url)
    .accept('applicaiton/json')
    .content('application/json')
    .get()
    .json();

    console.log('response', result)
    if(!result || !result?.res){
      throw new Error(result.err || 'Error occur while validating. Please try again.')
    }
    return result?.isValid;
  } catch (err) {
    console.log('oopsie', err);
    return err;
  }
}