import * as dotenv from 'dotenv';
import { app } from './app';

dotenv.config({ path: __dirname + '/.env' });

const host: String | undefined = process.env.HOST;
const port: String | undefined = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running at http://${host}:${port}`);
});
