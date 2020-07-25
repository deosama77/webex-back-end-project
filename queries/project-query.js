const db=require('../db/index')
const HttpError =require('../utilities/http-error');
const {validationResult}=require('express-validator');

//*******************************getProjects*********************
// get Projects with authorization from the users server
// add authorization field in header with token value
const getProjects=async (req,res,next)=>{
    try{
        const userId=req.params.userId;
        if(!userId){
            return next(new HttpError("please add user id to add product",422))
        }
        const products=await db.any("select * from projects WHERE owner_id=$1",userId);
        res.status(200).json({
            products:products,
            status:"success",
            message:"Successfully fetched users ..."
        })
    } catch (e) {
        console.log(e);
        return next(new HttpError("Error : "+e,500))
    }

}

//*******************Add Project ************************************
// add Project with authorization from the users server
// add authorization field in header with token value
const addProject=async (req,res,next)=>{

    try{
        const userId=req.params.userId;
        if(!userId){
            return next(new HttpError("please add user id to add product",422))
        }
        //validation body values -
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(
                new HttpError('Invalid inputs passed, please check your data.', 422)
            );
        }
        const start=new Date(req.body.start_date).toLocaleDateString();
        const end=new Date(req.body.end_date).toLocaleDateString();

    req.body.owner_id=userId;
    req.body.start=start;
    req.body.end=end;
    let offers=req.body.offers||0
        req.body.offers=offers;
    const product=await db.one("INSERT INTO projects(name,status_progress" +
        ",status_provider,complicity,owner_id,resources,price,provider,start_date,end_date,offers)" +
        "values(${name},${status_progress},${status_provider}" +
        ",${complicity},${owner_id},${resources},${price},${provider},${start},${end},${offers}) RETURNING *",req.body)

    res.status(201).json({
        product,
        status:"success",
        message:"1 product is added"
    })
}catch (e) {
        console.log(e)
        return  next(new HttpError("Error occurred during add process",500));
    }

}
// *************************************************************************
// update Project with authorization from the users server
// add authorization field in header with token value
const updateProject=async (req,res,next)=>{
    //validation body values -
    try{
        const errors = validationResult(req);
        console.log("Errors data : ", errors)
        if (!errors.isEmpty()) {
            return next(
                new HttpError('Invalid inputs passed, please check your data.', 422)
            );
        }
        const userId=req.params.userId;
        const productId=req.params.productId;
        if(!userId||!productId){
            return next(new HttpError("please add valid user id and product id ",422))
        }
        const start=new Date(req.body.start_date).toLocaleDateString();
        const end=new Date(req.body.end_date).toLocaleDateString();

        const result=await db.result("UPDATE projects SET name=$1 " +
            ", status_progress=$2 ,status_provider=$3,complicity=$4, " +
            "resources=$5,price=$6,provider=$7 ,start_date=$8," +
            "end_date=$9,offers=$10 WHERE owner_id=$11 " +
            "AND id=$12"
            ,[req.body.name,
                req.body.status_progress,
                req.body.status_provider,
                req.body.complicity,
                req.body.resources,
                req.body.price,
                req.body.provider,
                start,end,req.body.offers,
                userId,productId]);
        res.status(201).json({
            status: 'success',
            message:`${result.rowCount} row updated`,
        })
    }catch (e) {
        console.log(e);
        return  next(new HttpError("Error occurred during update process",500));
    }

}
//*********************************Delete ***************************
// delete product with authorization from the users server
// add authorization field in header with token value
const deleteProject=async (req,res,next)=>{
    try{
        const userId=req.params.userId;
        const productId=req.params.productId;
        if(!userId||!productId){
            return next(new HttpError("Invalid or not exist user id or product id ",422))
        }
         const result=await db.result("DELETE FROM projects WHERE owner_id=$1" +
             "And id=$2"
             ,[userId,productId]);
         res.status(202).json({
             status:"success",
             message:`${result.rowCount} row deleted`
         })
    }catch (e) {
        console.log(e)
        return next(new HttpError("Error "+e,500))
    }
}


module.exports={getProjects,addProject,updateProject,deleteProject}
