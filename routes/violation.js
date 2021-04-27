/*
Stand in for alert.js
*/

const express = require('express');
const router = express.Router();


router.get('/', function (req, res, next) {
    if (req.session.loggedin && req.session.userID) {
        // if (error) {
        //     res.redirect('/');
        // }
        let username = req.session.username;
        res.render('violation', {userName: username});
    } else {
        res.redirect('/user/login');
    }
});

module.exports = router;