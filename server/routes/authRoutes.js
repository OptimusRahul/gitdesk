import express from 'express';
import passport from 'passport';
import { githubConfiguration } from '../config/config';

const authRouter = express.Router();

//auth login

console.log('auth router called');

authRouter.get('/auth/github', 
    passport.authenticate('github', { scope: ['repo'] })
);

authRouter.get('/auth/github/callback', 
    passport.authenticate('github',  { failureRedirect: '/login' }), (req, res) => {
        const token = req.user.token;
        githubConfiguration.access_token = req.user.token;
        console.log('Inside auth callback ---------', token);
        res.redirect(`http://localhost:3000/home?token=${token}`);
    }
);

export { authRouter };