import { createTransport } from "nodemailer";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/../.env" })

const { AUTH_EMAIL, AUTH_PASS } = process.env;

export const transporter = createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: `${AUTH_EMAIL}`,
    pass: `${AUTH_PASS}`,
  },
});
