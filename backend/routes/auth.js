const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    obj={
        name: "Himanshu",
        age: 22,
        city: "Delhi"
    }
    res.json(obj);
    //res.send('Hello Himanshu! This is the auth route.');
})

module.exports = router;
