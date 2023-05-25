const Event = require('../../models/event');
const User = require('../../models/user');
const { transformEvent } = require('./merge');

module.exports = {
    events: async () => {
        try {
            const events = await Event.find();
            return events.map(event => {
                return transformEvent(event);
            });
        } catch (err) {
            throw err;
        }
    },
    createEvent: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated');
        }
        // const event = {
        //     _id: Math.random.toString(),
        //     title: args.eventInput.title,
        //     description: args.eventInput.description,
        //     price: +args.eventInput.price,
        //     date: args.eventInput.date
        // }
        const event = new Event({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: args.eventInput.price,
            date: new Date(args.eventInput.date),
            creator: req.userId
        });
        try {
            let createdEvent;
            const eventSaved = await event.save()
            createdEvent = transformEvent(eventSaved);
            const userCreator = await User.findById(event.creator);
            if (!userCreator) {
                throw new Error('User not found.');
            }
            userCreator.createdEvents.push(event);
            await userCreator.save();
            return createdEvent;
        } catch (err) {
            throw err;
        }
    }
}