import express from 'express';
import cors from 'cors';
import passport from 'passport';
//import { passport } from './controller/passport';
import { authRouter } from './routes/authRoutes';
import { userRouter }  from './routes/userRoutes';
import { appsRouter } from './routes/osAppsRoutes';

const mainApp = express();

const port = process.env.PORT || 5000;

// mainApp.all('/*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     next();
// });

/*const whiteList = ['http://localhost:3000'];

const corsOption = {
    origin: function(origin, callback) {
        if(whiteList.indexOf(origin) !== -1){
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};*/

mainApp.use(cors());
mainApp.use(passport.initialize());
//mainApp.use(passport.session());
require('./controller/passport');

mainApp.use('/', authRouter);
mainApp.use('/api/v1/user', userRouter);
mainApp.use('/api/v1/apps', appsRouter);

mainApp.listen(port, () => {
    console.log(`App is listening on ${port}`);
});

export { mainApp };