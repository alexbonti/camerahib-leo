/*
Stand in for alert.js
*/

const express = require('express');
const { getAlertDocuments } = require('../modules/atlas');

const router = express.Router();


router.get('/', function (req, res, next) {
    if (req.session.loggedin && req.session.userID) {
        // if (error) {
        //     res.redirect('/');
        // }
        let username = req.session.username;
        getAlertDocuments({}).then(alertDocuments => {
            let slicedalertDocuments = alertDocuments.slice(0, 10);
            res.render('violation', {userName: username, alertDocs: slicedalertDocuments});
        });

    } else {
        res.redirect('/user/login');
    }
});

module.exports = router;