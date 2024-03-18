const connectToMongo = require('./db');
const express = require('express')
connectToMongo();


const app = express()
var cors = require('cors')
const port = 5000



app.use(cors()) // To allow browser to use api to make changes and solve cors error
app.use(express.json()) // when u want to use req.body then u need to have a middleware here these middleware is app.use i.e when u want to use console.log(req.body)

app.get('/', (req, res) => {
  res.send('These is the server of Telehealth')
})
 
// Available routes
app.use('/api/user', require('./routes/user'))
app.use('/api/doctor', require('./routes/doctor'))
app.use('/api/chat', require('./routes/chat'))
app.use('/api/blog', require('./routes/blog'))

// mental health
app.use('/api/todo', require('./routes/todo'))
app.use('/api/note', require('./routes/note'))
app.use('/api/sentiments', require('./routes/sentiments'))
app.use('/api/assesment', require('./routes/assesment'))



app.listen(port, () => {
  console.log(`Backend app listening on port ${port}`)
})
