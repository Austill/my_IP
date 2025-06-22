const express = require('express');
const router = express.Router();
const uuid = require('uuid');
let upload = require('./upload');
const url = require('url');
let Image = require('../models/images');

router.get('/', (req, res) => {
    Image.find({}, function(err, images){
        if (err) {
            console.error('MongoDB error:', err.message);
            return res.render('index', { images: [], msg: 'Error loading images' });
        }
        res.render('index', { images: images, msg: req.query.msg });
    });
});

router.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.redirect(`/?msg=${err}`);
        } else {
            if (req.file == undefined) {
                res.redirect('/?msg=Error: No file selected!');
            } else {
                let newImage = new Image({
                    name: req.file.filename,
                    size: req.file.size,
                    path: 'images/' + req.file.filename
                });

                newImage.save()
                    .then(() => {
                        res.redirect('/?msg=File uploaded successfully');
                    })
                    .catch((error) => {
                        console.error('Error saving image:', error.message);
                        res.redirect('/?msg=Error saving file to database');
                    });
            }
        }
    });
});

module.exports = router;
