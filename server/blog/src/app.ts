import express, {
  Application,
  Request,
  Response,
  json,
  urlencoded
} from 'express';
import cookieParser from 'cookie-parser';
import * as helmet from 'helmet';
import { blogRouter } from './routes/blog.routes';
import { connectToDatabase } from './utils/dbConfig';
import { logger } from './utils/logger';
import { redisClient } from './utils/redisConfig';
require('./models/user.model');

export const app: Application = express();

connectToDatabase()
  .then(() => logger.info({ message: 'Database Connected' }))
  .catch((error) => logger.error({ message: error.message }));

redisClient
  .connect()
  .then(() => logger.info({ message: 'Redis Connected' }))
  .catch((error) => logger.error({ message: error.message }));

app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cookieParser());

app.use(
  helmet.contentSecurityPolicy({
    useDefaults: false,
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      objectSrc: ["'none'"],
      baseUri: ["'self'"],
      upgradeInsecureRequests: []
    }
  })
);
app.use(helmet.crossOriginEmbedderPolicy());
app.use(helmet.crossOriginOpenerPolicy());
app.use(helmet.crossOriginResourcePolicy({ policy: 'same-site' }));
app.use(
  helmet.frameguard({
    action: 'deny'
  })
);
app.use(helmet.hidePoweredBy());
app.use(
  helmet.hsts({
    maxAge: 63072000,
    preload: true
  })
);
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.originAgentCluster());
app.use(
  helmet.permittedCrossDomainPolicies({
    permittedPolicies: 'none'
  })
);
app.use(
  helmet.referrerPolicy({
    policy: 'no-referrer'
  })
);
app.use(helmet.xssFilter());

app.use('/api', blogRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world!');
});
