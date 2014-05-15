minigradient.js
===============

Mini-library for gradient interpolation. Doesn't really care what you're interpolating, as long as it's numbers.

Usage
-----

minigradient.js is currently packaged as a Common.js module, so it's directly usable with Node.js or Browserify.

```javascript

// Assuming Node.js or browserify -->
var Gradient = require("./minigradient");
// <-- (but if you have the Gradient function in your namespace somehow, read on)

// Instantiate new Gradient object.
var g = new Gradient();
// Add a stop at position zero, with some arbitrary values
g.add(0, {red: 0, purple: 0, where: 600});
// Add another stop at an arbitrarier position and even more arbitrary values
g.add(67, {red: -0.33, purple: Math.random(), where: 0});
// One more! The order of stop addition doesn't matter.
g.add(20, {red: 4400, purple: 140, where: 0});

// Get the value of `purple` at position 57:
console.log(g.get(57).purple);

```

For convenient chaining, `.add()` also returns the Gradient object.