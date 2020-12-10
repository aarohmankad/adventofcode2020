const fs = require('fs');

function joltDifferences(numbers) {
	let occurrences = Array(4).fill(0);
	// Joltage difference from wall to first adapter
	occurrences[numbers[0]]++;
	for (let i = 0; i < numbers.length - 1; i++) {
		const diff = numbers[i + 1] - numbers[i];
		if (diff > 3) {
			return null;
		}
		occurrences[diff]++;
	}
	// Last joltage difference to your phone
	occurrences[3]++;
	return occurrences;
}

let cache = {};
function allPossibilities(numbers, index = 0) {
	if (index === numbers.length - 1) {
		return 1;
	}
	let count = 0;
	const diffs = new Set([1, 2, 3]);
	for (const diff of diffs) {
		const hopIndex = numbers.indexOf(numbers[index] + diff);
		if (hopIndex > -1) {
			count += cache[hopIndex] || allPossibilities(numbers, hopIndex);
		}
	}
	cache[index] = count;
	return count;
}

let buffer = fs.readFileSync(__dirname + '/input');
const numbers = buffer
	.toString()
	.split('\n')
	.filter(n => n.length)
	.map(n => parseInt(n))
	.sort((a, b) => a - b);

const diffs = joltDifferences(numbers);
console.log('Part 1:', diffs[1] * diffs[3]);
console.log('Part 2:', allPossibilities([0, ...numbers]));
