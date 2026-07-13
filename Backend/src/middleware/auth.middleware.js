const jwt = require("jsonwebtoken");
const blacklistModel = require("../model/blacklist.model");

const authMiddleware = async(req,res,next)=>{

    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message:"Token not provided"
        })
    }

    const isTokenBlacklist = await blacklistModel.findOne({token});

    if(isTokenBlacklist){
        return res.status(401).json({
            message:"Token is not Valid"
        })
    }

    try{

        const decoded= await jwt.verify(token,process.env.JWT_SECRET);

        req.user= decoded;

        next();

    }catch(err){

        return res.status(401).json({
            message:"Invalid Token"
        })

    }

}

module.exports= authMiddleware;