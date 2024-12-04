const http=require('http');
const express=require('express');
const users=require('./MOCK_DATA.json');
const fs=require('fs');

const PORT=8000;
const app=express();
app.use(express.urlencoded({extended:false}));//required for req.body data a middleware
app.use((req,res,next)=>{
	fs.appendFile('./log.txt',`${Date.now()} : ${req.method} : ${req.path} \n`,(err,data)=>{
		//console.log('Hello from middleware 1');
		next();
	});
});

app.get('/users',(req,res)=>{
	let html=
	`<ul>
		${users.map((user)=>`<li>${user.first_name} </li>`).join("")}
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
	.get((req,res)=>{
		let id=Number(req.params.id);
		let user=users.find((user)=> user.id===id);
		if(!user) return res.status(404).json({'message':'No user fornd'});
		return res.json(user);
	})
	.patch((req,res)=>{
		const body=req.body;
		//console.log(body);
		return res.json({status:'Patch Request'});
	})
	.delete((req,res)=>{
		const id=Number(req.params.id);
		const user=users.find((user)=>user.id===id);
		//console.log(user);
		if(user){
			users.pop(user);
		}
		
		fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
			if(!err){
				return res.json({status:'Success',id:id});
			}else{
				return res.json({status:'Failed',id:null});
			}
		});
		
	});

app.post('/api/users',(req,res)=>{
	const body=req.body;
	users.push({...body,id:users.length+1});
	fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
		if(!err){
			return res.json({status:'Success',id:users.length});
		}else{
			return res.json({status:'Failed',id:null});
		}
	});
	
})
//const server=http.createServer(app);
app.listen(PORT,()=> console.log('Server started.. at PORT No. '+PORT));