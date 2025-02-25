/**patient Profile validation using joi
 * @author:  JD9898<jaydeep.malaviya@dataprophets.in>
 * @description: add patient profile validation in patient profile controller.create this validation using joi.
 */
import joi from 'joi';
const { object, string, number } = joi.types();

export const UpdatePatient = object.keys({
  first_name: string.required().regex(/^([a-zA-Z ]){2,30}$/),
  last_name: string.required().regex(/^([a-zA-Z ]){2,30}$/),
  phone: string.regex(/^[0-9]{9,14}$/),
  email: string.required(),
});
