/**forgotpassword validation using joi
 * @author:  JD9898<jaydeep.malaviya@dataprophets.in>
 * @description: add forgotpassword validation in forgot password controller.create this validation using joi.
 */
import joi from 'joi';
const { object, string } = joi.types();

export const forgotPassword = object.keys({
  email: string
    .email()
    .lowercase()
    .required()
    .regex(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i),
});

export const new_password = object.keys({
  email: string
    .email()
    .lowercase()
    .required()
    .regex(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i),
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
});
