require('dotenv').config();
const express = require('express')
app = express()

port = process.env.PORT || 1337
app.listen(port, () => console.log(`listening on port ${port}`))
app.use(express.static('public'))
app.use(express.json())


const mysql = require('mysql')
require('dotenv').config();
var db = mysql.createPool({
  host: 'eu-cdbr-west-03.cleardb.net',
  database: 'heroku_80d908fd800ad29',
  user: 'b42c56c82e3006',
  password: '189c6f68'
})

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
  
  const data = req.body
  data.IP = ip
  data.time = get_time()

  db.query("INSERT INTO contatti (name, mail, message, IP, time) VALUES ('" + data.contact_name + "', '" + data.mail + "' , '" + data.message + "', '" + data.IP + "', '" + data.time + "');", (err, result) => {
    if (err) {
      console.log(err.message)
    } else {
      console.log('database updated by', ip)
      console.log(result)
    }
  })

  res.json({
    status: 'data sent',
    time: get_time()
  })
})

app.post('/storico', (req, res) => {
  const data = req.body
  const ip = req.connection.remoteAddress


  db.query("SELECT name, mail, message, time FROM contatti WHERE mail =?;", (data.mail_input), (err, result) => {
    if (err) {
      console.log(err.message)
    } else {
      Object.keys(result).forEach((key) => {
        var row = result[key]
        
        const info = {
          time: row.time,
          name: row.name, 
          message: String(row.message)
        }

        console.log('query operated by', ip)
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