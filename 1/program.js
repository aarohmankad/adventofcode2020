const fs = require('fs');

function twoSum(numbers) {
  let map = {};
  for (const number of numbers) {
    map[number] = true;
    if (map[2020 - number]) {
      return number * (2020 - number);
    }
  }
  return -1;
}

function threeSum(numbers) {
  numbers.sort();
  for (let i = 0; i < numbers.length; i++) {
    const pinned = numbers[i];
    let map = {};
    for (let j = i + 1; j < numbers.length; j++) {
      map[numbers[j]] = true;
      if (map[2020 - numbers[j] - pinned]) {
        return numbers[j] * pinned * (2020 - numbers[j] - pinned);
      }
    }
  }
  return -1;
}

let buffer = fs.readFileSync(__dirname + "/input");
const numbers =
    buffer.toString().split('\n').filter(n => n.length).map(n => parseInt(n));

console.log(twoSum(numbers));
console.log(threeSum(numbers));
