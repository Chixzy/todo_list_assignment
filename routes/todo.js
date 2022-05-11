const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Todo_list = require('../models/todo_list');
const route = express.Router();

route.post('/create', async (req, res) => {
    const { _id, body } = req.body;

    let user = await User.findOne({_id}).lean();

    if(!user)
      return res.status(400).send({status: 'error', msg: 'user not found'});

    let todo_list = new Todo_list;
    todo_list.body = body;
    todo_list.owner_id =user._id;

    todo_list = await todo_list.save();
    // console.log(todo_list.body);

    res.status(200).send({status: 'ok', msg: 'To do list created successfully', todo_list});

    // if(await jwt.verify(token, user.token))
    //   return res.status(400).send({status: 'error', msg: 'Nice try champ'});
    
    
});

route.post('/view', async (req, res) => {
    const {_id, owner_id} = req.body;

    try{
        // const user = await User.findOne({_id}).lean();
        // console.log(user._id);
        if(_id !== owner_id)
          return res.status(400).send({status: 'error', msg: 'to do list not found'});
        const todo_list = await Todo_list.findOne({owner_id}).lean();
        // console.log(todo_list);

        return res.status(200).send({status: 'ok', msg: 'to do list gotten successfully', todo_list})
    }
    catch(err){
        console.log(err);
        return res.status(400).send({status: 'error', msg: 'some error occured'});
    }
});
route.post('/update', async (req, res) => {
    const {_id, owner_id, body} = req.body;

    try{
        // let user = await User.findOne({_id}).lean();
        if(_id !== owner_id)
          return res.status(400).send({status: 'error', msg: 'to do list not found'});
          
        const todo_list = await Todo_list.findOneAndUpdate({owner_id}, {
            body : body || todo_list.body 
        }, {new: true});

        const TDL = todo_list.body;

        return res.status(200).send({status: 'ok', msg: 'update successful', TDL});
    }

    catch(err){
        console.log(err);
        return res.status(400).send({status: 'error', msg: 'some error occured', err});
    }
});

module.exports = route;