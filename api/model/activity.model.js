const db = require("../config/db");
const multer = require("multer");
const maxSize = 5 * 1024 * 1024;
const __basedir = 'c:/temp';

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/uploads/");
  },
  filename: (req, file, cb) => {
    //cb(null, file.originalname);
	const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, fileName)
  },
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
  fileFilter: (req, file, cb) => {
	  console.log(file);
      if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
          cb(null, true);
      } else {
          cb(null, false);
          return cb(new Error('File types allowed .jpeg, .jpg and .png!'));
      }
  }  
}).single("avatar");

class _activityClass { 

  getall({fillter=1,page=0,pagesize}) {
	let offset = pagesize * page;
	let sql = db.format("SELECT * FROM activity where "+fillter+" LIMIT "+pagesize+" offset "+ offset);
    return db.execute(sql);
  }
    
  count(fillter){
	let sql = db.format("SELECT count(*) as count FROM activity where " + fillter);
	return db.execute(sql);
  }

  listActivity() {
    let sql = db.format("SELECT * FROM activity");
    return db.execute(sql);
  }
  
  insert({ datas }) {
    let sql = db.format("INSERT INTO activity SET ?", [datas]);
	console.log(sql);
    return db.query(sql);
  }
  
  findById({ id = "" }) {
    let sql =  db.format("SELECT * FROM activity WHERE activity.id = ?", [id]);
    return db.execute(sql);
  }  
  
  delete({ id }) { 
    let sql =  db.format("DELETE FROM activity WHERE activity.id = ?", [id]);
    return db.execute(sql);
  }  
  
  update({ id, datas }) {
    let sql = db.format("UPDATE activity SET ? WHERE id=?", [datas, id]);
    return db.query(sql);
  }
  

  
/*
  addxxxctivity({userid,roleid}){
	let sql = db.format("INSERT INTO activity (userid,roleid) VALUES(?,?)",[userid,roleid]);
	return db.execute(sql);
  }
  findById({ id = "" }) {
    let sql = db.format("SELECT * FROM USER WHERE user.id = ?", [id]);
    return db.execute(sql);
  }
  findByEmail({ email = "" }) {
    let sql =  db.format("SELECT * FROM USER WHERE user.email = ?", [email]);
    return db.execute(sql);
  }
  userByRole({ id = "" }) {
    let sql = db.format("SELECT * FROM userrole WHERE userrole.roleid = ?", [id]);
    return db.execute(sql);
  }

  updateUser({ id, datas }) {
    let sql = db.format("UPDATE USER SET ? WHERE id=?", [datas, id]);
    return db.query(sql);
  }
  deleteUser({ id }) {
    let sql = db.format("DELETE FROM USER WHERE id=?", [id]);
    return db.execute(sql);
  }
  listallRole() {
	  console.log("listallrow");
    let sql = db.format("SELECT * FROM role");
    return db.execute(sql);
  }

  addUserRoles({userid,roleid}){
	let sql = db.format("INSERT INTO userrole (userid,roleid) VALUES(?,?)",[userid,roleid]);
	return db.execute(sql);
  }  */
}


let activityClassModel = new _activityClass();
// export instance of class
module.exports = activityClassModel;
