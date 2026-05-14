//EX01
const numbers = [9, 8, 3, 5, 6, 2, 7, 9];
function findSecondLargest(arr) {
    let max = -Infinity;
    let secondMax = -Infinity;
    for (let num of arr) {
        if (num > max) {
            secondMax = max;
            max = num;
        } else if (num > secondMax && num < max) {
            secondMax = num;
        }
    }
    return secondMax;
}
console.log(findSecondLargest(numbers));


//EX02
const classA = [15, 2, 8, 10];
const classB = [8, 11, 2, 5, 9];

//Step 1 & 2
const mergedClasses = [...classA, ...classB];

const uniqueIdsMap = {};
const uniqueArray = [];

for (let id of mergedClasses) {
    if (!uniqueIdsMap[id]) {
        uniqueIdsMap[id] = true;
        uniqueArray.push(id);
    }
}

console.log("Mảng đã gộp và lọc trùng:", uniqueArray);

// Quick Sort
function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    const pivot = arr[arr.length - 1];
    const left = [];
    const right = [];
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return [...quickSort(left), pivot, ...quickSort(right)];
}

const finalSortedArray = quickSort(uniqueArray);
console.log("Mảng sau khi Quick Sort:", finalSortedArray);