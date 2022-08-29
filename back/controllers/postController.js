const ObjectID = require("mongoose").Types.ObjectId;
const PostModel = require('../models/postModel');
const fs = require('fs');

module.exports.getAllPosts = (req, res) => {
    PostModel.find((err, docs) => {
        if (!err) res.send(docs)
        else {
            res.send(err);
        }
    })
}


module.exports.createNewPost = async (req ,res) => {
    var newPost = new PostModel();
    if (req.file){
        newPost = new PostModel({
            userId:  req.body.userId,
            description:  req.body.description,
            imageUrl: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`,
        })    
    }else {
         newPost = new PostModel({
            userId:  req.body.userId,
            description:  req.body.description,
        })
    
    }

    try{
        const postSave = await newPost.save();
        return res.status(201).json(postSave);
    }
    catch(err){
        return res.status(401).send(err);
    }
}


module.exports.deletePost = async (req, res) => {
    if(!ObjectID.isValid(req.params.id))
        return res.status(401).error
    
     const getPost = await PostModel.findById(req.params.id);
    const filename = getPost.imageUrl.split('/uploads/')[1];
    fs.unlink(`uploads/${filename}`, (err => {if (err) console.log(err)}));

    PostModel.findByIdAndDelete(req.params.id,
            (err ,docs) => {
               if (!err) res.send(docs)
               else res.send(err)
           }
       );

}

module.exports.updatePost = async (req,res) => {

    if (!req.file){
        try{
            const updatePost = await PostModel.findByIdAndUpdate(req.params.id, { $set: {
                description: req.body.description,
            }});
            return res.status(201).json(updatePost);
        }catch(err){
            return res.status(401).send(err);
        }
        
    }else {
        /// SUPPRESSION DE L'IMAGE PRÉCÉDENTE////////////////////
        const getPost = await PostModel.findById(req.params.id);
        const filename = getSauce.imageUrl.split('/uploads/')[1];
        fs.unlink(`uploads/${filename}`, (err => {if (err) console.log(err)}));
        ////////////////////////////////////////////////////////////
        try{
            const updatedSauce = await SauceModel.findByIdAndUpdate(req.params.id, { $set: {
                description: req.body.description,
                imageUrl: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`,
            }});

            return res.status(201).json(updatedSauce);
        }catch(err){
            return res.status(401).send(err);
        }
    }

} 


module.exports.likePost = async (req,res) => {
    if(!ObjectID.isValid(req.params.id))
        return res.status(403).error

    if (ObjectID.isValid(req.body.userId) == true){
        PostModel.findOne({
            _id: req.params.id
        }).then(post => {
                if (post.usersLiked.indexOf(req.body.userId) != -1){ //// User dans la table Liked
                    return res.status(401).send("L'utilisateur aime deja"); 
                }else {//// User pas dans la table liked
                    post.likes++; // Like
                    post.usersLiked.push(req.body.userId);
                }
                post.save();
            
            return res.status(200).json(post);
        } 
        ).catch(err => {
            res.status(401).send(err);
        })

    }else {
       console.log("Wrong user id")
       return res.status(401).send("wrong user id")
   }
} 
           