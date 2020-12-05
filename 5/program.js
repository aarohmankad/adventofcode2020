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
				rowUpper = Math.floor((rowLower + rowUpper) / 2);
			} else if (char === 'B') {
				rowLower = Math.ceil((rowLower + rowUpper) / 2);
			}
			// console.log(`${rowLower} through ${rowUpper}`);
			continue;
		}
		// Narrow down column
		if (char === 'L') {
			colUpper = Math.floor((colLower + colUpper) / 2);
		} else if (char === 'R') {
			colLower = Math.ceil((colLower + colUpper) / 2);
		}
		// console.log(`${colLower} through ${colUpper}`);
	}
	const finalRow = line[6] === 'F' ? rowLower : rowUpper;
	const finalCol = line[line.length - 1] === 'L' ? colLower : colUpper;
	// console.log(finalRow);
	// console.log(finalCol);
	return finalRow * 8 + finalCol;
}

let buffer = fs.readFileSync(__dirname + '/input');
const lines = buffer
	.toString()
	.split('\n')
	.filter(n => n.length);

let seatIds = [];
let max = -1;
for (const line of lines) {
	const seatId = getSeatId(line);
	max = Math.max(max, seatId);
	seatIds.push(seatId);
}
console.log('Part 1: ', max);

seatIds.sort();
for (let i = 0; i < seatIds.length - 1; i++) {
	if (seatIds[i] + 2 === seatIds[i + 1]) {
		console.log('Part 2: ', seatIds[i] + 1);
	}
}
