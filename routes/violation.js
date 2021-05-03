/*
Stand in for alert.js
*/


const express = require('express');
const { getAlertDocuments } = require('../modules/atlas');
const { JSDOM } = require( "jsdom" );

const router = express.Router();

router.get('/realtime',(req,res)=>{
    let { window } = new JSDOM( "" );
    let $ = require( "jquery" )( window );
    let temp={
        timestamp:1231231,
        policy1:true,
        policy2:true,
        policy3:true,
        policy4:true,
    }
    //$('#newAlerts').append(`<tr><td>${temp.timestamp}</td><td>${temp.timestamp}</td><td>${temp.timestamp}</td><td>${temp.timestamp}</td><td>${temp.timestamp}</td></tr>`)
    let test=$('#newAlerts')
    console.log('test',test)
    $('#newAlerts').append(`<tr><td>33</td><td>4</td><td>4</td><td>4</td><td>4</td></tr>`)

    
    res.send({result:200})

})
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