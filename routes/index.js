const express = require('express')
const router = express.Router()
const passport = require('passport')
const { User } = require('../models')

 //Sets view route for our index page
 router.get('/', forwardAuthenticated, async (req, res) => {
    const users = await User.findAll()
    res.render('index.ejs', { users: users })
 })
 
 //Sets view route for our login page
router.get('/login', async (req, res) => {
    res.render('login.ejs')
 });
 
 //Sets view route for our register page
 router.get('/register', (req, res) => {
    res.render('register.ejs')
 });
 
 //Handles Login
 router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
 }))
 
 //Handles Logout
 router.get('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
 })
 
 //Checks if user is authenticated before allowing access to the page
 function forwardAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
 
    res.redirect('/login')
 }

 module.exports = router