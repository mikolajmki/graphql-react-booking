const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const events = require('./events');
const mongoose = require('mongoose');

module.exports = {
    createUser: async args => {
        try {
            const userExisting = await User.findOne({ email: args.userInput.email })
            if (userExisting) {
                throw new Error('User exists already.');
            }
            const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
            const user = new User({
                email: args.userInput.email,
                password: hashedPassword
            });
            const userSaveResult = await user.save();
                return { ...userSaveResult._doc, password: null };
        } catch (err) {
            throw err;
        }
    },
    updateUser: async args => {
        try {
            const newPassword = await bcrypt.hash(args.userInput.password, 12);
            const user = await User.findById(mongoose.Types.ObjectId(args.userInput.userId));
            if (!user) {
                throw new Error("User doesn't exist!");
            }
            const isEqual = await bcrypt.compare(args.userInput.currentPassword, user.password);
            if (!isEqual) {
                throw new Error("Passwords doesn't match!");
            }
            await user.updateOne({email: args.userInput.email, password: newPassword} );
            const updatedUser = await user.save();
            return { ...updatedUser._doc, password: null };
        } catch (err) {
            throw err;
        }
    },
    login: async ({ email, password }) => {
        const user = await User.findOne({ email: email });
        if (!user) {
            throw new Error('User does not exist!');
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            throw new Error('Password is incorrect!');
        }
        const token = await jwt.sign({ userId: user._id, email: user.email }, 'somesupersecretkey', {
            expiresIn: '1h'
        });
        return { 
            userId: user._id,
            token: token,
            tokenExpiration: 1
        }
    }
}