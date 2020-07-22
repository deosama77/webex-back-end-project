let pgp = require('pg-promise')({})
let db = pgp('postgres://postgres:admin@localhost:5432/webex_product')
module.exports=db;
