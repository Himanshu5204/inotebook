const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    res.send('Hello Himanshu! This is the notes route.');
})

module.exports = router;
