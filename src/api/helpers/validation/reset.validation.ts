/**Reset Password validation using joi
 * @author:  JD9898<jaydeep.malaviya@dataprophets.in>
 * @description: add reset Password validation in controller.create this validation using joi.
 */
import joi from 'joi';
const { object, string } = joi.types();

export const update_password = object
  .keys({
    oldPassword: string
      .required()
      .min(8)
      .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/)
      .label('password')
      .messages({
        'string.min': 'Must have at least 8 characters',
        'object.regex': 'Must have at least 8 characters(User#@123)',
        'string.pattern.base':
          'Password must have at least 8 character that include at least 1 Uppercase character,1 lowercase character,1 number and 1 special character(!@#$%^&*) in',
      }),
    newPassword: string
      .required()
      .min(8)
      .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/)
      .label('password')
      .messages({
        'string.min': 'Must have at least 8 characters',
        'object.regex': 'Must have at least 8 characters(User#@123)',
        'string.pattern.base':
          'Password must have at least 8 character that include at least 1 Uppercase character,1 lowercase character,1 number and 1 special character(!@#$%^&*) in',
      }),
  })
  .with('email', 'oldPassword');
