const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user');
const Todo_list = require('../models/todo_list');

const route = express.Router();

route.post('/signup', async (req, res) => {
    const {email, password, _id} = req.body;

    if(!email || !password)
      return res.status(400).send({status: 'error', msg: 'all fields must be filled'});
    

    try{
        //test for email
        const valid = /@gmail.com/.test(email);
        if(!valid)
          return res.status(400).send({status: 'error', msg: 'invalid email'});
        const users = await User.findOne({email}).lean();
        if(users)
          res.status(400).send({status: 'error', msg: `the email ${email} alrady exists`});

        if(password.length < 7)
          return res.status(400).send({status: 'error', msg: 'password must be greater than 6 characters'});

        let user = new User;
        user.email = email;
        user.password = password;
        
        user = await user.save();
        return res.status(200).send({status: 'ok', msg: 'user created successfully', user});
        
    }
    catch(err){
        console.log(err);
        return res.status(400).send({status: 'error', msg: 'some error encountered', err});
    };
});

route.post('/login', async (req, res) => {
  const {email, password, _id} = req.body;

  if(!email || !password || !_id)
    return res.status(400).send({status: 'error', msg: 'All fields must be filled'});


    try{
      const user = await User.findOne({_id}).select(['-td_list']).lean();

      if(!user)
        return res.status(400).send({status: 'error', msg: `user with the id ${_id} not found`});

      if(user.password !== password)
        return res.status(400).send({status: 'error', msg: 'email or password incorrect'});
        
      delete user.password;
      return res.status(200).send({status: 'ok' , msg: 'Login successful', user});
    }
    catch(err){
      console.log(err);
      return res.status(400).send({status: 'error', msg: 'Some error occured', err})
    };
});

module.exports = route;