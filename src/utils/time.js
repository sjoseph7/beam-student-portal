export async function stall(stallTime = 3000) {
  // Help from -> https://staxmanade.com/2016/07/easily-simulate-slow-async-calls-using-javascript-async-await/
  await new Promise(resolve => setTimeout(resolve, stallTime));
}
