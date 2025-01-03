import { Resend } from "resend";

const resendApi = process.env.RESEND_EMAIL_API
const resend = new Resend(resendApi);

export default resend;

