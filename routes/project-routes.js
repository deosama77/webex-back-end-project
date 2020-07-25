const routes=require('express').Router();
const {getProjects,addProject
    ,updateProject,deleteProject,
    getProject} =require('../queries/project-query');
const isAuth=require('../mdules/isAuth');
const {checkInputsProduct}=require('../utilities/input-validation/input-add-product')

// get all projects - authorization path
routes.get("/:userId",isAuth,getProjects);

//  add project - authorization path - validate input values
routes.post("/:userId",isAuth,checkInputsProduct(),addProject);

// get project with userid and projectid as parameters - authorzied
routes.get("/:projectId/user/:userId",isAuth,getProject)

//  update project - authorization path - validate input values
routes.patch("/:projectId/user/:userId",isAuth,checkInputsProduct(),updateProject);

// delete project - authorization path
routes.delete("/:projectId/user/:userId",isAuth,deleteProject)

module.exports=routes;
