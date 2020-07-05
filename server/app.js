import { express } from 'express';
import { default as authRouter }  from './routes/authRoutes';
import { default as userRouter }  from './routes/userRoutes';
import { default as osAppsRouter }  from './routes/osAppsRoutes';

const app = express();

app.use('/', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/apps', osAppsRouter);

export { app };