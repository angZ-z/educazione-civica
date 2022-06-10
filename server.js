const dbConfig = require("./db.config.js")
const express = require('express')
app = express()

port = process.env.PORT || 1337
app.listen(port, () => console.log(`listening on port ${port}`))
app.use(express.static('public'))
app.use(express.json())


const mysql = require('mysql')
var db = mysql.createPool({
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  host: dbConfig.HOST,
  database: dbConfig.DB
})
module.exports = db

db.getConnection((err) => {
  if (err) {
    console.log(err.message)
  } else {
    console.log('MySQL connected...')
  } 
})


app.post('/contatti', (req, res) => {
  time = get_time()
  const ip = req.connection.remoteAddress
  console.log('\nrequest from', ip)
  
  const data = req.body
  data.IP = ip
  data.time = get_time()


  db.query("INSERT INTO contatti (name, mail, message, IP, time) VALUES ('" + data.contact_name + "', '" + data.mail + "' , '" + data.message + "', '" + data.IP + "', '" + data.time + "');", (err, result) => {
    if (err) {
      console.log(err.message)
    } else {
      console.log('database successfully updated')
    }
  })

  res.json({
    status: 'message sent',
    time: get_time()
  })
})

app.post('/storico', (req, res) => {
  const data = req.body
  console.log(data)

  db.query("SELECT name, mail, message, time FROM contatti WHERE mail =?;", (data.mail_input), (err, result) => {
    if (err) {
      console.log(err.message)
    } else {
      Object.keys(result).forEach((key) => {
        var row = result[key]
        
        const info = {
          name: row.name,
          mail: row.mail,
          message: String(row.message)
        }
        console.log(`query operated`)
        res.json(info)
      })  
    }
  })
})


function get_time() {
  let current = new Date()
  let cDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate()
  let cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds()
  let dateTime = cTime + ' ' + cDate
  return `[${dateTime}]`
}