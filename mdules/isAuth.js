const axios =require('axios');
const HttpError=require('../utilities/http-error');
const config=require('config');

const isAuth=async (req,res,next)=>{
    const userId=req.params.userId;
    if(!userId){
        return next(new HttpError("please add user id to add product",422))
    }
    try{
        const userInfo=await axios.post(config.get('App.userServer.getAuthUrl'),
            {
                "userId":userId
            },
            {
                headers: {
                    'authorization': req.headers['authorization']
                }
            })
        next();
    }catch (e) {
        console.log(e);
        return next(new HttpError("Error : "+e,500))
    }
}

module.exports=isAuth;
