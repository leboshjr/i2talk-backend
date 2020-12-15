const express = require('express');
const { check } = require('express-validator');

// Required Controllers
const userAuthController = require('../controllers/user-auth-controller');
const stateLocation = require('../middleware/state-location');
const auth = require('../middleware/auth');
const authyVerify = require('../middleware/authyVerify');

const router = express.Router();

// LOGIN
router.post("/login", userAuthController.login)

// SIGN UP
router.post("/signup", stateLocation.getlatlongFromState, userAuthController.signup);
// SELECT ACTIVATION TYPE
router.post("/activation", userAuthController.activationType);

/**********  ACTIVATE ACCOUNT ***********/
// EMAIL 
router.get("/auth/activation/:accessToken", userAuthController.activateAccountEmail);
// PHONE 
router.post("/auth/activation/", authyVerify, userAuthController.activateAccountPhone);
// REQUEST ACTIVATION LINK
router.post("/requestActivationLink", userAuthController.requestActivationLink);

/**********  RESET PASSWORD ***********/
// REQUEST RESET PASSWORD  
router.post("/resetPassword", userAuthController.resetPassword);
// EMAIL 
router.get("/auth/reset/:resetToken", userAuthController.getResetPassword);
// SELECT RESET OPTIONS 
router.post("/auth/resetOptions", userAuthController.resetOptions);
// PHONE
router.post("/auth/reset", authyVerify, userAuthController.resetPhone);
// SET NEW PASSWORD 
router.post("/setNewPassword", userAuthController.setPassword);


module.exports = router;