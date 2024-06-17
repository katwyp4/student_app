const dayEvent = require('../models/calendar.model');

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
        let i;
        for(i = 0; i<dayEvent.length; i++){
            console.log(dayEvent[i].key);
            if(dayEvent[i].key == eventToDelete){
                dayEvent.splice(i,1);
                break;
            }
        }
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