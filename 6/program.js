const fs = require('fs');

function getAnswered(line) {
	let map = {};
	const forms = line.split('\n').filter(n => n.length);
	for (const form of forms) {
		for (const q of form) {
			if (map[q]) {
				map[q]++;
			} else {
				map[q] = 1;
			}
		}
	}
	let count = 0;
	for (const key of Object.keys(map)) {
		count += map[key] === forms.length;
	}
	return count;
}

let buffer = fs.readFileSync(__dirname + '/input');
const lines = buffer
	.toString()
	.split('\n\n')
	.filter(n => n.length);

let count = 0;
for (const line of lines) {
	count += getAnswered(line);
}
console.log({ count });
