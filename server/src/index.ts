import * as dotenv from 'dotenv';
import { app } from './app';
import { logger } from './utils/logger';

dotenv.config({ path: __dirname + '/../.env' });

const host: string | undefined = process.env.HOST || 'localhost';
const port: string | undefined = process.env.PORT || '3000';

app.listen(port, () => {
  logger.info(`Server is running at http://${host}:${port}`);
});
