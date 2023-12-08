const path = require('path');
let Country = require('../models/countries_model');
const STATUS = require('../utils/HttpStatusText');
const { ObjectId } = require('mongodb');
const home = (req, res)=>{
    res.sendFile(path.join(__dirname, '../../front/index.html'));
}

const register = (req, res)=>{
    res.sendFile(path.join(__dirname, '../../front/page_signIn/page_signin.html'));
}

const login = (req, res)=>{
    res.sendFile(path.join(__dirname, '../../front/page_logIn/page_login.html'));;
}

const allCountries = async (req, res)=>{
    const countries = await Country.find();
    res.json(countries);
}

const singleCountryApi = async (req, res) =>{
    const id = req.params.id;
    //console.log(id);
    const thisCountry = await Country.findOne({_id: id});
    if(thisCountry)
        res.json({status: STATUS.success, data: {thisCountry}});
    else
        res.json({status: STATUS.fail, data: null});

}
// const singleCountry = async (req, res) =>{
//     try{
//         //if(ObjectId.isValid(req.params.id)){
//             //const id = req.params.id;
//             // console.log(id);
//             //const thisCountry = await Country.findOne({_id: id});
//             //if(thisCountry)
//                 res.sendFile(path.join(__dirname, '../../front/country_temp/index_country.html'));
//             //else
//                 //res.send('not found');
//         //}else{
//             //res.send('not found');
//         //}
//     }catch(err){
//         console.log(err.message); 
//     }

// }

module.exports = {
    home,
    register,
    login,
    allCountries, 
    //singleCountry,
    singleCountryApi
}