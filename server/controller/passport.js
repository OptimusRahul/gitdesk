import passport from 'passport';
import GitHubStrategy from 'passport-github2';
import { githubConfiguration } from '../config/config';

passport.serializeUser((user, done) => {
    console.log('serliaze user');
    done(null, user);
});

passport.deserializeUser((user, done) => {
    console.log('deserliaze user');
    done(null, user);
})

passport.use(new GitHubStrategy({
        clientID: githubConfiguration.clientID,
        clientSecret: githubConfiguration.clientSecret,
        callbackURL: githubConfiguration.callbackURL
    },
    (accessToken, refreshToken, profile, done) => {
        const userData = {
            profile: profile,
            token: accessToken
        };

        process.nextTick(() => {
            return done(null, userData);
        }); 
    }
));