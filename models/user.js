//loading mongosh package
const mongoose=require('mongoose');

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

module.exports=User;