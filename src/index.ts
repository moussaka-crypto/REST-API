import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router';

// set up Express server
const app = express();
app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);
server.listen(8080, () => {
    console.log("Server is running on http://localhost:8080/");
});

// Database URI
const MONGO_URL = '<Insert MongoDB URI>';

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (err : Error) => console.log(err));

app.use('/', router());

//https://www.ibm.com/topics/rest-apis
