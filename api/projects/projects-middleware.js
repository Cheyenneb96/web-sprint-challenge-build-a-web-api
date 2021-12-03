// add middlewares here related to projects
const Projects = require('../projects/projects-model')

async function validateProjectId(req, res, next) {
    try{
      const project = await Projects.get(req.params.id)
      if(!project){
        next({ status: 404, message:'project not found'})
        
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

async function validateProject(req, res, next) {
  const project = await req.body
  if (!project){
    res.status(400).json({
      message: "missing required project field"
    })
  } else if (!project.name || !project.description || !project.completed) {
    res.status(400).json({
      message: "missing required field"
    })
  } else {
    req.project = project
    next()
  }
   
}


  module.exports = {
      validateProjectId,
      validateProject
  }