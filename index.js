const http=require('http');
const express=require('express');
const users=require('./MOCK_DATA.json');
const fs=require('fs');
//loading mongosh package
const mongoose=require('mongoose');
//Connection mongoose with our database url
mongoose.connect('mongodb://127.0.0.1:27017/youtube-app-1').
then(()=>console.log('MongoDB connected'))
.catch((err)=>console.log('MongoDB error',err));
//Defining schema of collections
const userSchema=new mongoose.Schema({
	firstName:{
		type:String,
		required:true
	},
	lastName:{
		type:String
	},
	email:{
		type:String,
		required:true,
		unique:true
	},
	gender:{
		type:String,
		required:true
	},
	jobLocation:{
		type:String,
		required:true
	}
},{timestamps:true}
);
const User=mongoose.model('user',userSchema);
const PORT=8000;
const app=express();
app.use(express.urlencoded({extended:false}));//required for req.body data a middleware
app.use((req,res,next)=>{
	fs.appendFile('./log.txt',`${Date.now()} : ${req.method} : ${req.path} \n`,(err,data)=>{
		//console.log('Hello from middleware 1');
		next();
	});
});

app.get('/users',async (req,res)=>{
	const allDbUser=await User.find({});
	let html=
	`<ul>
		${allDbUser.map((user)=>`<li>${user.firstName} -- ${user.email}</li>`).join("")}
	</ul>`;
	return res.send(html);
});
app.get('/api/users',(req,res)=>{
	res.status(200).json(users);
});
// app.get('/api/users/:id',(req,res)=>{
// 	let id=Number(req.params.id);
// 	let user=users.find((user)=> user.id===id);
// 	return res.json(user);
// });
// app.post('/api/users/:id',(req,res)=>{
// 	//logic
// 	res.json({status:'Pending'});
// });
//If our routes are same we can also write code like this
app.route('/api/users/:id')
	.get(async (req,res)=>{
		let id=req.params.id;
		let user=await User.findById(id);
		if(!user) return res.status(404).json({'message':'No user fornd'});
		return res.json(user);
	})
	.patch(async (req,res)=>{
		let id=req.params.id;
		await User.findByIdAndUpdate(id,{lastName:"changed"})
		//console.log(body);
		return res.json({status:'Success'});
	})
	.delete(async (req,res)=>{
		const id=req.params.id;
		const result =await User.findByIdAndDelete(id);
		
		return res.json({status:'Success',id:id});
	
		
	});

app.post('/api/users',async (req,res)=>{
	const body=req.body;
	if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_location){
		return res.status(400).json({message:'All fields are required'});
	}


	//Writting code for MongoDB Users model
	const result= await User.create({
		firstName:body.first_name,
		lastName:body.last_name,
		email:body.email,
		gender:body.gender,
		jobLocation:body.job_location

	});

	console.log(result);
	return res.status(201).json({msg:'user created Success..'});

	
})
//const server=http.createServer(app);
app.listen(PORT,()=> console.log('Server started.. at PORT No. '+PORT));