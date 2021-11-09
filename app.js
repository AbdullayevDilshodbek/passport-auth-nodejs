//Loads our env if we are in development 
    require('dotenv').config()
 
 //Includes all of our dependencies
 const express = require('express')
 const app = express()
 app.use(express.json())
 const passport = require('passport')
 const flash = require('express-flash')
 const session = require('express-session')

 const bcrypt = require('bcrypt')
 const { User } = require('./models')

 app.use(express.static('public'))
 
 //Initialize Passport 
 const initializePassport = require('./config/passport-config.js')
 initializePassport(
    passport,
    username => users.find(user => user.username === username),
    id => users.find(user => user.id === id)
    )
 
//Stores users
const users = [{
   id: 1,
   username: '1',
   full_name: 'Dilshodbek',
   password: '$2b$10$3mttw6IlwQQ8i/RmEfJn3OTqXRZNwBcth1a3NuHNoknQIio7LCAF2',
   active: 1,
}]

 //Sets ejs as view engine
 app.set('view-engine', 'ejs')
 
 app.use(express.urlencoded({ extended: false }))
 
 //Set up secret key located in the .env file
 app.use(flash())
 app.use(session({
    secret: process.env.NODE_CLIENT_SECRET,
    cookie:{_expires : 600000},
    resave: false,
    saveUninitialized: false
 }))
 app.use(passport.initialize())
 app.use(passport.session())

 app.post('/register', async(req, res) => {
   try {
      const { full_name, username, password } = req.body
      const hash = await bcrypt.hash(password.toString(), await bcrypt.genSalt(10))
      const user = await User.create({
                  full_name,
                  username,
                  password: hash,
                  active: 0
              })
      users = await User.findAll({
         attributes: {
            exclude: ['password']
          }
      })
      res.redirect('/login')
  } catch (error) {
      res.redirect('/register',)
  }
})

 const main_route = require('./routes/index')
 const user_routes = require('./routes/user.routes')
 app.use('/', main_route)
 app.use('/users',user_routes)

 app.listen(process.env.NODE_PORT, () => {
    console.log("Server running on port " + process.env.NODE_PORT)
 })