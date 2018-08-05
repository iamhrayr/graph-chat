const jwt = require('jsonwebtoken');


module.exports = {
    Query: {
        me: (parent, args, { req, models }) => {
            if (!req.user) {
                throw new Error('You are not logged in');
            }
            const { _id } = req.user;
            return models.User.findById(_id);
        },
    },
    Mutation: {
        login: (parent, { email, password }, { models }) => {
            return new Promise((resolve) => {
                return models.User
                    .findOne({ email })
                    .then(user => {
                        user.comparePassword(password, (err, isMatch) => {
                            if (err) throw err;
                            if (isMatch) {
                                const secret = process.env.SECRET;
                                const payload = { id: user._id, email };
                                const token = jwt.sign(payload, secret);
                                resolve({ token });
                            }
                        });
                    });
            });
        },
        signup: (parent, { email, password }, { models }) => {
            return models.User
                .findOne({ email })
                .then(foundUser => {
                    if (foundUser) throw new Error('User already exists');
                    return new models.User({
                        email,
                        password,
                    }).save();
                });
        },
    },
};
