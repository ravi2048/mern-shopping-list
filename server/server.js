const express = require("express");
const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
const items = require("./routes/api/items");
const users = require("./routes/api/users");
const auth = require("./routes/api/auth");

const path = require("path");
const config = require('config');

const app = express();

//bodyparser middleware
app.use(express.json());

const db = config.get("mongoURI");

mongoose.connect(db)
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log(err))

const port = process.env.PORT || 5000;


app.use('/api/items', items);
app.use('/api/users', users);
app.use('/api/auth', auth);

//serve static files if in production
// if(process.env.NODE_ENV === 'production') {
//     //set static folder
//     app.use(express.static('client/build'));
//     app.get('*', (req, res) => {
//         res.sendFile(path.resolver(__dirname, 'client', 'build', 'index.html'));
//     })
// }

app.listen(port, () => console.log(`Server started on port ${port}`));
