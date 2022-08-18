import Joi = require('joi');

export default function validateLogin(data: object) {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  const { error, value } = schema.validate(data);
  console.log(error);
  if (error) throw error;

  return value;
}
