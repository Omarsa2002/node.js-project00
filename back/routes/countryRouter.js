const express  = require("express");
const usersControllers = require('../controllers/usersControllers');
const pagesControllers = require('../controllers/pagesCotrollers');


const router = express.Router();

router.route('/').get(pagesControllers.allCountries);

//router.route('/:id/singileCountry').get(pagesControllers.singleCountry)

router.route('/api/:id').get(pagesControllers.singleCountryApi)



module.exports = router;