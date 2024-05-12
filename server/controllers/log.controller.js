const bcrypt = require('bcrypt');
const user = require('../models/user.model');

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

        if (email !== user.email) {
            return res.status(401).send('Invalid credentials');
        }

        const isValid = await compare(password, user.password);

        if (!isValid) {
            return res.status(401).send('Invalid credentials');
        }

        res.status(200).json(user);
    }catch(error){
        console.error(error);
        res.status(500).send({ message: 'An unexpected error occurred' });
    }
};

module.exports = {
    signin
};