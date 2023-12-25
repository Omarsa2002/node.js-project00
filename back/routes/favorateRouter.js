const express  = require("express");
const usersControllers = require('../controllers/usersControllers');
const verifyToken = require('../middlewares/verifyToken');

const router =  express.Router()

router.route('/')
                .get(verifyToken, usersControllers.allfavorates);


module.exports = router