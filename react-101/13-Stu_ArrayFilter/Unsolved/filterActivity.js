const originalArray = [1, 3, 2, 5, 10];
const evenNumbers = originalArray.filter(data => {
  if (data % 2 === 0) {
    return true;
  }
});

console.log(evenNumbers);
console.log(originalArray);

// Complete the following

// 1. A filter that takes in the moviePatrons array and only returns only the objects where the age is 17 or older.

const moviePatrons = [
  {
    name: "Christian",
    age: 25
  },
  {
    name: "Alex",
    age: 23
  },
  {
    name: "Luis",
    age: 16
  },
  {
    name: "Angela",
    age: 13
  },
  {
    name: "Mike",
    age: 30
  },
  {
    name: "Sarah",
    age: 30
  }
];

console.log(moviePatrons.filter((data => {
  if (data.age > 17) {
    return true;
  }
})))
