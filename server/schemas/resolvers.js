const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');

const resolvers = {
    Query: {
        user: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id)
                    .populate({
                        path: 'users.savedBooks',
                        populate: 'users.savedBooks'
                    });
                return user;
            }
            throw new AuthenticationError("not Found", context);
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const token = signToken(user);
            return { token, user };
        },
        addBook: async (parent, { users }, context) => {
            console.log(context);
            if (context.user) {
                const book = new Book({ users });

                await User.findByIdAndUpdate(context.user._id, { $push: { savedBooks: book } });

                return book;
            }
            throw new AuthenticationError('Not logged in');
        },
        deleteBook: async (parent, { userId }) => {
            return User.findByIdAndDelete(
                { _id: userId },
                { $pull: { savedBooks: book } },
                { new: true },
            );
        },
    },
};

module.exports = resolvers; 