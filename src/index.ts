import express ,{ Express,urlencoded } from 'express';
import { config } from 'dotenv';
import route from './routes/index';
import './config/sequelize';
import errorHandling from './middleware/errorHandling';
import './middleware/auth';
import passport from 'passport';
import cors from 'cors';

config();
const server:Express = express();
server.use(urlencoded({ extended: true }));
server.use(passport.initialize());
server.use(cors());
server.use(route);

server.use(errorHandling);

server.listen(process.env.PORT);