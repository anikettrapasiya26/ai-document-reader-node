/**
 * @author aniket.trapasiya <aniket.trapasiya@dataprophets.in>
 * created JWT token: we use tokendata,SECRET_KEY and TOKEN VALIDITY in env file, using this data token was created
 * @returns token
 */

import jwt from 'jsonwebtoken';

class JWT {
  static createToken(tokenData: any) {
    try {
      return jwt.sign(
        {
          id: tokenData,
        },
        process.env.API_SECRET,
        {
          expiresIn: process.env.TOKEN_VALIDITY,
        },
      );
    } catch (err) {
      return null;
    }
  }
}
module.exports = JWT;
