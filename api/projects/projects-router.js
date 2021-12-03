// Write your "projects" router here!
const { query } = require('express');
const express = require('express');
const {validateProjectId, validateProject} = require('../projects/projects-middleware')
const Project = require('./projects-model')
const router = express.Router();

router.get('/',async (req,res,)=>{
   res.json(await Project.get())
  })

router.get('/:id', validateProjectId, (req, res, next) => {
    res.status(200).json(req.project);
  });

  router.post('/',validateProject, async (req, res) => {
    Project.insert(req.body)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error adding the Project',
      });
    });
  });

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      customMessage: " not working",
      message: err.message,
      stack: err.stack,
    })
  })

  module.exports = router