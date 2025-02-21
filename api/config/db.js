const db = require('mysql2')

const Database = db.createPool({
    host:'localhost',
    port: 3306,
    database:'vocdb',
    user:'root',
    password:'sudjing',
})

module.exports = Database.promise();