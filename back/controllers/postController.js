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
module.exports.getUserPostCount = (req, res) => {
    const userId = req.params.id;

    PostModel.find((err, docs) => {
       const postFilter = docs.filter(allPosts => 
            allPosts.userId === userId
        );
        const postCount = postFilter.length;
        if (!err) {
            return res.status(200).send(postCount.toString());
        } 
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
        const filename = getPost.imageUrl.split('/uploads/')[1];
        fs.unlink(`uploads/${filename}`, (err => {if (err) console.log(err)}));
        ////////////////////////////////////////////////////////////
        try{
            const updatedPost = await PostModel.findByIdAndUpdate(req.params.id, { $set: {
                description: req.body.description,
                imageUrl: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`,
            }});

            return res.status(201).json(updatedPost);
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
                const indexOfUser = post.usersLiked.indexOf(req.body.userId);
                if (indexOfUser != -1){ //// User dans la table Liked
                    post.likes--;// Enlever le like
                    post.usersLiked.splice(indexOfUser, indexOfUser + 1);// Delete l'utilisateur de la table userLiked
                    post.save();
                    return res.status(202).send("L'utilisateur aime deja"); 

                }else {//// User pas dans la table liked
                    post.likes++; // Like
                    post.usersLiked.push(req.body.userId); // Ajout de l'utilisateur dans la table userLiked
                    post.save();
                }
            
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
           


module.exports.commentPost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID de post Inconnue : " + req.params.id);
    const postId = req.params.id;
    const newComment = {
        postId: postId,
        commenterId: req.body.commenterId,
        text: req.body.text,
        timestamp: new Date().getTime()
    }
    try {
        return PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    comments: {
                        postId: postId,
                        commenterId: req.body.commenterId,
                        text: req.body.text,
                        timestamp: new Date().getTime()
                    },
                },
            },
            { new: true},
            (err, docs) => {
                if (!err) res.send(newComment);
                else return res.status(400).send(err)
            }
        );
    }catch (err){
        return res.status(400).send(err);
    }
}

module.exports.deleteCommentPost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("Id de poste iconnu : " + req.params.id);

    try{
        return PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $pull: {
                    comments: {
                        _id: req.body.commentId,
                    },
                },
            },
            {new : true},
            (err, docs) => {
                if (!err) return res.status(200).send(docs);
                else return res.status(400).send(err);
            }
        )
    }catch(err) {
        return res.status(400).send(err);
    }
}

module.exports.editCommentPost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
    try{
        return PostModel.findById(
            req.params.id,
            (err, docs) => {
                const theComment = docs.comments.find((comment) =>
                    comment._id.equals(req.body.commentId)
                )

                if (!theComment) return res.status(404).send('Commentaire not found !')
                theComment.text = req.body.text;


                return docs.save((err) => {
                    if (!err) return res.status(200).send(docs);
                    return res.status(500).send(err)
                })

            }
        )

    }catch(err){
        return(res.status(400).send(err))
    }
}
