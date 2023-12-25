let User = require('../models/users_model');
const asyncWrapper = require('../middlewares/asyncWrapper');
const STATUS = require('../utils/HttpStatusText');
const appErrors = require('../utils/Errors');
const bycrpt = require('bcryptjs');
const generateJwt = require('../utils/jwtGenerator');
const path = require('path');


const register = asyncWrapper(async (req, res, next)=>{
    const {name, email, password} = req.body;
    const user = await User.findOne({email: email});
    if(!user){
        const hashedpasseord = await bycrpt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedpasseord,
        });
        const token = await generateJwt({name: newUser.name, email: newUser.email, id: newUser.id});
        newUser.token = token;
        await newUser.save();
        return res.status(201).json({status: STATUS.success, data: {name, email, token}});
    }
    const error = appErrors.create(400, STATUS.fail, 'this email is already exist');
    return next(error);
});


const login = asyncWrapper(async (req, res, next)=>{
    const {email, password} = req.body;

    if(!email || ! password){
        const error = appErrors.create(400, STATUS.fail, "Email and Password are required");
        return next(error);
    }
    const user = await User.findOne({email: email});
    if(!user){
        const error = appErrors.create(400, STATUS.fail, "this user is not exist");
        return next(error);
    }
    const matchedPassword = await bycrpt.compare(password, user.password);
    if(!matchedPassword){
        const error =  appErrors.create(400, STATUS.fail, `Password is not correct !! is that you ${user.name} ??`);
        return next(error);
    }
    const name  = user.name;
    const token = await generateJwt({name: user.name, id: user.id});
    const updatedToken = await User.updateOne({_id: user.id},{$set:{token: token}});
    //console.log(updatedToken);
    return res.status(200).json({status: STATUS.success, data:{name, email, token}});
})

const allfavorates = async (req, res)=>{
    const user = req.body
    const favorates = await User.find({email: user.email});
    res.json({status: STATUS.success, data: favorates.favorates});
    
}



module.exports = {
    register,
    login,
    allfavorates
}
