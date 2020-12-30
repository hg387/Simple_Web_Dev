

var EventEmitter = require('events').EventEmitter;
var utils = require('util');

// To get the lattitude and longitude from the external file.
var fs2=require('../zip.json');
var lat = fs2.lat;
var lon = fs2.lon;

// To get the cilent ID and the secret key from the external file.
var fs1=require('../key.json');
var key = fs1.key;
var id = fs1.id;

var http = require('http');

function Weather1()
{
	EventEmitter.call(this);
}
utils.inherits(Weather1, EventEmitter);




Weather1.prototype.render= function(){
	var html_str = `
		<form>
			<h2 style="margin-top: 0">Weather Forecast</h2>
			<p>The Cilent Id and the secret key is present in the file 'key.json,' also the lattitude and longitude are present in the file 'zip.json' </p>
			<p>Click the button below, and your weather will be displayed.</p>
			<input type="button" onclick="generate_weather()" value="Get Weather" style="display: block; float: left;">
			<br>
		</form>
		<!-- JavaScript will output weather below -->
		<div id="display_weather"></div>`;
	return html_str;
}


Weather1.prototype.getWeather= function(){
	var URL="http://api.aerisapi.com/forecasts/"+lat+","+lon+"?client_id="+id+"&client_secret="+key; 
	
	var options = {

	};
	
	
	var self = this;
	http.request(URL, function(response){
		var str = '';
		var html='';
		response.on('data', function (chunk) {
		str += chunk;
	});
		response.on('end', function() {
			
			var json = JSON.parse(str);
	
			var ob1 = json.response[0].periods;
						
			var table_print = "<div role=\"main\" class=\"ui-content\"><table border='1.5' data-role=\"table\" class=\"ui-responsive table-stroke\">"+"<thead><tr><th>Date</th><th>Max Temp. in Celsius</th><th>Min Temp. in Celsius</th><th>Avg. Temp. in Celsius</th></tr></thead>";
			table_print = table_print + "<tbody>";
			for(var i=0;i<7;i++){
				table_print=table_print + "<tr><th>" + json.response[0].periods[i].validTime.slice(0, 10) + "</th><td>" + json.response[0].periods[i].maxTempC + "</td><td>" + json.response[0].periods[i].minTempC +"</td><td>" + json.response[0].periods[i].avgTempC +"</td></tr>"; 
							}
			table_print = table_print + "</tbody></table></div>";
							
			
			self.emit('Weather_generated', table_print);
});
}).end();

}

//Exporting this module
module.exports = Weather1;