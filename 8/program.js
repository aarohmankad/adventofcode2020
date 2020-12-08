const fs = require('fs');

function findValueBeforeLoop(lines) {
	let acc = 0,
		seen = new Set();
	for (let i = 0; i < lines.length; i++) {
		if (seen.has(i)) {
			return [acc, true];
		}
		seen.add(i);
		const [op, offset] = lines[i].split(' ');
		if (op === 'acc') {
			acc += parseInt(offset);
		} else if (op === 'jmp') {
			i += parseInt(offset) - 1;
		}
	}
	return [acc, false];
}

function getValueAfterFixingLoop(lines) {
	for (let i = 0; i < lines.length; i++) {
		let clone = [...lines];
		clone[i] = 'nop 0';
		const [acc_, isLoop] = findValueBeforeLoop(clone);
		if (!isLoop) {
			return acc_;
		}
	}
}

let buffer = fs.readFileSync(__dirname + '/input');
const lines = buffer
	.toString()
	.split('\n')
	.filter(n => n.length);

console.log('Part 1: ', findValueBeforeLoop(lines)[0]);
console.log('Part 2: ', getValueAfterFixingLoop(lines));
