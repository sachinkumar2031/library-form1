import { transporter } from "./transporter";
import type { SendMailOptions } from "nodemailer";
export const sendInvoiceEmail = async (mailOptions: SendMailOptions) => {
  const info = await transporter.sendMail(mailOptions);
  return info;
};
