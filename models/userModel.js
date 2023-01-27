import mongoose, { Schema } from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const userSchema = new Schema({

    name: {
        type: String,
        required: [true, 'a user must have a name'],
        maxlength: 20,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'a user must have a email'],
        unique: true,
        validate: [validator.isEmail, 'Please provide a valid email address']
    },
    password: {
        type: String,
        required: [true, 'a user must have a password'],
        minlength: 6,
        select:false
    }
    ,
    lastname: {
        type: String,
        trim: true,
        maxlength: 20,
        default: 'lastname'
    }
    ,
    location: {
        type: String,
        trim: true,
        default: 'myCity'
    }
})

userSchema.pre('save', async function () {
    if(!this.isModified('password')) return 
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.createJWT = function () {
    return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME })
}
userSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword,this.password)
    return isMatch
}

const User = new mongoose.model('User', userSchema)


export default User