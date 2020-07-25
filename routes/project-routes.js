const routes=require('express').Router();
const {getProjects,addProject
    ,updateProject,deleteProject} =require('../queries/products-query');
const isAuth=require('../mdules/isAuth');
const {checkInputsProduct}=require('../utilities/input-validation/input-add-product')

// get all products - authorization path
routes.get("/:userId",isAuth,getProjects);

//  add product - authorization path - validate input values
routes.post("/:userId",isAuth,checkInputsProduct(),addProject);

//  update product - authorization path - validate input values
routes.patch("/:productId/user/:userId",isAuth,checkInputsProduct(),updateProject);

// delete product - authorization path
routes.delete("/:productId/user/:userId",isAuth,deleteProject)

module.exports=routes;
