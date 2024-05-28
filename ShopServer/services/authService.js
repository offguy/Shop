const authREP = require('../repositories/authREP');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../configs/params');
const customersREP = require("../repositories/customersREP")

const register = async (fname, lname, username, password, email) => {
    try {
        // Check if the username already exists
        const data = await authREP.readUsers();
        const existusername = data.users.find(user => user.username === username);
        if (existusername) {
            return 'Username already taken';
        }

        // Proceed with user registration
        const newUser = {
            fname,
            lname,
            email,
            address: []
        };
        
        const user = await customersREP.addNew(newUser);
        if (!user._id) {
            return 'User already in the system';
        }
        
        const { _id } = user;
        const userId = _id.toString();

        const logindata = {
            _id: userId,
            username,
            password,
            email,
            role: "customer"
        };
        data.users.push(logindata);
        
        await authREP.writeUsers(data);
    
        return 'Successfully registered';
        
    } catch (error) {
        return 'Something went terribly wrong: ' + error;
    }
};

const loginDataValidation = async (username, password) => {
    const data  = await authREP.readUsers()
    const user = data.users.find(user => user.username === username && user.password === password)
    if (user) {
        return {
            _id: user._id,
            role: user.role
        }
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

