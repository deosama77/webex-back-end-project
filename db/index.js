const config=require('config');

try {
    let pgp = require('pg-promise')({})
    let db = pgp(config.get("App.postgreSQL.url"))
    module.exports=db;
} catch (e) {
    console.log("Error connection with data base : ",e)
}

