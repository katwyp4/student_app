const bcrypt = require('bcrypt');
const users = require('../models/user.model');

const compare = async (inputPassword, storedHashedPassword) => {
    try {
        const match = await bcrypt.compare(inputPassword, storedHashedPassword);
        return match;
    } catch (error) {
        throw new Error('Error comparing passwords: ' + error.message);
    }
}


const signin = async (req, res)  => {
    try{
        const { email, password } = req.body;
        const user = users.find(user => user.email === email);
        if (user && await compare(password, user.password)) {
            res.status(201).json(user);
        } else {
            res.status(401).send({ message: 'Incorrect credentials' });
        }
    }catch(error){
        console.error(error);
        res.status(500).send({ message: 'An unexpected error occurred' });
    }
};

module.exports = {
    signin
};