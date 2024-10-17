import resend from "../utils/resend.js";
import { resendDeliverUser } from "../constants/constant.js";

const sendEmailViaResend = async (
  sendingUserArray,
  subject = "Hello World"
) => {
  try {
    const resendData = await resend.emails.send({
      from: resendDeliverUser,
      to: sendingUserArray,
      subject,
      html: "<p>it works!</p>",
    });
    console.log(resendData);
  } catch (error) {
    console.log(error);
  }
};

export default sendEmailViaResend;
