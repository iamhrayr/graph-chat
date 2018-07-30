module.exports = {
    Query: {
        me: (parent, args, { req, models }, info) => {
            if (!req.user) {
                throw new Error('You are not logged in');
            }
            const { id } = req.user;
            return models.findById(id);
        },
    },
};
