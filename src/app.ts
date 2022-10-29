import express, {
  Application,
  Request,
  Response,
} from "express";
import { userRouter } from "./routes/user.routes";
import { connectToDatabase } from "./utils/dbConfig";

export const app: Application = express();

connectToDatabase()
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", userRouter)

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world!");
});
