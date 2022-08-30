const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const {signUpErrors, signInErrors } = require('../utils/errorsUtils');
const fs = require('fs');


module.exports.signup = async (req, res) => {
    const {email, password, nom, prenom} = req.body
    try{
        const user = await UserModel.create({
            email: email,
            password: password,
            nom: nom,
            prenom: prenom,
                 //   imageUrl: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`,
        });
        res.status(200).send({user: user._id});
    }catch(err){
        const errors = signUpErrors(err);   
         res.status(201).send({errors})
    }
}

module.exports.login = async (req,res) => {
    const {email, password} = req.body;
    try{
        // Appel de le fonction login du schema
        const userData = await UserModel.login(email, password);
        return res.status(200).send({userId: userData.id,
                            token: jwt.sign(
                                {userId : userData.id},
                                process.env.TOKEN_SECRET,
                                { expiresIn: '24h' }
                            )
        });
    }catch(err){
        const errors = signInErrors(err);   
        res.status(201).send({errors})
    }


}

module.exports.getUserCount = async (req,res) => {
    const query = UserModel.find();
    query.count(function (err, docs){
        if (err) return res.status(400).send(err)
        else 
        {
            console.log(docs);
            return res.status(200).send({docs});
        }
    })
     
}

module.exports.getSpecificUser = async (req, res) => {

    try {
            const User = await UserModel.findById(req.params.id);
                    return res.status(201).json(User);
            }catch(err){
                    return res.status(400).send(err);
            }
}

module.exports.updateUser = async (req,res) => {
    if (!req.file){
            return res.status(401).send("Pas de fichier envoyé");    
    }else {
        /// SUPPRESSION DE L'IMAGE PRÉCÉDENTE////////////////////
        const getUser = await UserModel.findById(req.params.id);
        const filename = getUser.imageUrl.split('/uploads/')[1];
        fs.unlink(`uploads/${filename}`, (err => {if (err) console.log(err)}));
        ////////////////////////////////////////////////////////////
        try{
            const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, { $set: {
                nom: req.body.nom,
                prenom: req.body.prenom,
                imageUrl: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`,
            }});

            return res.status(201).json(req.file.filename);
        }catch(err){
            return res.status(401).send(err);
        }
    }
}