const mongoose = require('mongoose');
const postSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,
            default: "http://localhost:3000/uploads",
            required: true
        },
        likes:{
            type: Number,
            default: 0,
            min: 0
        },
        usersLiked:{
            type: [String],
            default: [],
        },
        comments: {
            type: [
                {
                    postId: String,
                    commenterId: String,
                    text: String,
                    timestamp: Number
                }
            ],
            required: true,
        }
        
    },{
        timestamps: true
    }
);



const postModel = mongoose.model("post", postSchema);
module.exports = postModel;