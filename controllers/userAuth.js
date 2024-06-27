const user = require('../models/user');

module.exports.newUserForm = (req, res) => {
    res.render('users/register');
};

module.exports.newUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new user({ email, username });
        const regdUser = await user.register(newUser, password);
        req.login(regdUser, err => {
            if (err) return next(err);
            req.flash('success', "Welcome to The YelpCamp!!");
            res.redirect('/campgrounds');
        });

    } catch (e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
};

module.exports.loginForm = (req, res) => {
    res.render('users/login');
};

module.exports.login = (req, res) => {
    req.flash('success', 'Welcome Back!!');
    const redirectUrl = res.locals.returnTo || '/campgrounds';
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/campgrounds');
    });
};
