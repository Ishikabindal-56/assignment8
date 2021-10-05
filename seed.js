const Person = require('./models/person');

const persons = [
    {
        name: 'Ishika',
        email: 'ishikabindal56@gmail.com',
        phone: 8307252540,
        isAvailable: true
    },
    {
        name: 'Aditya',
        email: 'aditya@gmail.com',
        phone: 7015701161,
        isAvailable: true
    },
];


const seedDB = async () => {
    await Person.deleteMany({});
    await Person.insertMany(persons);
    console.log('DB Seeded');
}

module.exports = seedDB;