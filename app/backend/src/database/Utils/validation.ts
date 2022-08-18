import Joi = require('joi');

export default function validateLogin(data: object) {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  const { error, value } = schema.validate(data);
  if (error) throw error;

  return value;
}
