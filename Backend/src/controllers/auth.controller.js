
const userModel = require("../model/user.model");
const bcrypt= require("bcryptjs");
const jwt = require("jsonwebtoken");
const blacklistModel = require("../model/blacklist.model");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/**
 * @name authCheckUser
 * @description checking user before registration
 * @access Public
 */

const authCheckUser = async(req,res)=>{

    const {username, email, password}= req.body;

    if(!username || !email || !password){
        return res.status(400).json({
            message:"please fill all details..!!"
        })
    }

    const isUserAlreadyExists= await userModel.findOne({
        $or:[{username},{email}]
    });

    if(isUserAlreadyExists){
        return res.status(400).json({
            message:"Account already exists with email and username..!!"
        })
    }

    const hashPassword= await bcrypt.hash(password,10);

    const user = await userModel.create({
        username,
        email,
        password:hashPassword
    });

    const token = jwt.sign({
        id:user._id,
        username:user.username,
    },process.env.JWT_SECRET,
    {
        expiresIn:"1d"
    });

    res.cookie("token",token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    }).status(201).json({
        message:"User registered Successfully....!!",
        user:{
            username:user.username,
            id:user._id,
            email:user.email
        }
    })

}


/**
 * @name loginCheck
 * @description login user based on email and password
 * @access Public
 */

const loginCheck= async(req,res)=>{
    const{email,password}=req.body;

    const user = await userModel.findOne({email});

    if(!user){
        return res.status(400).json({
            message:"Incorrect email or password..!!"
        })
    }

    if (!user.password) {
        return res.status(400).json({
            message: "This account uses Google Sign-In. Please continue with Google."
        });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        return res.status(400).json({
            message:"Incorrect email or password..!!"
        })
    }

    const token = jwt.sign({
        id:user._id,
        username:user.username,
    },process.env.JWT_SECRET,
    {
        expiresIn:"1d"
    });

    res.cookie("token",token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    }).status(201).json({
        message:"User loggedIn Successfully....!!",
        user:{
            username:user.username,
            id:user._id,
            email:user.email
        }
    });


}

/**
 * @name logoutUser
 * @description logout user and add token to blacklist and remove cookie
 * @access Private
 */

const logoutUser = async(req,res)=>{
    const token = req.cookies.token;

    if(token){
        await blacklistModel.create({token});
        res.clearCookie("token").status(200).json({
            message:"User logged out successfully..!!"
        })
    }
    else{
        res.status(400).json({
            message:"User is not logged in..!!"
        })
    }
}

/**
 * @name getMeController
 * @description get user details based on token
 * @access Private
 */

const getMeController= async(req,res)=>{
    
    const user =await userModel.findById(req.user.id);

    return res.status(200).json({
        message:"User details fetched successfully..!!",    
        user:{
            username:user.username,
            email:user.email,
            id:user._id
        }
    });
}

const googleLogin = async (req, res) => {

    try {

        const { token } = req.body;

        if (!token) {
            return res.status(400).json({
                message: "Google token is required"
            });
        }

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const payload = ticket.getPayload();
        let user = await userModel.findOne({
            email: payload.email
        });

        if (!user) {
            user = await userModel.create({
                username: payload.name,
                email: payload.email,
                googleId: payload.sub,
                profilePicture: payload.picture
            });
        }

        const jwtToken = jwt.sign({
            id: user._id,
            username: user.username
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        });

        res.cookie("token",jwtToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        }).status(201).json({
            message:"Google Login Successful....!!",
            user:{
                id:user._id,
                username:user.username,
                email:user.email
            }
        })
    }
    catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Google Login Failed"
        });

    }

}

module.exports={
    authCheckUser,
    loginCheck,
    logoutUser,
    getMeController,
    googleLogin
}
