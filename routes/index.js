const express = require('express');
const User = require('../models/user');
const router = express.Router();


/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Stronie glownej' });
});

//  Get login page

router.get('/login', (req, res, next) => {
    res.render('login', { title: 'Logowanie' });
});

//downloading data from the form and checking data in the database

router.post('/login', (req, res, next) => { 
    req.session.admin = 1;
    const body = req.body;
    const login = body.login;
    const password = body.password;

    const findUser = User
        .findOne({ username: login });

    findUser.exec((err, data) => {
        if (login === data.username && password === data.password) {
            res.redirect('./admin');
        } else {
             res.redirect('./login');
        }
    });
}); 

//Change variable session on 0 and logout admin

router.post('/logout', (req, res, next) => {
    req.session.admin = 0;
    res.redirect('./login');
}); 

module.exports = router;
    