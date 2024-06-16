const Events = require('../models/schedule.model');

const sortAndSetKeys = () => {
    Events.sort(function(a,b){
        if(a.Day < b.Day) return -1;
        if(a.Day > b.Day) return 1;
        if (a.From < b.From) return -1;
        if (a.From > b.From) return 1;
        return 0;})
    let i;
    for(i = 0; i < Events.length; i++){
        Events[i].key = i;
    }
}

const fetch = async (req, res)  => {
    try{
        sortAndSetKeys();
        res.status(200).json(Events);
    }catch(error){
        console.error(error);
        res.status(500).send({ message: 'An unexpected error occurred' });
    }
};

const add = async (req, res)  => {
    try{
        Events.push(req.body);
        sortAndSetKeys();
        res.status(200).json();
    }catch(error){
        console.error(error);
        res.status(500).send({ message: 'An unexpected error occurred' });
    }
};

const destroy = async (req, res)  => {
    try{
        const keyToDelete = req.params.key;
        console.log(keyToDelete);
        Events.splice(keyToDelete,1);
        sortAndSetKeys();
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