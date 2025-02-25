/** create OTP
 * @author: JD9898 <jaydeep.malaviya@dataprophets.in>
 * @description: using otp-generator create new otp for sending mail
 */
import otpGenerator from 'otp-generator';

const generateOTP: any = () => {
  const OTP = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });

  return OTP;
};
export default generateOTP;
