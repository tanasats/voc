const express = require('express');
const router = express.Router();
const { authJwt } = require("../middleware/auth");
const userController = require('../controller/user.controller')

// router.get('/',(req,res)=>{
// 	res.json({ message: "/user " });
// });
//router.get('/',userController.getall);
router.get('/',userController.getpage);
router.get('/:username',userController.getbyusername);
router.post('/',userController.insert);
router.put('/',userController.update);
router.delete('/:id',userController.delete);

//router.post('/',authController.signin);
//router.get('/me',authJwt.verifyToken,authController.me);

module.exports = router;