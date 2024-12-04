const express=require('express');
const router=express.Router();
const {handleGetAllUsers,handleGetUserById,handleUpdateUserById,handleDeleteUserbyId,handleCreateNewUser}=require('../controllers/user');
// router.get('/',async (req,res)=>{
// 	const allDbUser=await User.find({});
// 	let html=
// 	`<ul>
// 		${allDbUser.map((user)=>`<li>${user.firstName} -- ${user.email}</li>`).join("")}
// 	</ul>`;
// 	return res.send(html);
// });
router.route('/').get(handleGetAllUsers)
.post(handleCreateNewUser);
router.route('/:id')
	.get(handleGetUserById)
	.patch(handleUpdateUserById)
	.delete(handleDeleteUserbyId);
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




module.exports=router;