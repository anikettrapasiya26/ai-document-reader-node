import Joi from 'joi';

interface IJoiResponse {
  [value: string]: any;
  error?: any;
}

export default class UserSchema {
  static validateUserEmail({ email }: { email: string }): IJoiResponse {
    const schema = Joi.object({
      email: Joi.string().required().email(),
    });
    const { error, value } = schema.validate({ email });
    return { error, value };
  }
}
