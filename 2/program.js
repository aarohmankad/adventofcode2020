const fs = require('fs');

function validatePasswordPart1(item) {
  const min = item.policy.split('-')[0];
  const max = item.policy.split('-')[1];
  let count = 0;
  for (const letter of item.password) {
    count += letter === item.letter;
  }
  return min <= count && count <= max;
}

function validatePasswordPart2(item) {
  const first = item.policy.split('-')[0];
  const second = item.policy.split('-')[1];
  return item.password[first - 1] === item.letter ^
         item.password[second - 1] === item.letter;
}

let buffer = fs.readFileSync(__dirname + "/input");
const lines = buffer.toString().split('\n').filter(n => n.length);
let passwordBank = [];
for (const line of lines) {
  let [policy, letter, password] = line.split(' ');
  letter = letter[0];
  passwordBank.push({
    policy,
    letter,
    password,
  });
}

let count = 0;
for (const item of passwordBank) {
  count += validatePasswordPart1(item);
}
console.log("Part 1: " + count);

count = 0;
for (const item of passwordBank) {
  count += validatePasswordPart2(item);
}
console.log("Part 2: " + count);
