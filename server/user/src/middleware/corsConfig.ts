import { CorsOptions } from 'cors';

/**
 * @description Cors config for user
 * @constructor
 * @param {CorsOptions} allowedHeaders - Allowed headers
 * @param {CorsOptions} origin - Origin
 * @param {CorsOptions} methods - Methods
 * @param {CorsOptions} credentials - Credentials
 * @returns {CorsOptions} Cors config
 */

export const corsConfigUSER: CorsOptions = {
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token'
  ],
  origin: `${process.env.USER_URL}`,
  methods: 'GET,PATCH,POST,DELETE',
  credentials: true
};

/**
 * @description Cors config for admin
 * @constructor
 * @param {CorsOptions} allowedHeaders - Allowed HTTP headers
 * @param {CorsOptions} origin - Origin
 * @param {CorsOptions} methods - Methods
 * @param {CorsOptions} credentials - Credentials
 * @returns {CorsOptions} Cors config
 */

export const corsConfigADMIN: CorsOptions = {
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token'
  ],
  origin: `${process.env.ADMIN_URL}`,
  methods: 'GET,PATCH,POST,DELETE',
  credentials: true
};
