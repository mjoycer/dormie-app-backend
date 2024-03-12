import express, { Router } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './src/routes/index.mjs'
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import './src/strategies/local-strategy.mjs'

const app = express();
const port = process.env.PORT || 8000;
const uri = 'mongodb+srv://uplift_joyce2021:QjqRwZfzP7Ax5Wbo@atlascluster.lfwmsul.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster'

mongoose.connect(uri,
{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

app.use(express.json())
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.options('*', cors());
app.use(cookieParser('secret'));
app.use(session({
    secret: 'mary joyce', //secret should be something sophisticated; like a password.
    saveUninitialized: false, // so that you will not have random sessions stored in memory
    resave: false,
    cookie: {
        maxAge: 60000 * 60,
    }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

app.get('/', (req, res) => {
    console.log(req.session);
    console.log(req.sessionID); 
    req.session.visited = true;
    res.cookie("hello", "world", {maxAge: 30000, signed: true});
    res.send('Welcome to back-end haha');
});

app.listen(port, () => console.log(`Express app is listening to port ${port}`));