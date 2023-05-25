const { buildSchema, graphql } = require('graphql');

module.exports = buildSchema(`
type Event {
    _id: ID!
    title: String!
    description: String!
    price: Float!
    date: String!
    creator: User!
}

type User {
    _id: ID!
    email: String!
    password: String
    createdEvents: [Event!]
}

type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
}

type Booking {
    _id: ID!
    event: Event!
    user: User!
    createdAt: String!
    updatedAt: String!
}

input EventInput {
    title: String!
    description: String!
    price: Float!
    date: String!
}

input UserInput {
    email: String!
    password: String!
}

input UpdateUserInput {
    userId: ID!
    currentPassword: String!
    email: String!
    password: String!
}

type RootQuery { 
    events: [Event!]!
    bookings: [Booking!]!
    login(email: String!, password: String!): AuthData!
} 

type RootMutation { 
    createEvent(eventInput: EventInput): Event
    createUser(userInput: UserInput): User
    updateUser(userInput: UpdateUserInput): User
    bookEvent(eventId: ID!): Booking!
    cancelBooking(bookingId: ID!): Event!
}

schema { 
    query: RootQuery, 
    mutation: RootMutation
}`);