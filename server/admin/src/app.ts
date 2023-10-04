import express, {
  Application,
  Request,
  Response,
  json,
  urlencoded
} from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import * as helmet from 'helmet';
import { connectToDatabase } from './utils/dbConfig';
import { adminRouter } from './routes/admin.routes';
import { logger } from './utils/logger';
import { redisClient } from './utils/redisConfig';

export const app: Application = express();

connectToDatabase()
  .then(() => logger.info({ message: 'Database Connected' }))
  .catch((error) => logger.error({ message: error.message }));

redisClient
  .connect()
  .then(() => logger.info({ message: 'Redis Connected' }))
  .catch((error) => logger.error({ message: error.message }));

app.use(cors(
  {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  }
));
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

app.use('/api', adminRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world!');
});
