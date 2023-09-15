import express from 'express';
import authentication from './authentication';
import users from './users';

const router = express.Router();

// Router for all routes
export default (): express.Router => {
    authentication(router);
    users(router);
    return router;
};