console.log("Server On Duty");
var express = require('express');
var app = express();
app.use(express.static("."));
app.listen(8080);

app.get('/factorial',function(req, res){
var i = 0;
var count1 = 1;
var n = req.query.n;
if(n!=0)
{
for (i=1; i<=n; i++)
{count1 = count1*i;}}
res.send(count1.toString());
});


app.get('/sum', function(req, res){
	var i = 0;
	var count2 = 0;
	var n = req.query.n;
	for(i=0;i<=n;i++){count2=count2+i;}
	res.send(count2.toString());
});