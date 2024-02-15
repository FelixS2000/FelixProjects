/*1. Write a function that returns the reverse of a string?*/
// using for loop
function reverseString(str) {
// Initialize an empty string to
// store the reversed string
let reversed = "";

// Iterate through the characters of the
// input string in reverse order
for (let i = str.length - 1; i >= 0; i--){
reversed += str[i];
    }
    return reversed;
}
console.log(reverseString("Interview, Happy"));

// Shorcut way
function reverseString(str) {
// Split the string into an array of characters
// Reverse the order of the elements in the array
// Join the characters back together into a str
   return str.split("").reverse().join("");
}
console.log(reverseString("Interview, Happy"));

/*2.  Write a function that returns the longest word in the sentence.*/

function findLongestWord(sentence){
// Step 1: Split the sentence into an array of words
    const words = sentece.split(" ");
    let longestWord = "";

// Step 2: Iterate through each word in the array
for (let word of words) {
  // Step 3: Check if the current word is longer than the current longest word
  if (word.lenght > longestWord.length){
   // Step 4: If true, update the longestWord variable
   longestWord = word;
   }
}
return longestWord;
}

// Find the Longest word
console.log(findLongestWord("I love coding in JavaScript"));

/*3. Write a function that checks whether a given string is a palindrome or not?*/

function isPalindrome(str){

const reversedStr = str.split("").reverse().join("");
return str === reversedStr;

}
console.log(isPalindrome("racecar"));

/*4. Write a function to remove duplicate elements from an array*/

function removeDuplicates(arr){

  const uniqueElements = [];

  for (i = 0; i < arr.length; i++){
    if (uniqueElements.indexOf(arr[i]) === -1) {
     uniqueElements.push(arr[i]);
     }
}
return uniqueElements;
}
console.log(removeDuplicates([1, 2, 3, 4, 5, 6, 6]));