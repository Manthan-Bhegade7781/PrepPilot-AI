const express = require("express");

const router = express.Router();

const {authCheckUser,loginCheck,logoutUser,getMeController,googleLogin} = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");

/**
 * @name /api/auth/register
 * @description new user register
 * @access Public
 */

router.post("/register",authCheckUser);

/**
 * @name /api/auth/login
 * @description user login
 * @access Public
 */

router.post("/login",loginCheck);

/**
 * @name /api/auth/logout
 * @description user logout
 * @access Public
 */

router.get("/logout",logoutUser);

/**
 * @name /api/auth/get-me
 * @description get user details
 * @access Private      
 */

router.get("/get-me",authMiddleware,getMeController);

/**
 * 
 */
router.post("/google", googleLogin);

module.exports= router;