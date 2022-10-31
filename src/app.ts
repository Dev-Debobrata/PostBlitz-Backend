import express, {
  Application,
  Request,
  Response,
  json,
  urlencoded
} from "express";
import { userRouter } from "./routes/user.routes";
import { connectToDatabase } from "./utils/dbConfig";

export const app: Application = express();

connectToDatabase()
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

app.use(urlencoded({ extended: true }));
app.use(json());
app.use("/api", userRouter)

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world!");
});
