const express = require('express');
const router = express.Router();
const News = require('../models/news');


/* GET news page. IF  */
router.get('/', (req, res, next) => {
//If the input is empty, change the flag content to 1. If it is empty, set it to 0
    const search = req.query.search
    let flag;

    if (search) {
        flag = 1;
    }
    else{
        flag = 0;
    }
//If the flag is set and 1 display associated with the value of input news
// IF the flag is set and 0 display all news

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
