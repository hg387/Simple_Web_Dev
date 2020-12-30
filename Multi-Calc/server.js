var express = require('express');
var app = express();
var bodyParser = require("body-parser");
app.use(express.static("."));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());



//Creating a Calculator object
var Calculator_controller = require('./Calculator');
var cc = new Calculator_controller();

//Creating a Weather object
var Weather_controller = require('./Weather');
var wc= new Weather_controller();

//To render the webpage of weather forecast on request
app.get('/rendering_weather', function(req, res) {
		var data_back = wc.render();
		console.log('Rendered');
		res.send(data_back);
});

// To generate the weather forecast table on request 
app.post('/display_weather', function(req, res) {
	console.log("display_weather_get_reached");
	wc.once('Weather_generated', function(msg){
		res.write(msg);
		res.end();
	});
	wc.getWeather(req);
	
});

//To render the webpage of calculator on request
app.get('/rendering_calc', function(req, res) {
		var data_back = cc.render();
		console.log('Rendered');				
		res.send(data_back);

});

//For Factorial request
app.get('/factorial', function(req, res){
		var num = req.query.n;
		var fact_rep = cc.computeFactorial(num);
		console.log('Factorial!!');
		res.send(fact_rep);
});

//For Summation series request
app.get('/sum', function(req, res){
		var num = req.query.n;
		var fact_rep = cc.computeSummation(num);
		console.log('Summation!!');
		res.send(fact_rep);
});

//check if Server is on
app.listen(8080, function(){
	console.log('Server On Duty');
});