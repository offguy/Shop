const express = require('express');
const jwt = require('jsonwebtoken');
const loginSERV = require('../services/authService');
const router = express.Router();
const { SECRET_KEY } = require('../configs/params');

router.post('/register', async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const data = await loginSERV.register(username, password, email);
        res.send(data.json());
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await loginSERV.loginDataValidation(username, password);
        if (user) {
            const token = jwt.sign(
                { id: user.id },
                SECRET_KEY,
                { expiresIn: '30m' }
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

