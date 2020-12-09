const fs = require('fs');

function twoSum(numbers, goal) {
	let map = {};
	for (const number of numbers) {
		map[number] = true;
		if (map[goal - number]) {
			return [number, goal - number];
		}
	}
	return null;
}

function subarraySum(numbers, goal) {
	const sum = (start, end) =>
		numbers.slice(start, end + 1).reduce((curr, acc) => curr + acc, 0);
	for (let i = 0; i < numbers.length; i++) {
		for (let j = i + 1; j < numbers.length; j++) {
			if (sum(i, j) === goal) {
				return [i, j];
			} else if (sum(i, j) > goal) {
				break;
			}
		}
	}
	return null;
}

function firstNumberUnfit(lines, preambleSize) {
	for (let i = preambleSize; i < lines.length; i++) {
		const preamble = lines.slice(i - preambleSize, i);
		if (!twoSum(preamble, lines[i])) {
			return lines[i];
		}
	}
	return null;
}

let buffer = fs.readFileSync(__dirname + '/input');
const numbers = buffer
	.toString()
	.split('\n')
	.filter(n => n.length)
	.map(n => parseInt(n, 10));

const unfit = firstNumberUnfit(numbers, 25);
const subarray = subarraySum(numbers, unfit);
console.log('Part 1: ', unfit);

const range = numbers
	.slice(subarray[0], subarray[1] + 1)
	.sort()
	.reverse();
console.log('Part 2: ', range[0] + range[range.length - 1]);
