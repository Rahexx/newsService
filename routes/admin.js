const express = require('express');
const News = require('../models/news');
const router = express.Router();

// check  login

router.all('*', (req, res, next) => {
    if (!req.session.admin) {
        res.redirect('login');

        return;
    }
    next();
});

/* GET admin page. */
router.get('/', (req, res, next) => {
    const data = News.find({}, (err, data) => {
        res.render('admin/index', { title: 'Admin', data});
    });
});

//Get add news page

router.get('/news/add', (req, res) => {

    res.render('admin/news-form', { title: 'Dodaj artykul', body: {}, errors: {}});
});

// add news to db

router.post('/news/add', (req, res) => {
    const body = req.body;

    const newsData = new News(body);
    const errors = newsData.validateSync();

// save data to db

    newsData.save((err) => {
        if (err) {
            res.render('admin/news-form', { title: 'Dodaj artykul', errors, body});
            return;
        }
        res.redirect('/admin')
    });
});

// delete news from db with given id

router.get('/news/delete/:id', (req, res) => {
    News.findByIdAndDelete(req.params.id, (err) => {
        res.redirect('/admin');
    })

});

module.exports = router;