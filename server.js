const express =require('express');
const app =express();
const cors =require('cors');
const bodyParser =require('body-parser');
const HttpError =require("./utilities/http-error") ;
const productsRoutes=require('./routes/products-routes')

// to handle  different paths and ports
app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

    next();
});

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// handle routes
app.use("/products",productsRoutes);

// error if no route is found .. 404 status
app.use((req,res,next)=>{
    const error=new HttpError("Couldn't find this route",404);
    throw error;
});


// error if any error occurred .. 500 or any status
app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occurred!' });

});

app.listen(3001,function () {
    console.log("Server is running on port 3001")
})
