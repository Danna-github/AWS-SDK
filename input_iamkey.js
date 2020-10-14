var reader = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout
});
var fs = require('fs');

reader.question("aws_access_key_id: ", aws_access_key_id => {
	reader.question("aws_secret_access_key: ", aws_secret_access_key => {
	fs.writeFile('~/.aws/credentials', `[default]\naws_access_key_id = ${aws_access_key_id}\naws_secret_access_key = ${aws_secret_access_key}`, function(err){
		if (err === null){ console.log('success');}
		else { console.log('fail (Please specify a relative path. ex. ../../.aws/credentials)');}
	});
	reader.close();
	})
})
