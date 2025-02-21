const db = require("../config/db");

class _surveyboxClass {

    getall() {
        let sql = db.format("SELECT * FROM surveybox");
        return db.execute(sql);
    }

    getpage({ limit, offset, orderby }) {
        console.log(limit, offset, orderby);
        let sql = db.format("SELECT * FROM surveybox   ORDER BY " + orderby + " ASC" + " LIMIT ? OFFSET ?");
        return db.execute(sql, [limit, offset]);
    }

    rowcount() {
        return db.execute("SELECT count(id) as value FROM surveybox")
    }

    insert({ datas }) {
        let sql = db.format("INSERT INTO surveybox SET ?", [datas]);
        console.log(sql);
        return db.query(sql);
    }

    delete({ id }) {
        let sql = db.format("DELETE FROM surveybox WHERE id = ?", [id]);
        return db.execute(sql);
    }

    update({ datas }) {
        let sql = db.format("UPDATE surveybox SET ? WHERE id=?", [datas, datas.id]);
        return db.query(sql);
    }

}//class
let surveyboxClassModel = new _surveyboxClass();
module.exports = surveyboxClassModel;