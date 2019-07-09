const express = require('express');
const Quiz = require('../models/quiz');
const router = express.Router();

router.all('*', (req, res, next) => {
    if (!req.session.admin) {
        res.redirect('login');

        return;
    }

    next();
});

/* GET home page. */
router.get('/', (req, res, next) => {
    const show = !req.session.vote;

    Quiz.find({}, (err, data) => {
        let sum = 0
        data.forEach((item) => {
            sum += item.vote;
        });

        res.render('quiz', { title: 'Ankieta', data, show, sum,});
    });
});

router.post('/', (req, res) => {
    const id = req.body.quiz;

    Quiz.findOne({ _id: id }, (err, data) => {
        data.vote = data.vote + 1;
        data.save((err) => {
            req.session.vote = 1;
            res.redirect('/quiz');
        });
    });
});

module.exports = router;
