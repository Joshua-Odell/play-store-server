const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('common'));

const playstore = require('./playstore');

app.get('/apps', (req, res) => {
    let { sort, generes } = req.query;
    let result = playstore
    

    if(sort) {
        sort = sort.toLowerCase();
        if(!['rating', 'app'].includes(sort)) {
            return res 
                .status(400)
                .send('Sort must be either rating or app');
        }
    }

    if(generes) {
        generes = generes.toLowerCase();
        if(!['action', 'puzzle', 'strategy', 'casual', 'arcade', 'card'].includes(generes)) {
            return res 
                .status(400)
                .send('Please enter a valid genere')
        }
        result = playstore
        .filter(game => game.Genres.toLowerCase() === generes);
    }

    

    if (sort === 'rating') {
        result.sort((a, b) => {
            return b.Rating - a.Rating;
        });
    }
    
    if (sort === 'app') {
        result.sort(function (a, b)  {
            var nameA = a.App.toUpperCase();
            var nameB = b.App.toUpperCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });
    }  

    res.json(result);
})

module.exports = app;