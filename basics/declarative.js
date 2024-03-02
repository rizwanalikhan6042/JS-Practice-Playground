// Switch statement
var quan = 90;
switch (quan) {
    case 9:
        console.log('w1');
        break;
    case 10:
        console.log('w2');
        break;
    case 90:
        console.log('real 90');
        break;
    default:
        console.log('ios');
}

// Map and forEach methods on arrays
let p = ["uti", "riz", "e"];
const arr = p.filter(x => (x.length > 2));
console.log(arr);

// Reduce method to sum array elements
var arr1 = [2, 20, 9, 7, 90];
function declrfnred() {
    var res = arr1.reduce(function (acc, item) {
        acc += item;
        return acc;
    }, 0);
    console.log(res);
}
declrfnred();

// Reduce method to multiply array elements
function declrfnred() {
    var res = arr1.reduce(function (acc, item) {
        acc *= item;
        return acc;
    }, 9);
    console.log(res);
}
declrfnred();

// Reduce method to concatenate array elements into a string
var str = ["rizwan", "is", "pagla", "diwana"];
function decstrred() {
    var ans = str.reduce(function (acc, item) {
        acc = acc + item + ' ';
        return acc;
    }, "");
    console.log(ans);
}
decstrred();
