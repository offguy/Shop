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
        
        let users = await usersREP.readUsers();
        console.log(users)
        if (users !== null) {
            const exist = users.filter(user => user.email === email);
        if (exist.length > 0) {
            return 'Email already in the system';
        }
        users.push(newUser);

        await usersREP.writeUsers(users);
    
        return 'Successfully registered';
        }
    } catch (error) {
        return 'something went terribly wrong: ' + error;
    }
};


const loginDataValidation = async (username, password) => {
    const data  = await usersREP.readUsers()
    console.log(data)
    const user = data.find(user => user.username === username && user.password === password)
    console.log(user)
    if (user) {
        return user.id
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

