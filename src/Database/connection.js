const mongoose = require('mongoose');

//creating of database
mongoose.connect("mongodb://localhost:27017/dynamicwebsite", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("database connection successful");
}).catch((err) => {
    console.log("database not connected " + err);
});