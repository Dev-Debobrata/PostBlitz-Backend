import { CorsOptions } from "cors";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/../.env" });

export const corsConfigUSER: CorsOptions = {
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "X-Access-Token",
  ],
  origin: `${process.env.USER_URL}`,
  methods: "GET,PATCH,POST,DELETE",
  credentials: true,
};

export const corsConfigADMIN: CorsOptions = {
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "X-Access-Token",
  ],
  origin: `${process.env.ADMIN_URL}`,
  methods: "GET,PATCH,POST,DELETE",
  credentials: true,
};
