const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('onyx.db');

const router = express.Router();

/**
 * Get query.
 * SELECT data from table.
 *
 * Query params:
 * fields {Array<String>} select fields. Default *.
 * table {String} main table.
 * joins {Array<String|String|String>} array of left joins in next format: `table|alias|condition`.
 * where {String} WHERE statement.
 * limit {String} row count limit. Default 20.
 * offset {String} pagination offset. Default 0.
 */
router.get('/', (req, res) => {
    const q = req.query;

    // Collect query params.
    const fields = q.fields || ['*'];
    const table = q.table;
    const joins = q.joins || [];
    const where = q.where || '';
    const limit = q.limit || 20;
    const offset = q.offset || 0;

    // Build SELECT query.
    let query = 'SELECT ';
    query += fields.join(',') + '\n';
    query +=`FROM ${table} AS tbl\n`;

    joins.forEach((join, idx) => {
        let [table, alias, condition] = join.split('|');
        query += `LEFT JOIN ${table} AS ${alias} ON ${condition}\n`;
    });

    if (where) {
        query += `WHERE ${where} \n`;
    }
    query += `LIMIT ${offset}, ${limit}`;

    console.log(query);

    // Execute query.
    db.all(query, function(err, data) {
        if (err) {
            res.send({
                error: err.message,
            });
        }
        else {
            res.send(data);
        }
    });
});

module.exports = router;
