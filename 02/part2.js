const getGameNumberRegexp = /Game (\d+):/;
const getCubeAndColorRegexp = /((?<cubeCount>\d+) (?<cubeColor>blue|red|green))/;

const input = require('fs').readFileSync('./input.txt', 'utf8');
let cubeSetPowerSum = 0;
const games = input.split('\n');

for (const game of games) {
  const [, gameId] = game.match(getGameNumberRegexp);
  const gameIdNumber = parseInt(gameId);
  const cubeLines = game.replace(getGameNumberRegexp, '').split(";")
  const minNumberOfCubesPerColor = {
    blue: 0,
    red: 0,
    green: 0,
  };
  for (const cubeLine of cubeLines) {
    const cubeSets = cubeLine.split(',').map((cubeSet) => cubeSet.trim());
    for (const cubeSet of cubeSets) {
      const { cubeCount, cubeColor } = cubeSet.match(getCubeAndColorRegexp).groups;
      minNumberOfCubesPerColor[cubeColor] = Math.max(minNumberOfCubesPerColor[cubeColor], cubeCount);
    }
  }
  console.log(gameIdNumber, minNumberOfCubesPerColor);
  cubeSetPowerSum += minNumberOfCubesPerColor.blue * minNumberOfCubesPerColor.red * minNumberOfCubesPerColor.green;
}
console.log(cubeSetPowerSum);
