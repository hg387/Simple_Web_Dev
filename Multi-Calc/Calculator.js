


var EventEmitter = require('events').EventEmitter;
var utils = require('util');

function Calc1()
{
	EventEmitter.call(this);
}
utils.inherits(Calc1, EventEmitter);


Calc1.prototype.render= function(){
	var fs = require('fs');
	var html_code = fs.readFileSync('./hg387_HW3.html','utf8');
	return (html_code);
}


Calc1.prototype.computeFactorial = function(n) {
	var i=0;
	var fact=1;
	if(n!=0)
	{
		for(i=1; i<=n; i++)
		{
			fact=fact*i;
		}
	}
	return(fact.toString());
}


Calc1.prototype.computeSummation = function(n) {
	var i=0;
	var sum=0;
	for(i=0; i<=n; i++)
	{
		sum=sum+i;
	}
	return(sum.toString());
}


module.exports = Calc1;