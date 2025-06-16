const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello Himanshu! This is the notes route.');
})

module.exports = router;
