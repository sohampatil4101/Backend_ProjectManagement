const connectToMongo = require('./db');
const express = require('express')

connectToMongo();


const app = express()
var cors = require('cors')
const port = 5000


// file logic

const path = require('path')
const multer  = require('multer')

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'uploads/')
  },
  filename: function(req, file, cb) {
      let ext = path.extname(file.originalname)
      cb(null, Date.now() + ext)
  }
})

const upload = multer({ storage: storage })
// app.use(express.static('public'))
app.use('/uploads', express.static('uploads'));





app.use(cors()) // To allow browser to use api to make changes and solve cors error
app.use(express.json()) // when u want to use req.body then u need to have a middleware here these middleware is app.use i.e when u want to use console.log(req.body)

app.get('/', (req, res) => {
  res.send('These is the server of Project management!!!')
})
 
// Available routes
app.use('/api/user', require('./routes/user'))
app.use('/api/project', require('./routes/project.js'))
app.use('/api/todo', require('./routes/todo.js'))
app.use('/api/meet', require('./routes/meet.js'))
app.use('/api/task', require('./routes/task.js'))

// mental health
// app.use('/api/todo', require('./routes/todo'))
app.listen(port, () => {
  console.log(`Backend app listening on port ${port}`)
})

