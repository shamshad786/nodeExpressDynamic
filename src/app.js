const express = require('express');
require('./Database/connection');
const User = require('./models/usermessage');
const path = require('path');
const hbs = require('hbs');

const app = express();
const port = process.env.PORT || 4000;

// setting path
//console.log(path.join(__dirname, '../public'));
const staticPath = path.join(__dirname, '../public');
const templatePath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

//middleware
app.use('/css', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/js')));
app.use('/jq', express.static(path.join(__dirname, '../node_modules/jquery/dist')));


app.use(express.urlencoded({ extended: false })) // ye line jaruri h json data ko encode kar ke padhne ke liye { ye niche wale form data ke liye h}
app.use(express.static(staticPath));
app.set('view engine', 'hbs');
app.set('views', templatePath);
hbs.registerPartials(partialPath);

// routing
app.get('/', (req, res) => {
    res.render("index");
});

// app.get('/response', (req, res) => {
//     res.render("response");             ye wala section h agar kisi new page pr re direct karna ho navbar me /reply.hbs page ko
// })

// ya wala hissa form data ko database me bhejne ke liye h
app.post("/contact", async(req, res) => {
    try {
        // res.send(req.body);
        const userData = new User(req.body);
        await userData.save();
        res.status(201).render('reply');
    } catch (err) {
        res.status(500).send(err);
    }
})


app.listen(port, () => {
    console.log(`server running on ${port}`);
});