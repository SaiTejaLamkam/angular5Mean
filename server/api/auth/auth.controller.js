const User = require('./auth.modal');

exports.userLogin = async function(req, res){
	const {email, password} = req.body;
	// console.log(req.session,"///////////////////");
	const resp =  await User.findOne({email,password})
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

		req.session.user = email
		req.session.save()
	}
};

exports.userRegister = async function(req,res){
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
};




exports.loggedUserData = async function(req,res){
	const user = await User.findOne({email:req.session.user})

	if(!user){
		res.json({
		status: false,
		message: 'No User'
	})
		return
	}

	res.json({
		status:true,
		email: req.session.user,
		quote:user.quote
	})
}


exports.isLoggedIn = async function(req,res){
	res.json({
		status: !!req.session.user
	})
}

exports.logout = async function(req,res){
	req.session.destroy()
	res.json({
		success:true
	})
}


exports.updateUserQuote = async function(req,res){
	const user = await User.findOne({email:req.session.user})

	if(!user){
		res.json({
		success: false,
		message: 'No User'
	})
		return
	}

	await User.update({email:req.session.user},{$set:{quote:req.body.value}})
	res.json({
		success:true
	})
}