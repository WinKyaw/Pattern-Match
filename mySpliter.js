var stream = require('stream').Transform;
var	util = require('util');

if(!stream.Transform) {	
	Transform = require('readable-stream/transform');
}


function PatternMatch(delimiter) {
	if(! (this instanceof PatternMatch) ) {
		return (new PatternMatch(delimiter));
	}

	Transform.call(this, { objectMode: true });
	this.delimiter = delimiter;

	if(!(delimiter instanceof RegExp)) delimiter = new RegExp(delimiter,'g');
	
	this._lastLineData = null;
}
 
util.inherits(PatternMatch, Transform);
PatternMatch.prototype._transform = function(chunk, encoding, done) {
	var string = chunk.toString();
	if(this._lastLineData) string = this._lastLineData + string;
	
	var match = string.split(this.delimiter);
	this._lastLineData = match.splice(match.length - 1, 1)[0];
	match.forEach(this.push.bind(this));
	done();	
}

PatternMatch.prototype._flush = function(done) {
	if(this._lastLineData) this.push(this._lastLineData);
	
	this._lastLineData = null;
	done(); 
}

module.exports = PatternMatch;