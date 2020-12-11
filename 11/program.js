const fs = require('fs');

const DIRECTIONS = [
	[-1, 0],
	[-1, 1],
	[0, 1],
	[1, 1],
	[1, 0],
	[1, -1],
	[0, -1],
	[-1, -1],
];

function modelChangesPart1(seatmap, i, j) {
	if (seatmap[i][j] === '.') {
		return null;
	}

	const isEmpty = seatmap[i][j] === 'L';
	const occupiedNeighbors = DIRECTIONS.map(([x, y]) => {
		if (
			i + x < 0 ||
			i + x >= seatmap.length ||
			j + y < 0 ||
			j + y >= seatmap[i + x].length
		) {
			return 0;
		}
		return seatmap[i + x][j + y] === '#';
	}).reduce((curr, acc) => curr + acc, 0);

	let newValue = seatmap[i][j];
	if (isEmpty && !occupiedNeighbors) {
		newValue = '#';
	} else if (!isEmpty && occupiedNeighbors >= 4) {
		newValue = 'L';
	}

	if (newValue === seatmap[i][j]) {
		return null;
	}
	return { newValue, i, j };
}

function modelChangesPart2(seatmap, i, j) {
	if (seatmap[i][j] === '.') {
		return null;
	}
	const isEmpty = seatmap[i][j] === 'L';
	const occupiedNeighbors = DIRECTIONS.map(([x, y]) => {
		let [row, col] = [i, j];
		while (
			row + x >= 0 &&
			row + x < seatmap.length &&
			col + y >= 0 &&
			col + y < seatmap[row + x].length
		) {
			row += x;
			col += y;
			if (seatmap[row][col] === '#') {
				return true;
			} else if (seatmap[row][col] === 'L') {
				return false;
			}
		}
		return false;
	}).reduce((curr, acc) => curr + acc, 0);

	let newValue = seatmap[i][j];
	if (isEmpty && !occupiedNeighbors) {
		newValue = '#';
	} else if (!isEmpty && occupiedNeighbors >= 5) {
		newValue = 'L';
	}

	if (newValue === seatmap[i][j]) {
		return null;
	}
	return { newValue, i, j };
}

function getOccupiedSeats(seatmap, part) {
	let changeset = [];
	let occupiedSeats = 0;
	do {
		for (const change of changeset) {
			if (!change) {
				continue;
			}
			const { i, j, newValue } = change;
			seatmap[i][j] = newValue;
		}
		changeset = [];

		for (let i = 0; i < seatmap.length; i++) {
			for (let j = 0; j < seatmap[i].length; j++) {
				if (part === 1) {
					changeset.push(modelChangesPart1(seatmap, i, j));
				} else {
					changeset.push(modelChangesPart2(seatmap, i, j));
				}
			}
		}

		changeset = changeset.filter(n => !!n);
	} while (changeset.length);

	for (const row of seatmap) {
		for (const seat of row) {
			if (seat === '#') {
				occupiedSeats++;
			}
		}
	}
	return occupiedSeats;
}

let buffer = fs.readFileSync(__dirname + '/input');
const lines = buffer
	.toString()
	.split('\n')
	.filter(n => n.length);

let seatmap = [];
for (const line of lines) {
	seatmap.push(line.split(''));
}
console.log('Part 2:', getOccupiedSeats(seatmap, 2));
