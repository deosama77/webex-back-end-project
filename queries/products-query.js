const db=require('../db/index')
const HttpError =require('../utilities/http-error');
const axios =require("axios");
// get products with authorization from the users server
// add authorization field in header with token value
const getProducts=async (req,res,next)=>{
    const userId=req.params.userId;
    if(!userId){
        return next(new HttpError("please add user id to add product",422))
    }
    try{
        const userInfo=await axios.get("http://localhost:3000/users/token",
            {
                headers: {
                    'authorization': req.headers['authorization']
                }
            })
        // console.log("userInfo : ",userInfo.data)
        const products=await db.any("select * from products WHERE owner_id=$1",userId);
        res.status(200).json({
            // info:req.user,
            // users:users,
            products:products,
            status:"success",
            message:"Successfully fetched users ..."
        })
    } catch (e) {
        console.log(e);
        return next(new HttpError("Error : "+e,500))
    }

}

// add product with authorization from the users server
// add authorization field in header with token value
const addProducts=async (req,res,next)=>{
    const userId=req.params.userId;
     if(!userId){
         return next(new HttpError("please add user id to add product",422))
     }
    try{
        const userInfo=await axios.get("http://localhost:3000/users/token",
            {
                headers: {
                    'authorization': req.headers['authorization']
                }
            })
        // console.log("userInfo : ",userInfo.data);
        const start=new Date(req.body.start_date).toLocaleDateString();
        const end=new Date(req.body.end_date).toLocaleDateString();

    req.body.owner_id=userId;
    req.body.start=start;
    req.body.end=end;
    const product=await db.one("INSERT INTO products(name,status_progress" +
        ",status_provider,complicity,owner_id,resources,price,provider,start_date,end_date)" +
        "values(${name},${status_progress},${status_provider}" +
        ",${complicity},${owner_id},${resources},${price},${provider},${start},${end}) RETURNING *",req.body)

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

// update product with authorization from the users server
// add authorization field in header with token value
const updateProduct=async (req,res,next)=>{
    const userId=req.params.userId;
    const productId=req.params.productId;
    if(!userId||!productId){
        return next(new HttpError("please add valid user id ",422))
    }
    try{
        const userInfo=await axios.get("http://localhost:3000/users/token",
            {
                headers: {
                    'authorization': req.headers['authorization']
                }
            })
        // console.log("userInfo : ",userInfo.data)
        const start=new Date(req.body.start_date).toLocaleDateString();
        const end=new Date(req.body.end_date).toLocaleDateString();

        const result=await db.result("UPDATE products SET name=$1 " +
            ", status_progress=$2 ,status_provider=$3,complicity=$4, " +
            "resources=$5,price=$6,provider=$7 ,start_date=$8," +
            "end_date=$9 WHERE owner_id=$10 " +
            "AND id=$11"
            ,[req.body.name,
                req.body.status_progress,
                req.body.status_provider,
                req.body.complicity,
                req.body.resources,
                req.body.price,
                req.body.provider,
                start,end,
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

// delete product with authorization from the users server
// add authorization field in header with token value
const deleteProduct=async (req,res,next)=>{
    const userId=req.params.userId;
    const productId=req.params.productId;
    if(!userId||!productId){
        return next(new HttpError("Invalid or not exist user id or product id ",422))
    }
    try{
        const userInfo=await axios.get("http://localhost:3000/users/token",
            {
                headers: {
                    'authorization': req.headers['authorization']
                }
            })
        // console.log("userInfo : ",userInfo.data)
         const result=await db.result("DELETE FROM products WHERE owner_id=$1" +
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


module.exports={getProducts,addProducts,updateProduct,deleteProduct}
