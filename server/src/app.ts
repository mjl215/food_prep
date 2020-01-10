import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';
//
import multer from 'multer';
import Recipe from './models/recipe';

import connect from './db/connect';


import userRoute from './routes/users';

const app = express();
const db: string = 'mongodb://127.0.0.1:27017/recipe';

connect(db);
app.use(json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const upload = multer({
    //dest: 'images'
});

app.post('/image', upload.single('upload'), async (req: Request, res: Response) => {
    const recipe = new Recipe();
    recipe.image = req.file.buffer;
    await recipe.save();
    res.send();
})

app.use('/user', userRoute);

console.log('hi from the server')
app.listen(3000);