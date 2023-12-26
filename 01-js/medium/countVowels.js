/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {
    const vowelArr = ['a', 'e', 'i', 'o', 'u'];
    const noOfVowels = [...str].filter(x => vowelArr.includes(x.toLowerCase())).length;
    return noOfVowels;
}
module.exports = countVowels;