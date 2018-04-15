const express = require('express');
const bodyParser = require('body-parser');
const app = express()
const mongoose = require('mongoose')


mongoose.Promise = Promise
mongoose.connect('mongodb://localhost:27017/angular6DB')
.then(()=>console.log("Mongoose Up"))
app.use(bodyParser.json())

const User = require('./models/users')

app.post('/api/login',async(req,res) =>{
	const {email, password} = req.body;
	console.log(email,password);
	const resp =  await User.findOne({email,password})
	console.log(resp,"************");
	if(!resp){
		res.json({
			success:false,
			message:"Wrong Credentials"
		})
	}else{
		res.json({
			success:true,
			message:"Successfully Logged In"
		})
	}
})

app.post('/api/register',async(req,res) =>{
    const {email, password} = req.body;

   	const existingUser = await User.findOne({email})
   	if(existingUser){
   		res.json({
			success:false,
			message:"Email Already Existed"
		})

		return
   	}
    const user = new User({
    	email,
    	password
        })
    const resp = await user.save()
    res.json({
			success:true,
			message:"Welcome"
		})
})

app.listen(1234,() => console.log('server listening at 1234'))
