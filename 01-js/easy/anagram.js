/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
    // create two array of strings 
    const str1Arr = str1.toUpperCase().split('');
    const str2Arr = str2.toUpperCase().split('');

    // Loop through one string and pop the element, if loop continues till end of loop, its anagram else not
    for(let i = 0; i < str1Arr.length; i++) {
      if(str2Arr.indexOf(str1Arr[i]) === -1) {
        return false
      } else {
        str2Arr.splice(str2Arr.indexOf(str1Arr[i]), 1)
      }
    }
    if(str2Arr.length === 0) {
      return true;
    }
    return false;
}
module.exports = isAnagram;
