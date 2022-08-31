const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// Importation de isEMAIL de la bibliothèque validator
const { isEmail} = require('validator');
var uniqueValidator = require('mongoose-unique-validator');
const userSchema = new mongoose.Schema(
{
    email: {
        type: String,
        unique: true,
        required: true,
        validate: [isEmail],
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 1024,
    },
    imageUrl: {
        type: String,
        default: "http://localhost:3000/uploads/defaultUser.png",
        required: true
    },
    nom: {
        type: String,
        required: true,
        trim: true,
    },
    prenom: {
        type: String,
        required: true,
        trim: true,
    },
    admin:{
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
}
);

// play function before save into DB
userSchema.pre("save", async function (next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({email});

    if (user){
        const auth = await bcrypt.compare(password, user.password);
        if (auth){
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
}
userSchema.plugin(uniqueValidator);
const UserModel = mongoose.model('user', userSchema);
module.exports = UserModel;