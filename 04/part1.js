const input = require("fs")
  .readFileSync(`${__dirname}\\input.txt`)
  .toString()
  .replace(/  (\d)/g, " 0$1")
  .split("\n")
  .map((l) => l.trim());

let sum = 0;
const parseCardRegexp = /Card *(?<cardNumber>\d+): (?<winningNumbers>(?:\d+ )+)\|(?<cardNumbers>(?: \d+)+)/;
for (const line of input) {
  const { winningNumbers, cardNumbers } = parseCardRegexp.exec(line).groups;
  const verificationRegexp = new RegExp(winningNumbers.trim().replaceAll(" ", "|"), "g");
  const verificationResult = cardNumbers.match(verificationRegexp);
  if (!!verificationResult && verificationResult.length >= 1) {
    sum += Math.pow(2, verificationResult.length - 1);
  }
}
console.info(sum);
