const express = require('express')
const router = express.Router();
const pool = require('../db');
router.get('/:link', (req, res) => {
    console.log(req.params.link)

    let path =`materials/${req.params.link}`
    res.render('preview', {link: path})
})
module.exports = router;