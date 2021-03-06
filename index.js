/*
  This program accepts as input two arbitrarily nested arrays of strings.
  It returns the sum of the number of necessary one character substitutions
  multiplied by 2 to the power of the depth of nesting at which substitution must occur
*/

const myFunction = (arr1, arr2) => {
  /* Third parameter is the level of nesting.
  It begins at -1 as initially, this function will call itself before diving deeper into the array.*/
  return worldsWorstFunction(arr1, arr2, -1);

  /* This function uses recursion to simultaneously work through the arrays.
  If an element is an array itself, it will call itself and dive deeper
  into the nested array. If the arguments aren't both strings or arrays OR
  their lengths don't match, the fail condition will be set: total = -1
  */
  function worldsWorstFunction(arg1, arg2, nestLvl) {
    if (checkIfBothStrings(arg1, arg2) && checkLengthsMatch(arg1, arg2)) {
      // Count how many character substitutions are needed to match strings
      let subCount = compareStrings(arg1, arg2);
      // Multiply the number of character subtitutions by 2 to the power of the depth of nesting
      // then add to total
      return subCount * Math.pow(2, nestLvl);
    } else if (checkIfBothArrays(arg1, arg2) && checkLengthsMatch(arg1, arg2)) {
      let total = 0;
      for (let i = 0; i < arg1.length; i++) {
         // As array nesting will deepen, increment nestLvl, ready for next call
        let result = worldsWorstFunction(arg1[i], arg2[i], nestLvl + 1);
        if (result === -1) return result;
        else total += result;
      }
      return total;
    } else return -1;
  }
};

const compareStrings = (str1, str2) => {
  let diffCharCount = 0;
  for (let i = 0; i < str1.length; i++) if (str1[i] !== str2[i]) diffCharCount++;
  return diffCharCount;
};

const checkLengthsMatch = (arg1, arg2) => arg1.length === arg2.length;

const checkIfBothArrays = (arg1, arg2) => Array.isArray(arg1) && Array.isArray(arg2);

const checkIfBothStrings = (arg1, arg2) => typeof arg1 === 'string' && typeof arg2 === 'string';

module.exports = myFunction;
