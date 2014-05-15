var Gradient = require("./minigradient");

var g = new Gradient()
	.add(0, {r: 0, g: 0, b: 0, w: 0})
	.add(0.5, {r: 0, g: 1, b: 0, w: 1000})
	.add(1, {r: 0, g: 1, b: 1, w: 393});

for(var i = 0; i <= 10; i++) {
	pos = i / 10.0;
	var values = g.get(pos);
	console.log(pos, values);
}