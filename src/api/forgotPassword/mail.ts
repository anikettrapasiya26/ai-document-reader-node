/** send mail for otp
 * @author: JD9898 <jaydeep.malaviya@dataprophets.in>
 * @description: using nodemailer send mail with html design.
 */
import { createTransport } from 'nodemailer';

const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: 'dummy.test@dataprophets.in',
    pass: 'Dptest@123',
  },
});
/** send mail with html data
 * @author: JD9898 <jaydeep.malaviya@dataprophets.in>
 * @description: using nodemailer send mail with html data, add user mail & passord
 */
export async function sendMailOtp(params) {
  try {
    const info = await transporter.sendMail({
      from: 'dummy.test@dataprophets.in',
      to: params.to, // list of receivers
      subject: 'Welcome to Advance Health System', // Subject line
      html: `
      <div
        class="container"
        style="max-width: 90%; margin: auto; padding-top: 20px"
      >
        <h2>Welcome to the Advance Health System.</h2>
        <p style="margin-bottom: 30px;">Your OTP for verification is  <b>${params.otp}</b>. Please do not share your OTP with anyone .</p>
        <p style="margin-top:50px;">This is a system generated e - mail and please do not reply .For Any queries Contact info@dataprophets.in. </p>
        <tr>
              <td class="td_pen">
                <p>Cheers,<br />Advance Health System Team.</p>
              </td>
            </tr>
      </div>
    `,
    });
    return info;
  } catch (error) {
    return false;
  }
}
