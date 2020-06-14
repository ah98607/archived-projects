const originalArray = [1, 3, 2, 5, 10];
const doubledArray = originalArray.map(data => data * 2);
console.log(doubledArray);
console.log(originalArray);

// Complete the following

// 1. A map that triples the originalArray and sets the result equal to tripledArray
const tripledArray = originalArray.map(data => data * 3);
console.log(tripledArray);

// 2. A map that takes the originalArray and returns the text "even" if the number is
// even and the text "odd" if the number is odd
// e.g. using this map, the array [3, 1, 2, 4] should give us back ["odd", "odd", "even", "even"]
const evenOdd = originalArray.map(function(item) {
  return item % 2 == 0 ? "even" : "odd";
});

console.log(evenOdd)

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

// 3. Write code to create a new array using the moviePatrons array.

// Each person in this new array should have a new property added on called "oldEnough"

// which is set to true if they are 17 or older and false if they are younger than 17
const newMoviePatrons = moviePatrons.map(person => {
  return {name: person.name,  age: person.age,  oldEnough: parseInt(person.age) > 17 ? true : false};
});
console.log(newMoviePatrons);
