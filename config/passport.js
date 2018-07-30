const mongoose = require('mongoose');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

const secret = process.env.SECRET;
const User = mongoose.model('User');

module.exports = passport => {
    const opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = secret;

    passport.use(
        new JwtStrategy(opts, (jwtPyload, done) => {
            User.findOne({ _id: jwtPyload.id }, (err, user) => {
                if (err) {
                    return done(err, false);
                }
                if (user) {
                    return done(null, user);
                }
                return done(null, false);
            });
        }),
    );
};
