const fs = require('fs');

function getSeatId(line) {
	let colLower = 0,
		colUpper = 7,
		rowLower = 0,
		rowUpper = 127;

	for (let i = 0; i < line.length; i++) {
		const char = line[i];
		// Narrow down row
		if (i < 7) {
			if (char === 'F') {
				rowUpper = (rowLower + rowUpper) / 2;
			} else if (char === 'B') {
				rowLower = (rowLower + rowUpper) / 2;
			}
			console.log(`${rowLower} through ${rowUpper}`);
			continue;
		}
		// Narrow down column
	}
	const finalRow = line[6] === 'F' ? rowUpper : rowLower;
	return finalRow;
}

let buffer = fs.readFileSync(__dirname + '/input');
const lines = buffer
	.toString()
	.split('\n')
	.filter(n => n.length);

// let max = -1;
// for (const line of lines) {
// 	max = max(max, getSeatId('FBFBBFFRLR'));
// }
console.log('Part 1: ', getSeatId('FBFBBFFRLR'));
