const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

app.use(bodyParser.json());
app.use(cors(corsOptions));

mongoose.connect('mongodb+srv://uplift_joyce2021:uplift2021@cluster0.3amhf.mongodb.net/mjoycer-db-001?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

const UsersRouter = require('./routes/users');
const NotesRouter = require('./routes/notes');
const ChoresRouter = require('./routes/chores');
const BillsRouter = require('./routes/bills');

app.use('/users', UsersRouter);
app.use('/notes', NotesRouter);
app.use('/chores', ChoresRouter);
app.use('/bills', BillsRouter);

app.get('/', (req, res) => { res.send('Welcome to back-end haha'); });

app.listen(port, () => console.log(`Express app is listening to port ${port}`));