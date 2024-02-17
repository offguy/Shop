const express = require('express');
const jwt = require('jsonwebtoken');
const authSERV = require('../services/authService');
const router = express.Router();
const { SECRET_KEY } = require('../configs/params');

router.post('/register', async (req, res) => {
    try {
        const { fname, lname, email, username, password } = req.body;
        if (!fname || !lname || !email || !username || !password){
            res.send ('please enter full registration form')
        }
        const data = await authSERV.register(fname, lname, username, password, email);
        res.send(data);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

router.post('/login', async (req, res) => {
    try {
        console.log(req.body)
        const { username, password } = req.body;
        const user = await authSERV.loginDataValidation(username, password);
        console.log(user)
        if (user) {
            const token = jwt.sign(
                { id: user.id },
                SECRET_KEY,
                // { expiresIn: '30m' }
            );
            res.send({ accessToken: token });
        } else {
            res.status(401).send('Invalid username or password');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});



module.exports = router;

