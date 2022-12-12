import { createTransport } from "nodemailer";

const { AUTH_EMAIL, AUTH_PASS } = process.env;

/**
 * @description Nodemailer config
 * @constructor
 * @param {string} service - Service Name
 * @param {string} host - Host Service
 * @param {number} port - Port Number
 * @param {string} auth - System email and password
 * @returns {string} Nodemailer config
 */

export const transporter = createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: `${AUTH_EMAIL}`,
    pass: `${AUTH_PASS}`,
  },
});
