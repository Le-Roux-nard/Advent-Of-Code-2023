const input = require('fs').readFileSync('./input.txt', 'utf8');

const lines = input.split('\n').map(l => l.trim());
const linesLength = lines[0].length;

const findNumberRegex = /\d+/d;
const validSymbolRegex = /[^A-Za-z0-9.]/;
const nextNumberIdx = (line) => findNumberRegex.exec(line)?.indices[0] ?? null

const isAdjacentToSymbol = (lineIdx, [startIdx, endIdx]) => {
  const sliceAnchors = [Math.max(startIdx - 1, 0), Math.min(endIdx + 1, linesLength)];
  const actualLine = lines[lineIdx];
  const previousLine = lines[lineIdx - 1] ?? ".".repeat(linesLength);
  const nextLine = lines[lineIdx + 1] ?? ".".repeat(linesLength);

  for (const line of [previousLine, actualLine, nextLine]) {
    if (validSymbolRegex.test(line?.substring(...sliceAnchors))) {
      return true
    }
  }
  return false
}

let sum = 0, addedNumbers = [];
for (let i = 0; i < lines.length; i++) {
  let numberIndex;
  do {
    numberIndex = nextNumberIdx(lines[i]);
    if (!numberIndex) continue;
    const number = lines[i].substring(...numberIndex);
    if (isAdjacentToSymbol(i, numberIndex)) {
      sum += parseInt(number);
      addedNumbers.push(number);
    };
    lines[i] = lines[i].replace(number, ".".repeat(number.length));
    // return;
  } while (!!numberIndex)
}
console.info(sum)