const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
 
async function initialize(passport, getUserByEmail, getUserById) {
 const authenticate = async (username, password, done) => {
   const user = getUserByEmail(username)
   if (user == null || user.active == 0) {
     return done(null, false, { message: 'Foydalanuvchi mavjud emas yoki nofaol' })
   }
 
   try {
     if (await bcrypt.compare(password, user.password)) {
       return done(null, user)
     } else {
       return done(null, false, { message: 'Password incorrect' })
     }
   } catch (e) {
     return done(e)
   }
 }
 
 passport.use(new LocalStrategy({ usernameField: 'username' }, authenticate))
 passport.serializeUser((user, done) => done(null, user.id))
 passport.deserializeUser((id, done) => {
   return done(null, getUserById(id))
 })
}
 
module.exports = initialize