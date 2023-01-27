import userModel from '../models/userModel.js'
import 'express-async-errors'
import BadRequestError from '../errors/bad-request.js'
import NotFoundError from '../errors/not-found.js'
import UnauthenticatedError from '../errors/UnauthenticatedError.js'

const register = async (req, res) => {
    const {name,email,password}=req.body
    if(!name || !email || !password){
        throw new BadRequestError ('please provide all values')
    }
    const userAlreadyExists = await userModel.findOne({email})

    if (userAlreadyExists){
        throw new BadRequestError('Email already in use')
    }
    const user = await userModel.create(req.body)
    
    const token = user.createJWT()
    res.status(201).json({
        status: 'Success',
        user:{
        email:user.email,
        lastName:user.lastName,
        name :user.name
    },
    token,
    location: user.location
    })


}
const login = async(req, res) => {
   const {email ,password} =req.body
   if(!email || !password){
    throw new BadRequestError('Please provide all values')
   }
    const user = await userModel.findOne({email}).select('+password')
    if(!user){
        throw new UnauthenticatedError('Invalid Credentials')
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect){
        throw new UnauthenticatedError('Invalid Credentials')
    }
    const token = user.createJWT()
    user.password=undefined
    res.status(201).json({ user, token, location: user.location })
}
const updateUser = async(req, res) => {
    const {email,name,location, lastname}=req.body
    console.log(email, name, location, lastname);
    if(!email || !name || !lastname || !location){
        throw new BadRequestError('Please provide all required fields')
    }
    
    const user = await userModel.findOne({_id:req.user.userId})
    user.email=email
    user.name=name
    user.lastname=lastname
    user.location =location
    await user.save()
    const token =user.createJWT()
    res.status(201).json({user,token,location:user.location})
}


export { register, login, updateUser }