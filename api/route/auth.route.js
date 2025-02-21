const express = require('express');
const router = express.Router();
const { authJwt } = require("../middleware/auth");
const authController = require('../controller/auth.controller')

router.post('/',authController.signin);
//router.post('/',(req,res)=>{
//	console.log(req.body);
//	res.json({message: "post request"});
//});
router.get('/',(req,res)=>{
	res.json({ message: "/api/login/ " });
});
router.get('/me',authJwt.verifyToken,authController.me);

module.exports = router;