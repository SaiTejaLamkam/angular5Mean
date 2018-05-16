'use strict';

export default function(app) {
	console.log("*************");
	app.use('/api/auth', require('./api/auth'));
}


// module.exports = onload