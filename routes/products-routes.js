const routes=require('express').Router();
const {getProducts,addProducts,updateProduct,deleteProduct} =require('../queries/products-query');

routes.get("/:userId",getProducts);
routes.post("/:userId",addProducts);
routes.patch("/:productId/user/:userId",updateProduct);
routes.delete("/:productId/user/:userId",deleteProduct)

module.exports=routes;
