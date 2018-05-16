const express = require('express');

var app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const session = require('express-session')
const mongoose = require('mongoose')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
// app.use(app.router);
app.use(session({
	secret: 'abcdefgh',
	saveUnintialized: false,
	resave: false
}))
require('./routes').default(app);

mongoose.Promise = Promise
mongoose.connect('mongodb://localhost:27017/angular6DB')
.then(()=>console.log("Mongoose Up"))

// const User = require('./models/users')

// app.post('/api/login',async(req,res) =>{
// 	const {email, password} = req.body;
// 	console.log(email,password);
// 	const resp =  await User.findOne({email,password})
// 	console.log(resp,"************");
// 	if(!resp){
// 		res.json({
// 			success:false,
// 			message:"Wrong Credentials"
// 		})
// 	}else{
// 		res.json({
// 			success:true,
// 			message:"Successfully Logged In"
// 		})

// 		req.session.user = email
// 		req.session.save()
// 	}
// })

// app.post('/api/register',async(req,res) =>{
//     const {email, password} = req.body;

//    	const existingUser = await User.findOne({email})
//    	if(existingUser){
//    		res.json({
// 			success:false,
// 			message:"Email Already Existed"
// 		})

// 		return
//    	}
//     const user = new User({
//     	email,
//     	password
//         })
//     const resp = await user.save()
//     res.json({
// 			success:true,
// 			message:"Welcome"
// 		})
// })

// app.get('/api/data', async (req,res)=>{

// 	const user = await User.findOne({email:req.session.user})

// 	if(!user){
// 		res.json({
// 		status: false,
// 		message: 'No User'
// 	})
// 		return
// 	}

// 	res.json({
// 		status:true,
// 		email: req.session.user,
// 		quote:user.quote
// 	})
// })


// app.get('/api/isLoggedIn',(req, res)=>{
// 	res.json({
// 		status: !!req.session.user
// 	})
// })

// app.get('/api/logout',(req, res)=>{
// 	req.session.destroy()
// 	res.json({
// 		success:true
// 	})
// })

// app.post('/api/quote', async (req, res) =>{
// 	const user = await User.findOne({email:req.session.user})

// 	if(!user){
// 		res.json({
// 		success: false,
// 		message: 'No User'
// 	})
// 		return
// 	}

// 	await User.update({email:req.session.user},{$set:{quote:req.body.value}})
// 	res.json({
// 		success:true
// 	})
// })
app.listen(1234,() => console.log('server listening at 1234'))

exports = module.exports = app;
exports = module.exports = session;
