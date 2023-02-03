const { body, validationResult } = require('express-validator');

exports.registerValidation=[
    
    body('email','please enter a valid email' ).isEmail(),
    body('password','please must contain 6 caraters').isLength({min : 6})
] 

exports.logvalidator=[
    body('email','please enter a valid email').isEmail()
]

exports.validation=(req,res,next)=>{
    const errors = validationResult(req)
    if ( ! errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
 next()

}