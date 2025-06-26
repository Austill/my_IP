// const express = require('express');
// const router = express.Router();
// let Image = require('../models/images');

// router.get('/:id', (req,res)=>{
//     // console.log(req);
//     Image.findById(req.params.id,function(err, image){
//         if (err) console.log(err)
//         // console.log(image);
//         res.render('singleImage', {title: 'Single Image', image:image})
//     } )
// })

// router.put('/:id', (req,res) =>{
//     console.log(req.params.id)
//     console.log(req.body);
//     Image.findOneAndUpdate({_id:req.params.id},{
//         name:req.body.name
//     },{new: true}, function(err,image ){
//         if (err) console.log(err)
//         res.redirect('/')
//     })
// })

// router.delete('/:id', (req,res) =>{
//     console.log(req.params.id)

//     Image.deleteOne({_id: req.params.id}, function(err){
//         if (err) console.log(err)
//         res.redirect('/index')
//     })
// })

// module.exports = router

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
let Image = require('../models/images');

// === Multer Configuration ===
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // e.g., 1623332223.jpg
    }
});
const upload = multer({ storage: storage });

router.post('/upload', upload.single('image'), (req, res) => {
    const image = new Image({
        name: req.body.name || 'Untitled',
        imagePath: '/images/' + req.file.filename
    });

    image.save((err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error saving image');
        }
        res.redirect('/');
    });
});

router.get('/:id', (req, res) => {
    Image.findById(req.params.id, function (err, image) {
        if (err) console.log(err);
        res.render('singleImage', { title: 'Single Image', image: image });
    });
});


router.put('/:id', (req, res) => {
    Image.findOneAndUpdate(
        { _id: req.params.id },
        { name: req.body.name },
        { new: true },
        function (err, image) {
            if (err) console.log(err);
            res.redirect('/');
        }
    );
});


router.delete('/:id', (req, res) => {
    Image.deleteOne({ _id: req.params.id }, function (err) {
        if (err) console.log(err);
        res.redirect('/index');
    });
});

module.exports = router;
