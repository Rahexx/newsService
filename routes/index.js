const express = require('express');
const User = require('../models/user');
const router = express.Router();


//const login ="admin";
//const password = "123";

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Stronie glownej' });
});

router.get('/login', (req, res, next) => {
    res.render('login', { title: 'Logowanie' });
});

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



router.post('/logout', (req, res, next) => {
    req.session.admin = 0;
    res.redirect('./login');
}); 

module.exports = router;
    