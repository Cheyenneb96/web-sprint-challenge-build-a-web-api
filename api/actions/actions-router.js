// Write your "actions" router here!
const express = require('express');
const Actions = require('./actions-model')
const router = express.Router();
const {validateActionId, validateAction} = require('../actions/actions-middlware') 

router.get('/',async (req,res,)=>{
    res.json(await Actions.get())
   })


router.get('/:id', validateActionId, (req, res, next) => {
    res.status(200).json(req.action);
  });

router.post('/',validateAction, async (req, res) => {
    Actions.insert(req.body)
    .then(action => {
      res.status(201).json(action);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error adding the Actions',
      });
    });
  });

  

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      customMessage: " not working actions",
      message: err.message,
      stack: err.stack,
    })
  })

  module.exports = router