const express = require('express');
const Quiz = require('../models/quiz');
const router = express.Router();

/* GET quiz page. */
router.get('/', (req, res, next) => {
    const show = !req.session.vote;

//find questions from db

    Quiz.find({}, (err, data) => {
        let sum = 0
        data.forEach((item) => {
            sum += item.vote;
        });

        res.render('quiz', { title: 'Ankieta', data, show, sum,});
    });
});

//Increment number of all votes  and increment number of vote with a given id

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
