import express from 'express';

import { json } from 'body-parser';
import connect from './db/connect';


import userRouter from './routes/users';
import recipeRouter from './routes/recipe'; 


const app = express();
const db: string = 'mongodb://127.0.0.1:27017/recipe';

connect(db);
app.use(json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use('/user', userRouter);
app.use('/recipe', recipeRouter);

console.log('hi from the server')
app.listen(3000);