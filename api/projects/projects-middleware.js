// add middlewares here related to projects
const Projects = require('../projects/projects-model')

async function validateProjectId(req, res, next) {
    try{
      const project = await Projects.getById(req.params.id)
      if(!project){
        next({ status: 400, message:'project not found'})
        
      } else{
        req.project = project
        next()
      }
    } catch(err){
      res.status(500).json({
        message: " problem finding project"
    })
  }
  }

  module.exports = {
      validateProjectId
  }