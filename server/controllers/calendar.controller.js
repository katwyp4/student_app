let dayEvent = require('../models/calendar.model');

const fetch = async (req, res)  => {
    try{
        res.status(200).json(dayEvent);
    }catch(error){
        console.error(error);
        res.status(500).send({ message: 'An unexpected error occurred' });
    }
};

const add = async (req, res)  => {
    try{
        dayEvent.push(req.body);
        res.status(200).json();
    }catch(error){
        console.error(error);
        res.status(500).send({ message: 'An unexpected error occurred' });
    }
};

const destroy = async (req, res)  => {
    try{
        const eventToDelete = req.params.key;
        dayEvent = dayEvent.filter(event => event.key !== eventToDelete);
        res.status(200).json();
    }catch(error){
        console.error(error);
        res.status(500).send({ message: 'An unexpected error occurred' });
    }
};



module.exports = {
    fetch,
    add,
    destroy,
};