var express = require('express');
var router = express.Router();


router.get('/validate-phone-number', function (req, res, next) {
  const { dialCode, phoneNum } = req.query;
  console.log(dialCode, phoneNum);
  if (!dialCode) {
    return res.status(400).json({
      err: 'Area code not found'
    })
  }
  if (!phoneNum) {
    return res.status(400).json({
      err: 'Phone number not found'
    })
  }

  /*
    Since real phone validation API (e.g. Twilio Lookup API) is not free, here I will validate using simple regex and specifically focus on Hong Kong phone numbers

    Valid phone number requirements:
    1. 8 digits
    2. 2,3,5,6,7,9 (Assume both landline and mobile are considered) 
  */
  let isValidPhoneNum = false;
  if (dialCode === '852') { //Hong Kong dial code
    console.log('is hk number');
    isValidPhoneNum = /^[23569][0-9]{7}$/.test(phoneNum);
  } else if (dialCode === '86') { // China
    isValidPhoneNum = /^1[0-9]{10}$/.test(phoneNum);
  } else {  // rest of the world
    isValidPhoneNum = /[0-9]{3,12}$/.test(phoneNum);
  }

  res.status(200).send({
    res: 'success',
    isValid: isValidPhoneNum
  })
});

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('Phone Number Validation API');
});


module.exports = router;
