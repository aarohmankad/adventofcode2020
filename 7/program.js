const fs = require('fs');

let cache = {};
function getCountofContainerBags(map, givenColor, desiredColor) {
	let count = 0;
	if (!map[givenColor]) {
		return count;
	}
	for (const innerBag of map[givenColor]) {
		if (innerBag.color === desiredColor) {
			count++;
			cache[innerBag.color] = true;
		}
		count += getCountofContainerBags(map, innerBag.color, desiredColor);
	}
	return count;
}

function getCountofContainedBags(map, color) {
	let count = 0;
	if (!map[color]) {
		return 0;
	}
	for (const innerBag of map[color]) {
		count +=
			parseInt(innerBag.count) +
			parseInt(innerBag.count) *
				getCountofContainedBags(map, innerBag.color);
	}
	return count;
}

let buffer = fs.readFileSync(__dirname + '/input');
const lines = buffer
	.toString()
	.split('\n')
	.filter(n => n.length);

let map = {};
for (const line of lines) {
	let [outer, rest] = line.split(' bags contain ');

	for (const bagPolicy of rest.split(', ')) {
		if (bagPolicy === 'no other bags.') {
			continue;
		}
		let [_, count, bag] = bagPolicy.split(/(\d{1})/);
		bag = bag.split(' ');
		let color = `${bag[1]} ${bag[2]}`;
		if (!map[outer]) {
			map[outer] = [{ color, count }];
		} else {
			map[outer].push({ color, count });
		}
	}
}

let possibleColors = {};
for (const key of Object.keys(map)) {
	if (getCountofContainerBags(map, key, 'shiny gold')) {
		possibleColors[key] = true;
	}
}
console.log('Part 1: ', Object.keys(possibleColors).length);
console.log('Part 2: ', getCountofContainedBags(map, 'shiny gold'));
