const http=require('http');
const express=require('express');
const users=require('./MOCK_DATA.json');
const fs=require('fs');
const User=require('./models/user');
const userRouter=require('./routes/user');
const {connectMongoDB}=require('./connection');
const {logReqRes} = require('./middlewares');

//Connection mongoose with our database url
// mongoose.connect('mongodb://127.0.0.1:27017/youtube-app-1').
// then(()=>console.log('MongoDB connected'))
// .catch((err)=>console.log('MongoDB error',err));
connectMongoDB('mongodb://127.0.0.1:27017/youtube-app-1').then(()=>console.log('Mongo DB connected')
	).catch((err)=>console.log('MongoDB error',err));

const PORT=8000;
const app=express();
app.use(express.urlencoded({extended:false}));//required for req.body data a middleware
app.use(logReqRes('log.txt'));


app.use('/api/users',userRouter);

//const server=http.createServer(app);
app.listen(PORT,()=> console.log('Server started.. at PORT No. '+PORT));