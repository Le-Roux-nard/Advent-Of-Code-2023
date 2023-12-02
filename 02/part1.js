const getGameNumberRegexp = /Game (\d+):/;
const getCubeAndColorRegexp = /((?<cubeCount>\d+) (?<cubeColor>blue|red|green))/;
const maxCubesPerColor = {
  blue: 14,
  red: 12,
  green: 13,
};

const input = require('fs').readFileSync('./input.txt', 'utf8');
let gameNumberSum = 0;
const games = input.split('\n');
const gamePromises = [];

for (const game of games) {
  const [, gameId] = game.match(getGameNumberRegexp);
  const gameIdNumber = parseInt(gameId);
  const cubeLines = game.replace(getGameNumberRegexp, '').split(";")
  let isPossibleGame = new Promise((resolve, reject) => {
    for (const cubeLine of cubeLines) {
      const cubeSets = cubeLine.split(',').map((cubeSet) => cubeSet.trim());
      for (const cubeSet of cubeSets) {
        const { cubeCount, cubeColor } = cubeSet.match(getCubeAndColorRegexp).groups;
        if (cubeCount > maxCubesPerColor[cubeColor]) {
          reject(`Game ${gameIdNumber} is not possible`);
        }
      }
    }
    resolve();
  }).then(() => {
    gameNumberSum += gameIdNumber;
  }).catch((...params) => { console.error(...params); });
  gamePromises.push(isPossibleGame);

};
Promise.allSettled(gamePromises).then(() => {
  console.log(gameNumberSum);
})