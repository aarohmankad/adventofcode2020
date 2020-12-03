const fs = require("fs");

function traverse(map, vert, horiz) {
	let row = 0,
		col = 0,
		trees = 0;
	while (row < map.length) {
		trees += map[row][col] === "#";
		col = (col + horiz) % map[row].length;
		row += vert;
	}
	return trees;
}

let buffer = fs.readFileSync(__dirname + "/input");
const lines = buffer
	.toString()
	.split("\n")
	.filter((n) => n.length);

const map = [];
for (const line of lines) {
	const row = [];
	for (const col of line) {
		row.push(col);
	}
	map.push(row);
}

console.log("Part 1: ", traverse(map, 1, 3));

let result = 1;
result *= traverse(map, 1, 1);
result *= traverse(map, 1, 3);
result *= traverse(map, 1, 5);
result *= traverse(map, 1, 7);
result *= traverse(map, 2, 1);
console.log("Part 2: ", result);
