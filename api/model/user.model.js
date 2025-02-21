const db = require("../config/db");

class _userClass {

    getall() {
        let sql = db.format("SELECT * FROM user");
        return db.execute(sql);
    }

    getpage({ limit, offset, orderby }) {
        console.log(limit, offset, orderby);
        let sql = db.format("SELECT * FROM user   ORDER BY " + orderby + " ASC" + " LIMIT ? OFFSET ?");
        return db.execute(sql, [limit, offset]);
    }

    getbyusername({username}) {
        let sql = db.format("SELECT * FROM user WHERE username=?");
        return db.execute(sql,[username]);
    }

    rowcount() {
        return db.execute("SELECT count(id) as value FROM user")
    }

    insert({ datas }) {
        let sql = db.format("INSERT INTO user SET ?", [datas]);
        console.log(sql);
        return db.query(sql);
    }

    delete({ id }) {
        let sql = db.format("DELETE FROM user WHERE id = ?", [id]);
        return db.execute(sql);
    }

    update({ datas }) {
        let sql = db.format("UPDATE user SET ? WHERE id=?", [datas, datas.id]);
        return db.query(sql);
    }

}//class
let userClassModel = new _userClass();
module.exports = userClassModel;