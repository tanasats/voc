const authModel = require("../model/auth.model");
//const misModel = require("../model/mis.model");
const bcrypt = require("bcrypt");
const config = require("../config/auth.config");
const jwt = require("jsonwebtoken");


exports.signin = (req, res) => {
	console.log(req.body);
	authModel
	.signin(req.body.username, req.body.password)
	.then(async (row) =>{
		//console.log(row)
		let token =  jwt.sign({ username: row.username }, config.secret, 
		{
			expiresIn: config.jwtExpiration,
			issuer:config.issuner,
		});
		row.access_token=token;
		res.status(200).send(row);
	})
	.catch((error) => {
		console.log(error);
		res.status(401).send(error);
    });
} 

exports.me = (req,res)=>{
	var token = req.headers['x-access-token'];
	try{
		const decode = jwt.verify(token, config.secret);
		console.log(decode);
		authModel
			.ad_userinfo(decode.username)
			.then(([row]) =>{
				res.status(200).send(row);
			})
			.catch((error) => {
				console.log(error);
				res.status(401).send(error);
			});	

	}catch(err){
		console.log(err.message)
		res.status(401).send(err.message);
	}
}
