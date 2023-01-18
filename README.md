# Phone-number-validation

- Node Version: v16.19.0
- Client: React using `create-react-app`
- Server: Express.js

## Install Guide

1. Open two folders, one for `./Client` and one for `./Server`.
2. Run `npm install` form both sides
3. Run `npm run start` from both sides

## Note
Since phone validation API is not free, right now simple regex is used to check the phone number. Only Hong Kong and China phone number is focused, the rest of the world is using regex `/[0-9]{3,12}$/` (according to wikipedia).