const express  = require("express");
const usersControllers = require('../controllers/usersControllers');
const pagesControllers = require('../controllers/pagesCotrollers');


const router =  express.Router()

router.route('/')
            .post(usersControllers.login)
            //.get(pagesControllers.login); 


module.exports = router