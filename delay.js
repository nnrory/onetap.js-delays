var delays = []

/**
 * @class
 * @name Delay
 * @desc Delay framework for onetap.js which will run functions when specified parameters are met.
 * @param {Number}  delay - The delay that will be waited before the associated function is called.
 * @param {Object}  func  - The function associated with the delay object that will be ran after the delay criteria is met.
 * @param {Integer=} times - The amount of times the delay will repeat itself, optional parameter.
*/
function Delay(delay, func, times) {
	this.delay = delay;
	this.resume = Globals.Curtime()+delay;
	this.func = func;
	this.times = 0;
	this.max = times || 1;
	delays.push(this);
}

Delay.prototype.run = function() {
	this.func();
	this.times++;
	this.resume += this.delay;
	return this.times >= this.max;
}

function checkDelays() {
	currTime = Globals.Curtime();

	delays.forEach(function(delay, index) {
		currTime >= delay.resume && delay.run() && delays.splice(index, 1);
	})
}

Cheat.RegisterCallback("Draw", "checkDelays");

//////////////////////////// EXAMPLE ////////////////////////////

function hello() {
	Cheat.Print("Hello ");
}

function world() {
	Cheat.Print("world");
}

new Delay(1, hello);
new Delay(2, world);
new Delay(3, function() { Cheat.Print("!") }, 2);
