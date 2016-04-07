var fs = require('fs');
var PatternMatch = require('./mySpliter');
var program = require('commander');
var source = fs.createReadStream('./input-sensor.txt');


function parseSource(delimiter) {
	console.log("\n-------------------------------Input-----------------------------------")
	source.pipe(process.stdout);	

	var parser = new PatternMatch(delimiter.toString());
	
	var patternStream = source.pipe(parser);

	var result = [];

	patternStream.on('readable', function() {
		var chunk;
		while(null !== (chunk = patternStream.read())) {
			result.push(chunk);
		}
	});

	patternStream.on('end', function() {
		console.log("\n\n---------------------------------------Output------------------------------------")
		console.log(result);
	});
}


program.option('-p, --pattern <pattern>', 'String delimiter').parse(process.argv);

if(program.pattern) {
	if(program.pattern.length <= 1) {
		parseSource(program.pattern);
	}
} else {
	program.help();
}