'use strict';

var express = require('express');
var controller = require('./auth.controller');

var router = express.Router();
router.post('/login', controller.userLogin);
router.post('/register', controller.userRegister);
router.get('/loggedUserData', controller.loggedUserData);
router.get('/isLoggedIn', controller.isLoggedIn);
router.get('/logout', controller.logout);
router.post('/updateUserQuote', controller.updateUserQuote);
module.exports = router;