import userModel from "../models/UserModel.js";

import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'

//login
const loginUser = async(req,res) => {

    const { email,password } = req.body;
    try {
        const user = await userModel.findOne({email})
        if(!user) {
            return res.json({success:false,message:"No user exists"})
        }
        const isMatch = await bcrypt.compare(password,user.password);

        if (!isMatch) {
            return res.json({success:false,message:"Invaid credentials"})
        }
        const token = createToken(user._id)
        res.json({success:true,token})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error while log-in"})
        
    }
//email":"temporaryprpose2@gmail.com",
//  "password":"tempo1234567"

}

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}


//register-user
const registerUser = async(req,res) => {
    const { name, password,email} = req.body;
    try {
        // if user is already present
        const exists = await userModel.findOne({email})
        if(exists) {
            return res.json({success:false,message:'User already exists'})
        }
        // validating email and password strength
        if(!validator.isEmail(email)) {
            return res.json({message:false,message:"PLEASE PROVIDE A VALID EMAIL"})
        }
        if(password.length<8) {
            return res.json({success:false,message:'PLEASE PROVIDE A STRONG PASSWORD'})
        }

        //encrypting password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })

       const user = await newUser.save()
       const token = createToken(user._id)
       res.json({success:true,token})


    } catch (error) {
        console.log(error);
        res.json({succ:false,message:"Unable to SignUp"})
    }
}

export { loginUser,registerUser}