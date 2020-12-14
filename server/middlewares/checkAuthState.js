export const protect = (req, res, next) => {
    if(!req.user) {
        res.redirect('/auth/login');
    } else if(req.user) {
        res.redirect('/user/home');
    } else {
        next();
    }
};