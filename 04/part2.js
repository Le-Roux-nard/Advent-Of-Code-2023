const input = require("fs")
  .readFileSync(`${__dirname}\\input.txt`)
  .toString()
  .replace(/  (\d)/g, " 0$1")
  .split("\n")
  .map((l) => l.trim());

let sum = 0;
console.time("End of Process")
const parseCardRegexp = /Card *(?<cardNumber>\d+): (?<winningNumbers>(?:\d+ )+)\|(?<cardNumbers>(?: \d+)+)/;
const cardHolder = new Array(input.length).fill(1);
for (let i = 0; i < input.length; i++) {
  console.info(`\\33[2K\rparsing line ${i + 1}`)
  do {
    sum += 1;
    cardHolder[0]--;
    const line = input[i];
    const { cardNumber, winningNumbers, cardNumbers } = parseCardRegexp.exec(line).groups;
    const verificationRegexp = new RegExp(winningNumbers.trim().replaceAll(" ", "|"), "g");
    const verificationResult = cardNumbers.match(verificationRegexp);
    if (!!verificationResult && verificationResult.length >= 1) {
      for (j = 1; j <= verificationResult.length; j++) {
        cardHolder[j]++;
      }
    }
  } while (cardHolder[0] > 0);
  cardHolder.shift();
}
console.info(sum);
console.timeEnd("End of Process")