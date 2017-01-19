import express from 'express';
import config from '../config';
import middleware from '../middleware';
import initializeDb from '../db';
import foodtruck from '../controller/foodtruck';

let router = express();

// connect to the database
initializeDb((db) => {
    // internal middleware
    router.use(middleware({ config, db }));
    
    // api routes v1
    router.use('/foodtruck', foodtruck({ config, db }));
});

export default router;