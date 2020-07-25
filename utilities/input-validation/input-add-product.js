const { check } = require('express-validator');
const checkInputUser=()=>{
    return [
        check('first_name')
            .not()
            .isEmpty()
        ,
        check('date_birth')
            .not()
            .isEmpty()
        ,
        check('is_terms')
            .not()
            .isEmpty().isBoolean()
        ,
        check('email')
            .normalizeEmail() // Test@test.com => test@test.com
            .isEmail(),
        check('password').isLength({ min: 6 })
    ]
}

module.exports={checkInputUser}
