import Joi = require('joi');

export default function validateLogin(data: object) {
  const schema = Joi.object({
    email: Joi.string().required()
      .messages({
        'string.empty': 'All fields must be filled',
      }),
    password: Joi.string().required()
      .messages({
        'string.empty': 'All fields must be filled',
      }),
  });

  const { error, value } = schema.validate(data);
  if (error) throw error;

  return value;
}
