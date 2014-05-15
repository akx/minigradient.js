function Gradient() {
	this.stops = [];
	this.dirty = true;
	this.minPos = undefined;
	this.maxPos = undefined;
}

Gradient.prototype.add = function(pos, values) {
	this.stops.push({pos: pos, values: values});
	this.dirty = true;
	return this;
};

Gradient.prototype._clean = function() {
	this.stops = this.stops.sort(function(a, b) { return a.pos - b.pos; });
	for(var i = 0; i < this.stops.length; i++) {
		var pos = this.stops[i].pos;
		this.minPos = (i === 0 ? pos : Math.min(this.minPos, pos));
		this.maxPos = (i === 0 ? pos : Math.max(this.maxPos, pos));
	}
	this.dirty = false;
};

Gradient.prototype.get = function(pos) {
	"use strict";
	if(this.dirty) this._clean();
	var stop1, stop2, alpha, beta;
	var stops = this.stops;
	if(stops.length === 0) return null;
	pos = Math.max(this.minPos, Math.min(this.maxPos, pos));
	if(stops.length > 1) {
		for(var i = 0; i < stops.length - 1; i++) {
			if(stops[i].pos <= pos && pos <= stops[i + 1].pos) {
				stop1 = stops[i];
				stop2 = stops[i + 1];
				break;
			}
		}
	}
	if(!stop1) stop1 = stops[0];
	if(!stop2) stop2 = stops[0];
	var delta = (stop2.pos - stop1.pos);
	alpha = (pos - stop1.pos) / (delta === 0 ? 1 : delta);
	beta = 1.0 - alpha;

	var values = {};
	for(var key in stop1.values) {
		var value1 = stop1.values[key];
		var value2 = stop2.values[key];
		if(value1 === undefined) value1 = value2;
		if(value2 === undefined) value2 = value1;
		if(!isNaN(value1)) {
			values[key] = value1 * beta + value2 * alpha;
		}
	}
	return values;
};

module.exports = Gradient;