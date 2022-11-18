import express, {
  Application,
  Request,
  Response,
  json,
  urlencoded
} from "express";
import { userRouter } from "./routes/user.routes";
import { blogRouter } from "./routes/blog.routes";

import { connectToDatabase } from "./utils/dbConfig";
import cookieParser from "cookie-parser";

export const app: Application = express();

connectToDatabase()
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cookieParser());
app.use("/api", userRouter);
app.use("/api", blogRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world!");
});
