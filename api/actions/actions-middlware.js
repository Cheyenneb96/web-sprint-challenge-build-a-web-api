// add middlewares here related to actions
const Actions = require('../actions/actions-model')

async function validateActionId(req, res, next) {
    try{
      const action = await Actions.get(req.params.id)
      if(!action){
        next({ status: 404, message:'action not found'})
        
      } else{
        req.action = action
        next()
      }
    } catch(err){
      res.status(500).json({
        message: " problem finding action"
    })
  }
  }

  async function validateAction(req, res, next) {
    const action = await req.body
    if (!action){
      res.status(400).json({
        message: "missing action"
      })
    } else if (!action.project_id || !action.description || !action.notes || !action.completed) {
      res.status(400).json({
        message: "missing required field"
      })
    } else {
      req.action = action
      next()
    }
     
  }

  module.exports = {
    validateActionId,
   validateAction
}