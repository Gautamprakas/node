const User=require('../models/user');
async function handleGetAllUsers(req,res){
	const allDbUser=await User.find({});
	res.status(200).json(allDbUser);
}
async function handleGetUserById(req,res){
	let id=req.params.id;
	let user=await User.findById(id);
	if(!user) return res.status(404).json({'message':'No user fornd'});
	return res.json(user);
}
async function handleUpdateUserById(req,res){
	let id=req.params.id;
	await User.findByIdAndUpdate(id,{lastName:"changed"});
	//console.log(body);
	return res.json({status:'Success'});
}
async function handleDeleteUserbyId(req,res){
	const id=req.params.id;
	const result =await User.findByIdAndDelete(id);
	
	return res.json({status:'Success',id:id});

	
}
async function handleCreateNewUser(req,res){
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
	return res.status(201).json({msg:'user created Success..',id:result._id});

	
}
module.exports={
	handleGetAllUsers,handleGetUserById,handleUpdateUserById,handleDeleteUserbyId,handleCreateNewUser
};