const express = require('express');
const pagesControllers = require('../controllers/pagesCotrollers');
const router =  express.Router()


router.get('/home' ,pagesControllers.home);

router.get('/register', pagesControllers.register);

router.get('/login', pagesControllers.login);

module.exports = router;