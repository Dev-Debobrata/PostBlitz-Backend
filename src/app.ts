import express, {
  Application,
  Request,
  Response,
  NextFunction,
  application,
} from "express";
import { connectToDatabase } from "./utils/dbConfig";

export const app: Application = express();

connectToDatabase()
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world!");
});
