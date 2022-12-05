import express, {
  Application,
  Request,
  Response,
  json,
  urlencoded,
} from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import * as helmet from "helmet";
import { userRouter } from "./routes/user.routes";
import { blogRouter } from "./routes/blog.routes";
import { connectToDatabase } from "./utils/dbConfig";
import { adminRouter } from "./routes/admin.routes";
import { corsConfigADMIN, corsConfigUSER } from "./middleware/corsConfig";

export const app: Application = express();

connectToDatabase()
  .then(() => console.log("Connected to database"))
  .catch((err) => console.error(err));

app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cookieParser());

app.use(helmet.contentSecurityPolicy());
app.use(helmet.crossOriginEmbedderPolicy());
app.use(helmet.crossOriginOpenerPolicy());
app.use(helmet.crossOriginResourcePolicy());
app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.originAgentCluster());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());

app.use("/api", cors(corsConfigADMIN), adminRouter);
app.use("/api", cors(corsConfigUSER), userRouter);
app.use("/api", blogRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world!");
});
