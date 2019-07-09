const express = require('express');
const router = express.Router();
const News = require('../models/news');


/* GET home page. */
router.get('/', (req, res, next) => {
    const search = req.query.search
    let flag;

    if (search) {
        flag = 1;
    }
    else{
        flag = 0;
    }

    if (flag == 1) {
         const findNews = News
             .find({ title: new RegExp(search.trim(), 'i')})
            .sort({ created: 1 });

        findNews.exec((err, data) => {
            res.render('news', { title: 'News', data});
        });
    }
    else {
        const findNews = News.find()
            .find()
            .sort({ created: 1 });

        findNews.exec((err, data) => {
            res.render('news', { title: 'News', data});
        });
    }

});

module.exports = router;
