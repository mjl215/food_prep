import mongoose from 'mongoose';

export default (db:string) => {
    const connect = () => {
        mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        }).then(() => {
                return console.log(`connected to ${db}`)
            })
            .catch(err => {
                console.log('Error connecting to db: ', err)
            });
    };

    connect();

    mongoose.connection.on("disconnect", connect);
};