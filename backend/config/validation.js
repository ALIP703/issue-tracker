const { check } = require('express-validator');

const validateSignUpBody = [
    check('username').isString(),
    check('password').isEmail(),
];
module.exports = { validateSignUpBody }