const fs = require('fs');

function validateCreds(creds, policy) {
	let valid = true;
	let necessaryFields = new Set(Object.keys(policy));
	const cleanCreds = creds.split(/\s+/).filter(n => n.length);
	for (const cred of cleanCreds) {
		const [field, value] = cred.split(':');
		if (policy[field]) {
			if (!policy[field](value)) {
				valid = false;
				console.log('failed: ', field);
			}
			necessaryFields.delete(field);
		} else if (field !== 'cid') {
			valid = false;
		}
	}

	if (!valid || necessaryFields.size) {
		console.log('valid: ', valid);
		console.log('necessaryFields: ', necessaryFields.size);
		console.log(cleanCreds);
	}
	return valid && !necessaryFields.size;
}

let buffer = fs.readFileSync(__dirname + '/input');
const lines = buffer
	.toString()
	.split('\n\n')
	.filter(n => n.length);

const policy = {
	byr: value => value.length === 4 && 1920 <= value && value <= 2002,
	iyr: value => value.length === 4 && 2010 <= value && value <= 2020,
	eyr: value => value.length === 4 && 2020 <= value && value <= 2030,
	hgt: value => {
		if (value.endsWith('cm')) {
			const number = parseInt(value.substring(0, value.length - 2));
			if (number === NaN) {
				return false;
			}
			return 150 <= number && number <= 193;
		} else if (value.endsWith('in')) {
			const number = parseInt(value.substring(0, value.length - 2));
			if (number === NaN) {
				return false;
			}
			return 59 <= number && number <= 76;
		}
		return false;
	},
	hcl: value => value.match(/#[a-f0-9]{6}/),
	ecl: value =>
		new Set(['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']).has(value),
	pid: value => value.match(/\d{9}/),
};

let count = 0;
for (const line of lines) {
	count += validateCreds(line, policy);
}
console.log('Part 2: ', count);
