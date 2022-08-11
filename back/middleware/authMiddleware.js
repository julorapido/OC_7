const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');

module.exports.checkToken = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    console.log(token);
    if (token){
        jwt.verify(token, process.env.TOKEN_SECRET, async(err, decodedToken) =>{
            if (err){
                return res.status(401).send(err);
            }else {
                let user = await UserModel.findById(decodedToken.userId);
                console.log(decodedToken.userId);
                return res.status(200).json(user);
            }
        })
    }else{
        console.log('No token');
        return res.status(401).send(err);
    }
}