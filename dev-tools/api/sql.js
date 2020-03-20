const router = require('express').Router()
const sqlite3 = require('sqlite3').verbose()
const bodyParser = require('body-parser')
const db = require('./db')

router.use(bodyParser.json())

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
 * order {String} order field.
 */
router.get('/', (req, res) => {
  const q = req.query

  // Collect query params.
  const fields = q.fields || ['*']
  const table = q.table
  const joins = q.joins || []
  const where = q.where || ''
  const limit = q.limit || 20
  const offset = q.offset || 0
  const order = q.order || ''

  // Build SELECT query.
  let query = 'SELECT '
  query += fields.join(',') + '\n'
  query += `FROM ${table} AS tbl\n`

  joins.forEach((join, idx) => {
    let [table, alias, condition] = join.split('|')
    query += `LEFT JOIN ${table} AS ${alias} ON ${condition}\n`
  })

  if (where) {
    query += `WHERE ${where} \n`
  }

  if (order) {
    query += `ORDER BY ${order}\n`
  }

  query += `LIMIT ${offset}, ${limit}\n`

  // Execute query.
  db.all(query, function(err, data) {
    if (err) {
      res.send({
        error: err.message,
      })
    } else {
      res.send(data)
    }
  })
})

router.patch('/:table', (req, res) => {
  const body = req.body

  // Collect query params.
  const table = req.params.table
  let where
  let fields = []

  for (let field in body) {
    if (field === 'where') {
      where = body.where
    } else {
      fields.push(`${field}=${body[field]}`)
    }
  }

  fields = fields.join(',')

  // Build query.
  let query = `UPDATE ${table}\n`
  query += `SET ${fields}\n`

  if (where) {
    query += `WHERE ${where}`
  }

  db.run(query, err => {
    if (err) {
      res.send({
        error: err.message,
      })
    } else {
      res.send({
        ok: true,
      })
    }
  })
})

module.exports = router
