const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('onyx.db');

module.exports = db
