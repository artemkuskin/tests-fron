function convertCamelToNormal(camelCase) {
  const words = camelCase
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")
    .split(" ");

  const titleCaseWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });

  return titleCaseWords.join(" ");
}

function luhnAlgorithm(func) {
  const inputString = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join("");
  const strippedString = inputString.replace(/ /g, "");
  const digits = strippedString.split("").map(Number);
  let sum = digits.reduce((acc, val, idx) => {
    if (idx % 2 !== 0) {
      val *= 2;
      if (val > 9) {
        val -= 9;
      }
    }
    return acc + val;
  }, 0);
  const result = Math.floor(sum / 10) * 10 + 10;
  const resultNumber = result - sum;
  if (resultNumber === 10) {
    func(inputString + 0);
  } else {
    func(inputString + resultNumber);
  }
}
module.exports = { convertCamelToNormal, luhnAlgorithm };
