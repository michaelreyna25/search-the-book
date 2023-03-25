const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id);
                return user;
            }
            throw new AuthenticationError("not authenticated");
        },
    },
    Mutation: {
        async addUser(parent, { username, email, password }, context) {
            const user = await User.create({
                username,
                email,
                password,
            });
            const token = signToken(user);
            return { token, user };
        },
        async login(parent, { email, password }) {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError("No user found with this email address");
            }
            const isCorrectPassword = user.isCorrectPassword(password);
            if (!isCorrectPassword) {
                throw new AuthenticationError("Incorrect credentials");
            }
            const token = signToken(user);
            return { token, user };
        },
        async saveBook(
            parent,
            { bookId, authors, title, description, image, link },
            context
        ) {
            console.log(context.user);
            if (context.user) {
                const user = await User.findByIdAndUpdate(
                    context.user._id,
                    {
                        $addToSet: {
                            savedBooks: {
                                bookId,
                                authors,
                                title,
                                description,
                                image,
                                link,
                            },
                        },
                    },
                    {
                        new: true,
                    }
                );
                return user;
            }
            throw new AuthenticationError("You need to be logged in!");
        },
        async removeBook(parent, { bookId }, context) {
            if (context.user) {
                const user = await User.findByIdAndUpdate(
                    context.user._id,
                    {
                        $pull: {
                            savedBooks: {
                                bookId,
                            },
                        },
                    },
                    {
                        new: true,
                    }
                );
                return user;
            }
            throw new AuthenticationError("You need to be logged in!");
        },
    },
};

module.exports = resolvers;