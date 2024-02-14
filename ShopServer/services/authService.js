const {v4: uuid} = require('uuid')
const usersREP = require('../repositories/authREP');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../configs/params');


const register = async (username, password, email) => {
    try {
        const newUser = {
            id: uuid(),
            username,
            password,
            email
        };
        
        let data = await usersREP.readUsers();
        const exist = data.filter(user => user.email === email)
        if (exist){
            return 'Email already in the system';
        }
        data.push(newUser);

        await usersREP.writeUsers(data) ;
    
        return 'Successfully registered';
    } catch (error) {
        'something went terribly wrong: ' + error
    }
};


const loginDataValidation = async (username, password) => {
    try {
    const data  = await usersREP.readUsers()
    const user = data.filter(user => user.username === username && user.password === password)
    return user.id;
    } catch (error) {
        return 'Username or Password incorrect'
    }
    
}
const checkToken = async (token) => {
    if (!token) {
        throw new Error('Access denied. No access token provided.');
    } else {
        return new Promise((resolve, reject) => {
            jwt.verify(token, SECRET_KEY, (err, decodedToken) => {
                if (err) {
                    reject(new Error('Failed to authenticate token'));
                } else {
                    resolve(decodedToken);
                }
            });
        });
    }
};
module.exports ={
    loginDataValidation,
    register,
    checkToken
}

