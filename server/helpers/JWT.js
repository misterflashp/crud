let jwt = require('jsonwebtoken');
const secretKey = 'DAYADHCOSMIC!@#)(87^%)';

let issueToken = (args, callback) => {
	var issuedAt = Date.now(); //Math.floor(Date.now() / 1000);
	var notBefore = issuedAt + 10;
	var expire = notBefore + (24 * 60 * 60 * 60);
	data = {
		iat: issuedAt,         // Issued at: time when the token was generated
		nbf: notBefore,        // Not before
		exp: expire,           // Expire
		data: args
	};
	token = jwt.sign(data, secretKey);
	callback(null, token);
}

let verifyJWT = (token, cb) => {
try{
	let decoded = jwt.decode(token, secretKey);
	if (decoded.exp < Date.now()) {
        // console.log(decoded.exp , Date.now());
		cb({
			status: 400,
			message: "Token expired"
		}, null);
	} else {
		cb(null, decoded.data[0]);
	}
}
catch(e) {
	cb(e, null);
}
}
module.exports = {
	issueToken,
	verifyJWT
}
