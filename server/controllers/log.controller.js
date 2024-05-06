
const signin = (req, res)  => {
    try{
        const { email, password } = req.body;
        // sprawdzic czy email i password poprawne. dodanie bazy i walidacji pozniej.
        res.status(201).json({ email: 'kasia@gmail.com', token: true, name: 'Kasia', surname: 'Wypchlo' });
    }catch(error){
        console.error(error);
        res.status(500).send({ message: 'An unexpected error occurred' });
    }
};

module.exports = {
    signin
};