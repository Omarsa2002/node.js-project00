const express  = require("express");
const usersControllers = require('../controllers/usersControllers');
const verifyToken = require('../middlewares/verifyToken');

const router =  express.Router()

router.route('/:id')
                .get(verifyToken, usersControllers.allFavorates)
                .delete(verifyToken, usersControllers.deleteAllFavorates)
router.route('/')
                .put(verifyToken, usersControllers.addToFavorates)

router.route('/delete/:id')
                .delete( usersControllers.deleteFavorate)


module.exports = router