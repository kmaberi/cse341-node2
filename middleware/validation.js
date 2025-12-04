const { body, validationResult } = require('express-validator');

const contactValidationRules = () => {
    return [
        body('firstName').isString().notEmpty(),
        body('lastName').isString().notEmpty(),
        body('email').isEmail(),
        body('favoriteColor').isString().notEmpty(),
        body('birthday').isString().notEmpty(),
    ];
};

const showValidationRules = () => {
    return [
        body('title').isString().notEmpty(),
        body('director').isString().notEmpty(),
        body('year').isInt({ min: 1888 }),
        body('genre').isString().notEmpty(),
        body('rating').isString().notEmpty(),
        body('seasons').isInt({ min: 1 }),
        body('episodes').isInt({ min: 1 }),
        body('platform').isString().notEmpty(),
    ];
};

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

    return res.status(400).json({
        errors: extractedErrors,
    });
};

module.exports = {
    contactValidationRules,
    showValidationRules,
    validate,
};
