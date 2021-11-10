const express = require('express');
const router = express.Router();
const db = require('../config/database');
const User = require('../models/User');

// get users list
router.get('/', (req,res) => User.findAll()
    .then(users => {
        console.log(users);
        res.sendStatus(200);
    })    
    .catch(err => console.log('Err: ' + err))   
);

// add a user
router.get('/add', (req,res) => {
    const data = {
        id: 1234,
        name: "jim"
    }

    let {id,name} = data;

    User.create({id,name})
        .then(users => res.redirect('/users'))
        .catch(err => console.log('Err: ' + err));
});

module.exports = router;