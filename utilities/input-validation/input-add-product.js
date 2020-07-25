const { check } = require('express-validator');
const checkInputsProduct=()=>{
    return [
        check('name')
            .not()
            .isEmpty()
        ,
        check('status_progress')
            .not()
            .isEmpty()
        ,
        check('status_provider')
            .not()
            .isEmpty()
        ,
        check('resources')
            .isNumeric(),
        check('price').isNumeric(),
        check("provider").isLength({min:4}),
        check('start_date').isDate(),
        check('end_date').isDate()
    ]
}

module.exports={checkInputsProduct}
