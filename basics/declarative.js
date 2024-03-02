// Print a greeting message
console.log("Hello, Good Morning");

// Loop through numbers and print a phrase
for (let i = 1; i <= 10; i++) {
    console.log("Bismillahir Rahmanir Rahim");
}

// Map function to double each number in an array
const numbers = [1, 5, 6, 7, 8];
const newNumbers = numbers.map((num) => (num * 2));
console.log(newNumbers);

// Map function to perform a mathematical operation on each number in an array
const numbers1 = [10, 55, 61, 7, 8];
const newM = numbers1.map((num) => num + 8 / 3);
console.log(newM);

// Print Arabic characters
console.log('\u062F\u0639\u0627'); // Arabic characters for 'dua'

// Modify array elements using forEach
var arr = [2, 4, 5, 0];
function declarativefunction() {
    const res = arr.forEach(function (x, ind, array) {
        array[ind] = x + 2;
    });
    console.log(arr);
    return arr;
}
declarativefunction();
