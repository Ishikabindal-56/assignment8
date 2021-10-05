const express = require('express');
const router = express.Router();
const Person = require('../models/person');
const sgmail = require('@sendgrid/mail');
const client = require('twilio')('AC40fb23283b9522ab8fed6ea70e468e01', 'f7adeb855c16c217fa56b24d0b03c6d6'); 
const API = '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';

sgmail.setApiKey(API);

router.get('/', async(req,res)=>{
    // send();
    const persons = await Person.find({});
    res.render('person/index',{persons})
})

router.get('/new', (req, res) => {
    res.render('person/new')
});

router.post('/', async(req, res) => {
    const newPersons = {
        ...req.body,
        checkin: new Date().toLocaleTimeString()
    }
    await Person.create(newPersons);
    res.redirect('/');
    //sms
    client.messages
    .create({
    body: 'You just logged in successfully',
    from: '+15153165049',
    to: `{+91${newPersons.phone}}`
    })
    .then(message => console.log(message.sid))
    .catch((err)=>console.log(err))
    //email
    const mess = {
        to:`${newPersons.email}`,
        from:{
            name:'visitors-app',
            email:'ishikabindal56@gmail.com'
        },
        subject: 'Login info',
        text:'You just logged in successfully',
        html: '<h1>You just logged in successfully</h1>'
    };
    sgmail.send(mess)
    .then(res =>console.log("Email sent"))
    .catch(err =>console.log(err.message))
});

router.get('/:id', async(req, res) => {
    const {id} = req.params;
    const persons = await Person.findById(id);
    res.render('person/show', {persons});
});

// router.get('/persons/:id/edit', async (req, res) => {
//     const { id } = req.params;
//     const persons = await Person.findById(id);
//     res.render('person/edit', { persons });
// });

router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const persons = await Person.findById(id);
    await Person.findByIdAndUpdate(id, {$set:{checkout: new Date().toLocaleTimeString()}});
    await Person.findByIdAndUpdate(id, {$set:{isAvailable:false}});
    res.redirect('/');
    //sms
    client.messages
    .create({
    body: 'You just logged out successfully',
    from: '+15153165049',
    to: `{+91${persons.phone}}`
    })
    .then(message => console.log(message.sid))
    .catch((err)=>console.log(err))
    //email
    const mess = {
        to:`${persons.email}`,
        from:{
            name:'visitors-app',
            email:'ishikabindal56@gmail.com'
        },
        subject: 'Logout info',
        text:'You just logged out successfully',
        html: '<h1>You just logged out successfully</h1>'
    };
    sgmail.send(mess)
    .then(res =>console.log("Email sent"))
    .catch(err =>console.log(err.message))
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await Person.findByIdAndDelete(id);
    res.redirect('/');
})

module.exports = router;
