const db = require("../config/db");

class _acthostClass { 

  getitems({fillter=1,page=0,pagesize}) {
    //let sql = db.format("SELECT * FROM hostactivity");
	let offset = pagesize * page;
	let sql = db.format("SELECT * FROM typeactivity where "+fillter+" LIMIT "+pagesize+" offset "+ offset);
    return db.execute(sql);
  }
    
  count(fillter){
	let sql = db.format("SELECT count(*) as count FROM typeactivity where " + fillter);
	//console.log(sql);
	return db.execute(sql);
  }
  
  create({ datas }){
    let sql = db.format("INSERT INTO typeactivity SET ?", [datas]);
	console.log(sql);
    return db.query(sql);
  }
  
  delete({ id }) { 
    let sql =  db.format("DELETE FROM typeactivity WHERE id = ?", [id]);
    return db.execute(sql);
  } 
  
  update({ id, datas }) {
    let sql = db.format("UPDATE typeactivity SET ? WHERE id=?", [datas, id]);
    return db.query(sql);
  } 

  
 
}

let acthostClassModel = new _acthostClass();
// export instance of class
module.exports = acthostClassModel;
