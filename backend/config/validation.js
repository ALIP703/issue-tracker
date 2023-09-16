const { check } = require('express-validator');

const validateSignUpBody = [
    check('username').isString(),
    check('password').isString(),
];
module.exports = { validateSignUpBody }