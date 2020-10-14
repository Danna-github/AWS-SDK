var express = require('express');
var app = express();
var AWS = require('aws-sdk');
AWS.config.region = 'ap-northeast-2';

var ec2 = new AWS.EC2();
var s3 = new AWS.S3();

var bucketname = 'dannabucket';




ec2.describeInstances({}, function(err, data){
		console.log(err);
		console.log(data);
});

s3.listObjects({Bucket: `${bucketname}`}).on('success', function handlePage(response)
	{
		console.log(response.data.Contents);		
		//res.json(response.data.Contents);
		for(var name in response.data.Contents){
			console.log(response.data.Contents[name].Key);
		}	
		if (response.hasNextPage()) {
			response.nextPage().on('success', handlePage).send();
		}
}).send();



app.get('/', function(req, res){
	res.send('Hello world');	
});


//ec2 code
app.get('/ec2', function(req, res){
	ec2.describeInstances({}, function(err, data){
		res.json(data);
	});	
});


//s3 code
app.get('/s3', function(req, res){
	s3.listObjects({Bucket: `${bucketname}`}).on('success', function handlePage(response)
	{
		//res.json(response.data.Contents);
		for(var name in response.data.Contents){
			console.log(response.data.Contents[name].Key);
		}	
		if (response.hasNextPage()) {
			response.nextPage().on('success', handlePage).send();
		}
	}).send();
});


app.listen(3000, function(){
	console.log('Connect 3000 port');
});

