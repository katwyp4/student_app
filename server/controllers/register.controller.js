const bcrypt = require('bcrypt');
const users = require('../models/user.model'); 
const { token } = require('morgan');

const signup = async (req, res) => {
    try {
        const { name, surname, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        // Zapisz nowego użytkownika do bazy danych (dostosuj do używanego ORM lub bazy danych)
        const newUser = {
            name,
            surname,
            email,
            token:true,
            password: hashedPassword
        };
        
        users.push(newUser);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'An unexpected error occurred' });
    }
};

module.exports = {
    signup
};
