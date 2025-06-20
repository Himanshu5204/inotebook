const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors')

// const { query } = require('express-validator');

connectToMongo();
const app = express()
const port = 5000 //thunder client api check after mongo connect http://localhost:5000/ 
app.use(cors())

app.use(express.json()); // req.body auth.js mate required Middleware to parse JSON bodies Middleware to parse URL-encoded bodies (for form submissions)

// Available routes

app.use('/api/auth', require('./routes/auth')); // auth.js routes called for this urls http://localhost:3000/api/auth
app.use('/api/notes', require('./routes/notes')); // notes routes

//api endpoint also written here but we make separte file for api routes http://localhost:3000/api/h1/login
// app.get('/', (req, res) => { 
//   res.send('Hello Himanshu!')
// })
// app.get('/api/h1/login', (req, res) => { 
//   res.send('login data!')
// })

app.listen(port, () => {
  console.log(`==>index.js==>inotebook app listening on port ${port}`)
})

