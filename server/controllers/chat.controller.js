const posts = require('../models/chat.model');

const fetch = async (req, res)  => {
    try{
        res.status(201).json(posts);
    }catch(error){
        console.error(error);
        res.status(500).send({ message: 'An unexpected error occurred' });
    }
};

const add = async (req, res)  => {
    try{
        // const { author, timestamp, message } = req.body;
        posts.push(req.body);
        res.status(200).json();
    }catch(error){
        console.error(error);
        res.status(500).send({ message: 'An unexpected error occurred' });
    }
};

module.exports = {
    fetch, 
    add
};