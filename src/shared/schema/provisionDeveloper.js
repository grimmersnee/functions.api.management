const Joi = require('joi');

const DeveloperSchema = Joi.object().keys({
  id: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string().required(),
});

module.exports = DeveloperSchema;
