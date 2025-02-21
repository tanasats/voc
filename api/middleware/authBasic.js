//const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");


const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res.status(401).send({ message: "Unauthorized! Access Token was expired!" });
  }
  return res.sendStatus(401).send({ message: "Unauthorized!" });
}

const basicAuthentication = (req, res, next) => {
  //let  = req.headers["authentication"];
  const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
  const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':')

  console.log('Basic Authentication with login:',login,' password:',password);

//  if (!token) {
//    return res.status(403).send({ message: "No token provided!" });
//  }
//  jwt.verify(token, config.secret, (err, decoded) => {
//    if (err) {
//      return catchError(err, res);
//    }
//    req.userId = decoded.id;
//    next();
//  });
}; 

const authBasic = {
  basicAuthentication: basicAuthentication
}
module.exports = authBasic;